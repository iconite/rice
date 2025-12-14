
import { NextResponse } from 'next/server';
import { getSiteData, saveSiteData } from '@/lib/data';
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    const data = await getSiteData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await saveSiteData(body);
    
    // Revalidate all pages to show new data immediately
    revalidatePath('/', 'layout');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}
