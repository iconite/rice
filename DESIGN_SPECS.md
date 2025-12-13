# Design Specifications - Iconite Earth

## Color Palette

### Primary Colors
- **Primary (Dark Teal)**: `#2C5F5D`
  - Used for: Header contact button, footer background, CTA sections, links
  - Hover state: `#234d4b`

- **Secondary (Beige)**: `#F5F1E8`
  - Used for: Page background, section backgrounds

- **White**: `#FFFFFF`
  - Used for: Card backgrounds, header background, text on dark backgrounds

### Text Colors
- **Dark Text**: `#333333` - Primary text color
- **Light Text**: `#666666` - Secondary text, descriptions
- **Border Color**: `#E0E0E0` - Card borders, dividers

## Typography

### Font Family
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
```

### Font Sizes
- **Hero Title**: 3rem (48px) - Desktop, 2rem (32px) - Mobile
- **Section Titles**: 2rem (32px) - Desktop, 1.75rem (28px) - Mobile
- **Product Titles**: 1.25rem (20px)
- **Body Text**: 0.95rem - 1rem (15-16px)
- **Small Text**: 0.875rem (14px)

### Font Weights
- **Bold Headings**: 600-700
- **Medium**: 500
- **Regular**: 400

## Spacing

### Section Padding
- **Desktop**: 4rem (64px) top/bottom
- **Mobile**: 3rem (48px) top/bottom

### Component Spacing
- **Card Gap**: 1.5rem (24px)
- **Element Gap**: 1rem (16px)
- **Small Gap**: 0.5rem (8px)

### Border Radius
- **Cards**: 8px
- **Buttons**: 4px
- **Filter Tags**: 20px (pill shape)

## Components

### Header
- **Height**: Auto (padding: 1rem)
- **Background**: White
- **Box Shadow**: `0 2px 4px rgba(0, 0, 0, 0.05)`
- **Position**: Sticky top
- **Logo Size**: 40x40px

### Hero Section
- **Height**: 500px (Desktop), 400px (Mobile)
- **Background**: Gradient or warehouse image
- **Overlay**: `rgba(0, 0, 0, 0.5)`
- **Text Color**: White

### Product Cards
- **Image Height**: 220px (Desktop), 180px (Mobile)
- **Padding**: 1.25rem (20px)
- **Box Shadow**: `0 2px 8px rgba(0, 0, 0, 0.08)`
- **Hover Shadow**: `0 4px 16px rgba(0, 0, 0, 0.12)`
- **Hover Transform**: `translateY(-4px)`

### Buttons

#### Primary Button
- **Background**: `#2C5F5D`
- **Text**: White
- **Padding**: 0.875rem 2rem
- **Hover**: `#234d4b` with `translateY(-2px)`

#### Secondary Button (Outline)
- **Border**: 2px solid white (on dark) or primary color
- **Background**: Transparent
- **Hover**: Fill with border color

#### Contact Button (Header)
- **Background**: `#2C5F5D`
- **Text**: White
- **Padding**: 0.625rem 1.5rem

### Footer
- **Background**: `#2C5F5D`
- **Text**: `rgba(255, 255, 255, 0.85)`
- **Padding**: 3rem 0 1rem
- **Social Icons**: 36x36px circles

### Search Bar
- **Background**: White
- **Input Border**: `#E0E0E0`
- **Focus Border**: `#2C5F5D`
- **Category Tabs**: Active state with bottom border

## Responsive Breakpoints

```css
/* Large Desktop */
@media (min-width: 1200px) { ... }

/* Desktop/Tablet */
@media (max-width: 992px) { ... }

/* Mobile */
@media (max-width: 768px) { ... }
```

## Animations & Transitions

### Standard Transition
```css
transition: all 0.3s ease;
```

### Hover Effects
- **Cards**: Scale image 1.05, lift card -4px
- **Buttons**: Lift -2px, add shadow
- **Links**: Color change to primary

### Image Zoom
```css
.productCard:hover .productImage {
  transform: scale(1.05);
}
```

## Grid System (Bootstrap)

### Container
- **Max Width**: 1140px (lg), 960px (md), 720px (sm)
- **Padding**: 15px each side

### Product Grid
- **Desktop (lg)**: 3 columns (col-lg-4)
- **Tablet (md)**: 2 columns (col-md-6)
- **Mobile**: 1 column (full width)
- **Gap**: g-4 (1.5rem)

## Icons

### Bootstrap Icons
- **Size**: 1rem - 1.125rem
- **Color**: Inherit from parent
- **Usage**: Social media, arrows, filters

## Accessibility

- **Focus States**: Visible outline on all interactive elements
- **Alt Text**: All images have descriptive alt text
- **Semantic HTML**: Proper heading hierarchy (h1, h2, h3)
- **ARIA Labels**: Buttons and icons have aria-label attributes
- **Color Contrast**: WCAG AA compliant

## Image Specifications

### Product Images
- **Dimensions**: 400x250px (16:10 ratio)
- **Format**: JPG (photos), PNG (with transparency)
- **Optimization**: Compressed for web

### Logo
- **Dimensions**: 40x40px (square)
- **Format**: SVG or PNG
- **Background**: Transparent

### Hero Background
- **Dimensions**: 1920x500px minimum
- **Format**: JPG
- **Subject**: Warehouse/export theme
