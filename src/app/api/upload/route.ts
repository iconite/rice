
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    // Sanitize filename to avoid directory traversal or weird characters
    const filename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    
    // Ensure unique filename if needed, or just overwrite. 
    // For simplicity, we'll prefix with timestamp to avoid caching/overwrite collisions unless intended.
    const uniqueFilename = `${Date.now()}-${filename}`;
    
    const uploadDir = path.join(process.cwd(), 'public/products'); // Use absolute path approach if needed, but relative to cwd works generally
    
    // Ensure directory exists
    try {
        await fs.access(uploadDir);
    } catch {
        await fs.mkdir(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, uniqueFilename);
    await fs.writeFile(filePath, buffer);

    // Return the public URL
    return NextResponse.json({ url: `/products/${uniqueFilename}` });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
