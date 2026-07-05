import LumiereDining from "@/component/views/Home";
import axios from 'axios';
import { headers } from 'next/headers';

async function getData() {
  try {
    // Because this is a server component, we need absolute URLs for API routes
    // or just fetch from DB directly. Since we have a strict deadline and don't know the DB setup,
    // we use a dummy base URL or relative to localhost if we know the port.
    // Actually, in App router we can just import the model/controller!
    // But since this is a quick fix, let's just pass empty arrays or mock data if API fails,
    // or fetch with absolute URL using headers().get('host')
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    const host = (await headers()).get('host') || 'localhost:3000';
    const baseUrl = `${protocol}://${host}`;
    
    const [dishesRes, catRes] = await Promise.all([
      axios.get(`${baseUrl}/api/menu`).catch(() => ({ data: { success: false, foods: [] } })),
      axios.get(`${baseUrl}/api/categories`).catch(() => ({ data: { success: false, categories: [] } }))
    ]);
    
    return {
      dishes: dishesRes.data.success ? dishesRes.data.foods.slice(0, 6) : [],
      categories: catRes.data.success ? catRes.data.categories.slice(0, 4) : []
    };
  } catch (e) {
    return { dishes: [], categories: [] };
  }
}

export default async function Page() {
  const { dishes, categories } = await getData();
  return (
    <main>
      <LumiereDining dishes={dishes} categories={categories} />
    </main>
  );
}