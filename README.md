# Iconite Earth - Global Export & Delivery

A modern, responsive Next.js website for Iconite Earth, showcasing premium agricultural products and global export services.

## 🚀 Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Bootstrap 5** - Responsive CSS framework
- **Bootstrap Icons** - Icon library
- **CSS Modules** - Scoped component styling

## 📋 Features

- ✅ Fully responsive design (desktop, tablet, mobile)
- ✅ Homepage with hero section, about section, and product showcase
- ✅ Products page with filtering options
- ✅ Product cards with expandable varieties
- ✅ Search bar with category tabs
- ✅ Professional header and footer
- ✅ Smooth animations and hover effects
- ✅ SEO-optimized with proper meta tags
- ✅ Accessible and semantic HTML

## 🎨 Design

The design follows the Figma specifications with:
- **Primary Color**: #2C5F5D (Dark Teal)
- **Secondary Color**: #F5F1E8 (Beige)
- **Text Colors**: #333333 (Dark), #666666 (Light)
- **Clean, modern layout** with card-based components
- **Responsive breakpoints** for all screen sizes

## 📁 Project Structure

```
rice/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with Bootstrap imports
│   │   ├── page.tsx             # Homepage
│   │   ├── page.module.css      # Homepage styles
│   │   ├── products/
│   │   │   ├── page.tsx         # Products page
│   │   │   └── products.module.css
│   │   └── globals.css          # Global styles and CSS variables
│   ├── components/
│   │   ├── Header.tsx           # Navigation header
│   │   ├── Header.module.css
│   │   ├── Footer.tsx           # Footer with links
│   │   ├── Footer.module.css
│   │   ├── SearchBar.tsx        # Search with categories
│   │   ├── SearchBar.module.css
│   │   ├── ProductCard.tsx      # Product display card
│   │   └── ProductCard.module.css
│   └── lib/
│       └── placeholders.ts      # Placeholder image data URLs
└── public/
    ├── logo-icon.svg            # Logo icon
    └── IMAGE_ASSETS.md          # Image requirements guide
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🖼️ Adding Product Images

Currently, the app uses placeholder SVG images. To add real product images:

1. Create product images (recommended size: 400x250px)
2. Place them in the `public/products/` folder
3. Update the image paths in:
   - `src/app/page.tsx` (homepage products)
   - `src/app/products/page.tsx` (products page)

Required images:
- `public/logo-icon.png` - Company logo (40x40px)
- `public/products/spices.jpg`
- `public/products/coconut.jpg`
- `public/products/rice.jpg`
- `public/products/moringa.jpg`
- `public/products/exotic-seeds.jpg`
- `public/products/cow-dung.jpg`
- `public/products/vegetables.jpg`
- `public/products/nuts-seeds.jpg`

See `public/IMAGE_ASSETS.md` for detailed image requirements.

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Desktop**: 1200px+ (lg)
- **Tablet**: 768px - 1199px (md)
- **Mobile**: < 768px (sm)

All components adapt their layout and styling based on screen size.

## 🎯 Pages

### Homepage (`/`)
- Hero section with call-to-action buttons
- Search bar with category filters
- About Iconite Earth section
- Premium products showcase (7 products)
- Call-to-action section
- Footer with links and contact info

### Products Page (`/products`)
- Page header with description
- Filter section (Origin, High Demand, Category)
- Full product grid with all varieties
- Each product card shows expandable varieties list

## 🔧 Customization

### Colors
Edit `src/app/globals.css` to change the color scheme:
```css
:root {
  --primary-color: #2C5F5D;
  --secondary-color: #F5F1E8;
  --text-dark: #333333;
  --text-light: #666666;
}
```

### Products
Edit the products array in:
- `src/app/page.tsx` for homepage
- `src/app/products/page.tsx` for products page

### Navigation
Edit `src/components/Header.tsx` to modify navigation links

### Footer
Edit `src/components/Footer.tsx` to update footer content and links

## 📝 Notes

- The app uses CSS Modules for component-scoped styling
- Bootstrap is used for the grid system and utilities
- All images currently use SVG placeholders - replace with actual photos
- The hero section uses a CSS gradient - replace with actual warehouse image if desired

## 🚀 Deployment

This Next.js app can be deployed to:
- **Vercel** (recommended) - Zero configuration
- **Netlify**
- **AWS Amplify**
- Any Node.js hosting platform

For Vercel deployment:
```bash
npm install -g vercel
vercel
```

## 📄 License

© 2025 Iconite Earth - All rights reserved

## 🤝 Support

For questions or support, contact: iconiteearth@gmail.com
