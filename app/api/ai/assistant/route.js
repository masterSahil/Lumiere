import { NextResponse } from 'next/server';
import connectDB from '@/libs/config';
import Food from '@/model/food';
import User from '@/model/user';
import Order from '@/model/order';
import { getTokenFromCookie, verifyToken } from '@/libs/auth';

export async function POST(request) {
  try {
    await connectDB();
    const { history } = await request.json(); // Array of {role: 'user'|'assistant', text: string}
    
    if (!history || !Array.isArray(history)) {
      return NextResponse.json({ success: false, error: "Invalid history format" }, { status: 400 });
    }

    // 1. Gather Database Context
    let userContext = "Guest User (Not logged in)";
    let pastOrders = [];
    
    try {
      const token = await getTokenFromCookie();
      if (token) {
        const decoded = verifyToken(token);
        if (decoded) {
          const userId = decoded.userId || decoded.id;
          const user = await User.findById(userId).select('username role');
          if (user) {
            userContext = `Name: ${user.username}, Role: ${user.role}`;
            pastOrders = await Order.find({ user: userId }).populate('items.food').sort({ createdAt: -1 }).limit(3);
          }
        }
      }
    } catch (e) {
      console.log("Could not fetch user context for AI", e.message);
    }

    let orderContext = "No past orders.";
    if (pastOrders.length > 0) {
      orderContext = pastOrders.map(o => 
        `Order ID: ${o._id}, Items: ${o.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}`
      ).join(' | ');
    }

    // Fetch Live Menu
    const foods = await Food.find({ availability: true }).select('name price category isChefSpecial isVegan type');
    const menuContext = foods.map(f => 
      `${f.name} (₹${f.price}) [${f.category}]${f.isChefSpecial ? ' - CHEF SPECIAL' : ''}${f.type === 'veg' ? ' - VEG' : ''}`
    ).join('\n');

    // 2. Build the System Instruction
    const systemPrompt = `
You are Lumière AI, an ultra-luxury digital concierge and sommelier for a Michelin-level fine dining restaurant named Lumière.
You speak with absolute elegance, sophistication, and brevity. Never use emojis excessively, maintain a professional and premium tone.

CURRENT USER CONTEXT:
${userContext}

USER'S RECENT ORDERS:
${orderContext}

LIVE RESTAURANT MENU:
${menuContext}

INSTRUCTIONS:
1. Always be aware of the current user's name and past orders to provide personalized recommendations. 
2. If they ask for recommendations, suggest items from the Live Restaurant Menu provided above. Emphasize Chef Specials.
3. Keep responses concise, no more than 3-4 short sentences.
4. You have full memory of this conversation. Do not repeat yourself.
`;

    // 3. Format History for Gemini REST API
    let contents = history.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    // Gemini API requires the conversation to start with a 'user' role. 
    // Remove the initial 'model' greeting if it's the first message.
    if (contents.length > 0 && contents[0].role === 'model') {
      contents.shift();
    }

    // Insert System Prompt natively into the first message or wait, Gemini REST API has a specific system_instruction field.
    const requestBody = {
      system_instruction: {
        parts: { text: systemPrompt }
      },
      contents: contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 250,
      }
    };

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Fallback if API key is not configured in .env.local
      return NextResponse.json({ 
        success: true, 
        reply: "My generative capabilities are currently offline as my GEMINI_API_KEY has not been configured in the environment variables. Please add it to .env.local so I can assist you." 
      });
    }

    // 4. Call Gemini REST API
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API Error:", errText);
      throw new Error(`Gemini API returned ${response.status}`);
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "I am currently unable to process that request.";

    return NextResponse.json({ success: true, reply });
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
