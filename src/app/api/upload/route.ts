import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // File validation
    if (file.size > 50 * 1024 * 1024) {  // 50MB max
      return NextResponse.json({ error: 'File too large (>50MB)' }, { status: 400 });
    }

    const cookieStore = cookies();
    

    // Unique filename: timestamp-original.ext
    const fileExt = file.name.split('.').pop() || 'png';
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
    const filePath = `${fileName}`;  // Matches your Cloudinary folder

    const { data, error } = await supabase.storage
      .from('Certificates')  // Your bucket name (create if missing)
      .upload(filePath, Buffer.from(await file.arrayBuffer()), {
        cacheControl: '3600',  // 1hr cache
        upsert: false,
      });

    if (error) {
      console.error('Supabase upload error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('Certificates')
      .getPublicUrl(filePath);

    return NextResponse.json({ 
      url: urlData.publicUrl,
      path: filePath 
    });

  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 });
  }
}
