# SOLEA - Modern E-Commerce Footwear Platform

A responsive, modern e-commerce platform for premium footwear built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern UI/UX**: Clean, minimalist design with smooth animations and transitions
- **Responsive Design**: Fully responsive across all devices (mobile, tablet, desktop)
- **Product Catalog**: Browse through curated collections with filtering and sorting
- **Product Details**: Detailed product pages with image galleries, size selection, and color variants
- **Category Pages**: Dedicated pages for Men's, Women's, and special collections
- **Newsletter Integration**: Email subscription functionality
- **Performance Optimized**: Built with Next.js for fast page loads and SEO optimization

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Images**: Next.js Image Optimization with Unsplash
- **Icons**: Custom SVG icons

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with header/footer
│   ├── page.tsx            # Homepage
│   ├── shop/               # Shop/catalog page
│   ├── product/[id]/       # Dynamic product detail pages
│   ├── men/                # Men's collection
│   └── women/              # Women's collection
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── Footer.tsx          # Footer with links
│   └── ProductCard.tsx     # Reusable product card
└── public/                 # Static assets
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd "E Commerce"
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🎨 Key Pages

- **Homepage** (`/`) - Hero section, featured categories, new arrivals, best sellers
- **Shop** (`/shop`) - Complete product catalog with filters and sorting
- **Product Detail** (`/product/[id]`) - Individual product pages with full details
- **Men's Collection** (`/men`) - Curated men's footwear
- **Women's Collection** (`/women`) - Curated women's footwear

## 🔧 Configuration

### Image Optimization

Images are configured to use Unsplash as the remote pattern source. Update `next.config.js` to add additional image sources:

```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'your-domain.com',
      port: '',
      pathname: '/**',
    },
  ],
}
```

### Tailwind Configuration

Customize colors, fonts, and other design tokens in `tailwind.config.ts`.

## 📝 License

ISC

## 👨‍💻 Author

Created as a capstone project demonstrating modern web development practices.

---

**Note**: This is a demonstration project. Product images are sourced from Unsplash for educational purposes.
