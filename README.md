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

## 📚 Documentation

- [Project Structure](docs/PROJECT_STRUCTURE.md) - Detailed folder and file organization
- [API Documentation](docs/API.md) - API routes and endpoints
- [Deployment Guide](docs/DEPLOYMENT.md) - How to deploy to various platforms
- [Features](docs/FEATURES.md) - Current and planned features
- [Contributing](CONTRIBUTING.md) - How to contribute to the project
- [Changelog](CHANGELOG.md) - Version history and updates

## 🧪 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
npm run type-check   # Run TypeScript type checking
```

### Project Structure

```
├── app/              # Next.js pages and routes
├── components/       # Reusable React components
├── data/             # Static and mock data
├── docs/             # Documentation files
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
├── public/           # Static assets
└── types/            # TypeScript definitions
```

## 🔒 Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your values:

```bash
cp .env.local.example .env.local
```

Required variables:
- `NEXT_PUBLIC_APP_URL` - Your application URL
- Database credentials (if using)
- Payment gateway keys (Stripe)
- Email service credentials

## 🚀 Deployment

See the [Deployment Guide](docs/DEPLOYMENT.md) for detailed instructions on deploying to:
- Vercel (recommended)
- Netlify
- Docker
- Self-hosted

## 📝 License

ISC - See [LICENSE](LICENSE) file for details

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 👨‍💻 Author

Created as a capstone project demonstrating modern web development practices with Next.js, TypeScript, and Tailwind CSS.

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Note**: This is a demonstration project. Product images are sourced from Unsplash for educational purposes.
