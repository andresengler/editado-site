# Editado Studio

An editorial studio crafting meaning, beauty, and long-lasting narratives.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
editado-studio/
├── App.tsx                 # Main application component
├── main.tsx               # React entry point
├── index.html             # HTML entry point
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── ...               # Page components
├── styles/               # CSS and fonts
│   ├── globals.css       # Global styles (Tailwind v4)
│   └── fonts/           # Custom fonts
└── public/              # Static assets
```

## 🎨 Technology Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Typography**: Opening Hours Sans + Neue Montreal Book

## 🌐 Deployment

### Vercel (Recommended)

1. **Connect GitHub Repository**
   ```bash
   # Create GitHub repo and push code
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/editado-studio.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure project:
     - Framework Preset: **Vite**
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Click **Deploy**

3. **Custom Domain** (Optional)
   - In Vercel dashboard, go to Settings > Domains
   - Add your custom domain
   - Configure DNS records as shown

### Alternative: Netlify

```bash
# Build the project
npm run build

# Deploy to Netlify
npx netlify-cli deploy --prod --dir=dist
```

### Alternative: GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
# "deploy": "gh-pages -d dist"

# Build and deploy
npm run build
npm run deploy
```

## 📝 Environment Setup

### Required Font Files

Ensure these fonts are in `/styles/fonts/`:
- `OpeningHoursSans-Regular.woff2`
- `NeueMontreal-Book.woff2`

### Build Configuration

The project is configured for optimal production builds:
- **Code splitting**: Vendor, motion, and icons bundles
- **Font optimization**: Preloaded critical fonts
- **Asset optimization**: Compressed and cached static assets
- **SEO optimization**: Meta tags and social media previews

## 🔧 Development

### Local Development

```bash
# Start dev server (localhost:3000)
npm run dev

# Type checking
npx tsc --noEmit

# Linting
npm run lint
```

### Typography System

The project uses a custom editorial typography system with CSS variables:

```css
/* Editorial Typography Variables */
--font-navigation: 14px;
--font-section-title: 16px;
--font-content: 15px;
--font-tagline: 18px;
--font-footer: 13px;
```

### Animation System

Framer Motion is used for:
- Page transitions
- Floating letters background effect
- Hover interactions
- Staggered content animations

## 📊 Performance

- **Lighthouse Score**: 95+ (optimized)
- **Font Loading**: FOUT prevention with font-display: swap
- **Bundle Size**: Optimized with code splitting
- **Core Web Vitals**: Excellent ratings

## 🎯 Features

- **Responsive Design**: Mobile-first approach
- **Editorial Typography**: Custom font system
- **Smooth Animations**: Framer Motion integration
- **Interactive Navigation**: Mobile dropdown, desktop hover states
- **Accessibility**: Semantic HTML and ARIA attributes
- **SEO Optimized**: Meta tags, social media previews
- **Fast Loading**: Optimized assets and code splitting

## 📞 Contact

For questions about this project, contact Editado Studio.

---

Built with ♥ using modern web technologies.
```