# Appliance Services - Frontend Wireframe

A comprehensive React + Vite + TailwindCSS UI wireframe implementation for an appliance services booking platform with integrated service images.

## ✨ Features

- ✅ **Home Page** - Hero carousel with AC images, service grid, customer reviews, promotional banners
- ✅ **Service Detail Page** - Dynamic hero images, sub-services with pricing, duration, add to cart
- ✅ **Shopping Cart** - Side panel with items management
- ✅ **Checkout Flow** - 4-step checkout (address, date/time, payment method, summary)
- ✅ **Payment Gateway** - Secure payment interface with success/failure states
- ✅ **Authentication** - Dual login system (Customer & Admin)
- ✅ **Customer Dashboard** - Bookings, saved addresses, payment methods, preferences
- ✅ **Admin Dashboard** - Analytics, charts, recent orders, technician performance
- ✅ **Chat Support** - AI chatbot with human agent escalation
- ✅ **Image Integration** - AC service images in carousel and gallery sections
- ✅ **Responsive Design** - Mobile, tablet, and desktop layouts
- ✅ **Modern UI** - Soothing colors, smooth animations, professional design

## Tech Stack

- **Frontend Framework**: React 18.2
- **Build Tool**: Vite 4.4
- **Styling**: TailwindCSS 3.3
- **Routing**: React Router DOM 6.14
- **Icons**: Lucide React 0.263
- **Charts**: Recharts 2.7
- **CSS**: PostCSS with Autoprefixer

## Project Structure

```
frontend-wireframe/
├── src/
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── ServiceDetailPage.jsx
│   │   ├── CheckoutPage.jsx
│   │   ├── PaymentPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── CustomerDashboard.jsx
│   │   └── AdminDashboard.jsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   └── Footer.jsx
│   │   ├── chat/
│   │   │   └── ChatWindow.jsx
│   │   └── cart/
│   │       └── CartPanel.jsx
│   ├── context/
│   │   └── AppContext.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn
- Images placed in `public/images/` (see IMAGES_SETUP.md)

### Image Setup

Before starting the development server, ensure the AC service images are properly placed:

1. See `IMAGES_SETUP.md` for detailed instructions
2. Required images:
   - `public/images/ac1.jpg`
   - `public/images/ac2.png`
   - `public/images/ac3.png`
   - `public/images/ac4.jpg`

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd frontend-wireframe
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   ```
   http://localhost:3000
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Color Scheme

- **Primary**: #1E3A5F (Deep Navy Blue)
- **Secondary**: #4A90E2 (Soft Blue)
- **Accent**: #FF6B6B (Warm Red)
- **Neutral**: #F5F7FA (Off-white)
- **Text**: #2C3E50 (Dark Blue-gray)

## Pages Overview

### Home Page
- Interactive carousel with navigation
- Service grid (10 services) with tiles
- Customer reviews section (horizontal scroll)
- Why Choose Us benefits
- **Service Gallery**: Displays all 4 AC images in a grid with hover effects
- Promotional banners
- Responsive footer

### Service Detail Page
- **Hero Image**: Dynamically displays AC images based on service type
- Service hero image with rating
- Sub-services grid with pricing
- Add to cart functionality
- Service description and features
- CTA for checkout

### Checkout Page
- 4-step checkout flow
- Step 1: Delivery address (current location or manual)
- Step 2: Service date & time selection
- Step 3: Payment method selection
- Step 4: Order summary and review
- Sticky sidebar with order total

### Payment Page
- Secure payment interface
- Card details input
- Payment processing state
- Success/failed states with next steps
- Order confirmation details

### Authentication
- Login type selection (Customer/Admin)
- Email/ID and password input
- Remember me option
- Social login (customer only)
- Error handling

### Customer Dashboard
- Profile section with avatar
- My Bookings tab (upcoming & past)
- Saved Addresses management
- Payment Methods management
- Notification Preferences
- Account settings

### Admin Dashboard
- Quick stats cards
- Orders by type (pie chart)
- Monthly revenue (line chart)
- Technician performance ranking
- Orders by location
- Recent orders table
- Management section shortcuts

### Chat Support
- AI chatbot interface
- Quick option buttons
- Message history
- Human agent escalation
- Minimize/restore functionality

## Features in Detail

### Image Implementation

**Homepage Hero Carousel:**
- 4-image rotating carousel (ac1.jpg, ac2.png, ac3.png, ac4.jpg)
- Auto-rotates every 5 seconds
- Manual navigation with previous/next arrows
- Dot indicators for quick jump
- Full-width responsive height
- Dark overlay for text readability

**Service Gallery Section:**
- Grid display of all 4 images
- 2 columns on desktop, 1 on mobile
- Hover effects with scale and shadow
- Image titles and descriptions
- Positioned in "Why Choose Us" section

**Service Detail Pages:**
- Dynamic image assignment based on service type
- Full-width hero image section
- Gradient overlay for content visibility
- Responsive image scaling

### Responsive Design
- Mobile: 1 column services, bottom navigation
- Tablet: 2 columns, collapsed sidebar
- Desktop: 3-5 columns, full sidebar

### State Management
- Global context with React Context API
- Cart items management
- User authentication state
- Chat window visibility
- Cart panel toggle

### Animations
- Fade in animations for pages
- Slide animations for modals
- Hover effects on tiles and buttons
- Smooth transitions (300-400ms)

### Accessibility
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- High contrast colors
- Large touch targets (44x44px minimum)

## Demo Credentials

For testing the login functionality:

**Customer Login:**
- Email: `demo@example.com` (or any email)
- Password: `password` (minimum 3 characters)

**Admin Login:**
- Admin ID: `admin001` (or any ID)
- Password: `password`

## Next Steps

1. **Integration**: Connect with backend API
2. **Authentication**: Implement JWT tokens
3. **Payment**: Integrate Stripe/Razorpay
4. **Real-time Updates**: Add WebSocket for live tracking
5. **Maps Integration**: Add Google Maps for location
6. **Image Optimization**: Implement CDN for images
7. **PWA Features**: Add service worker for offline support

## Performance Optimizations

- Code splitting with React Router
- Image lazy loading
- CSS minification
- Tree shaking with Vite
- Optimized bundle size

## Documentation

- **[QUICK_START.md](./QUICK_START.md)** - 5-minute setup guide with images
- **[IMAGES_SETUP.md](./IMAGES_SETUP.md)** - Detailed image installation instructions
- **[IMAGE_USAGE_GUIDE.md](./IMAGE_USAGE_GUIDE.md)** - Visual reference showing where images are used throughout the app

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

MIT

---

**Built with ❤️ for Appliance Services**
