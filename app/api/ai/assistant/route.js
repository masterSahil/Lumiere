import { NextResponse } from 'next/server';
import connectDB from '@/libs/config';
import Food from '@/model/food';

export async function POST(request) {
  try {
    await connectDB();
    const { message, context } = await request.json();
    
    const query = message.toLowerCase();
    let reply = "I am the Lumière Digital Sommelier & Concierge. How may I elevate your dining experience today?";
    
    // Smart Keyword Detection (Mock AI Logic for Luxury Experience)
    if (query.includes('wine') || query.includes('pairing') || query.includes('drink')) {
      reply = "For an exquisite evening, our Sommelier highly recommends the 2018 Château Margaux, which pairs impeccably with red meats, or a crisp Sancerre for our seafood selections. Shall I add a bottle to your cart?";
    } 
    else if (query.includes('dessert') || query.includes('sweet')) {
      reply = "Our signature 'Midnight Truffle Sphere' is a guest favorite. It features a dark chocolate dome that melts under hot caramel to reveal a delicate vanilla bean mousse. Would you like to view the dessert menu?";
    } 
    else if (query.includes('vegan') || query.includes('vegetarian') || query.includes('allergy')) {
      reply = "Absolutely. Lumière is fully equipped to accommodate dietary preferences. Our Head Chef has curated a dedicated plant-based tasting menu. Please mention any specific allergies to your server or in your order notes, and we will handle them with the utmost care.";
    }
    else if (query.includes('reserve') || query.includes('table') || query.includes('book')) {
      reply = "I would be delighted to help you secure a table. Our VIP booths and window seats offer the finest ambiance. Please navigate to our Reservations section to select your preferred date and time.";
    }
    else if (query.includes('recommend') || query.includes('special') || query.includes('today')) {
      reply = "Today's Chef Special is the Pan-Seared Hokkaido Scallops with a truffle cauliflower purée and micro-greens. It is an extraordinary choice. Would you like me to guide you to our Signature Dishes?";
    }
    else if (query.includes('hello') || query.includes('hi')) {
      reply = "Welcome to Lumière. I am your personal digital concierge. From wine pairings to securing a reservation, I am at your service.";
    }
    else {
      reply = "I appreciate your inquiry. As your digital concierge, I am currently optimized to assist with menu recommendations, wine pairings, and reservations. Could you please specify how I may assist you in those areas?";
    }

    // Simulate thinking delay for premium feel
    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 500));

    return NextResponse.json({ success: true, reply });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
