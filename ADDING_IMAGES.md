# Quick Start: Adding Images from Figma

Follow these steps to replace the placeholder images with your actual Figma designs.

## Step 1: Export Images from Figma

### Export Product Images
1. Open your Figma file
2. Select each product image
3. Right-click → Export → PNG
4. Set export size to **2x** for retina displays
5. Name them exactly as shown below

### Required Exports

#### Logo
- **File**: `logo-icon.png` or `logo-icon.svg`
- **Size**: 80x80px (will display at 40x40)
- **Location**: `public/`

#### Hero Background
- **File**: `hero-bg.jpg`
- **Size**: 1920x500px or larger
- **Location**: `public/`
- **Note**: Should be a warehouse/shipping/export themed image

#### Product Images (all go in `public/products/`)
1. `spices.jpg` - Colorful spices image
2. `coconut.jpg` - Coconut image
3. `rice.jpg` - Rice varieties image
4. `moringa.jpg` - Moringa image
5. `exotic-seeds.jpg` - Seeds image
6. `cow-dung.jpg` - Organic fertilizer image
7. `vegetables.jpg` - Fresh vegetables image
8. `nuts-seeds.jpg` - Nuts and seeds image

**Export Settings:**
- Format: JPG (for photos)
- Quality: 80-90%
- Size: 800x500px (will display at 400x250)

## Step 2: Add Images to Project

1. Copy all exported images to the appropriate folders:
   ```
   public/
   ├── logo-icon.png (or .svg)
   ├── hero-bg.jpg
   └── products/
       ├── spices.jpg
       ├── coconut.jpg
       ├── rice.jpg
       ├── moringa.jpg
       ├── exotic-seeds.jpg
       ├── cow-dung.jpg
       ├── vegetables.jpg
       └── nuts-seeds.jpg
   ```

## Step 3: Update Code to Use Real Images

### Option A: Keep File Names (Recommended)
If you named your exports exactly as listed above, you're done! Just update the code:

**In `src/app/page.tsx`:**
Replace the placeholder imports with actual paths:

```typescript
// Remove this line:
import { productPlaceholders } from '@/lib/placeholders';

// Update each product's image property from:
image: productPlaceholders.spices,
// To:
image: '/products/spices.jpg',
```

**In `src/app/products/page.tsx`:**
Do the same replacement.

**In `src/app/page.module.css`:**
Update the hero background:
```css
.hero {
  background-image: url('/hero-bg.jpg');
  /* Remove the gradient line */
}
```

**In `src/components/Header.tsx`:**
Update logo if using PNG:
```typescript
<Image src="/logo-icon.png" alt="Iconite Earth" width={40} height={40} />
```

### Option B: Different File Names
If your exports have different names, update the paths in the code to match your file names.

## Step 4: Optimize Images (Optional but Recommended)

Use an image optimization tool:
- **Online**: [TinyPNG](https://tinypng.com/) or [Squoosh](https://squoosh.app/)
- **CLI**: `npm install -g sharp-cli` then `sharp -i input.jpg -o output.jpg`

This reduces file sizes without visible quality loss.

## Step 5: Test

1. Save all files
2. The dev server should auto-reload
3. Check [http://localhost:3000](http://localhost:3000)
4. Verify all images load correctly
5. Test on mobile view (resize browser or use DevTools)

## Quick Replace Script

If you want to quickly replace all placeholders, here's what to change:

### File: `src/app/page.tsx`

**Find:**
```typescript
import { productPlaceholders } from '@/lib/placeholders';
```
**Replace with:** (delete this line)

**Find all instances like:**
```typescript
image: productPlaceholders.spices,
```
**Replace with:**
```typescript
image: '/products/spices.jpg',
```

Do this for all products:
- `productPlaceholders.spices` → `'/products/spices.jpg'`
- `productPlaceholders.coconut` → `'/products/coconut.jpg'`
- `productPlaceholders.rice` → `'/products/rice.jpg'`
- `productPlaceholders.moringa` → `'/products/moringa.jpg'`
- `productPlaceholders['exotic-seeds']` → `'/products/exotic-seeds.jpg'`
- `productPlaceholders['cow-dung']` → `'/products/cow-dung.jpg'`
- `productPlaceholders.vegetables` → `'/products/vegetables.jpg'`
- `productPlaceholders['nuts-seeds']` → `'/products/nuts-seeds.jpg'`

### File: `src/app/products/page.tsx`

Repeat the same replacements as above.

### File: `src/app/page.module.css`

**Find:**
```css
background: linear-gradient(135deg, #2C5F5D 0%, #234d4b 100%);
```
**Replace with:**
```css
background-image: url('/hero-bg.jpg');
```

## Troubleshooting

### Images not showing?
1. Check file names match exactly (case-sensitive)
2. Verify files are in the correct folders
3. Clear browser cache (Ctrl+Shift+R)
4. Restart the dev server

### Images too large/slow?
1. Optimize images (see Step 4)
2. Use Next.js Image component (already implemented)
3. Consider using WebP format for better compression

### Logo not showing?
1. If using SVG, keep the extension as `.svg` in the code
2. If using PNG, change the extension to `.png` in Header.tsx
3. Ensure the file is in the `public/` folder (not `public/products/`)

## Alternative: Use Figma URLs Directly (Not Recommended)

You can temporarily use Figma export URLs, but this requires:
1. Making your Figma file public
2. Getting the direct image URLs
3. Images may load slower
4. Not suitable for production

For production, always use local images in the `public/` folder.

## Need Help?

If images still aren't working:
1. Check the browser console for errors (F12)
2. Verify the file paths are correct
3. Make sure the dev server is running
4. Try a hard refresh (Ctrl+Shift+R)
