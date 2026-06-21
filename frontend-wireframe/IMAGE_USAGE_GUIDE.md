# Image Usage Guide - Visual Reference

## 📸 Images Integrated Into the Application

### Image Files
- **ac1.jpg** - Professional AC maintenance
- **ac2.png** - Advanced cooling solutions  
- **ac3.png** - Quick & reliable service
- **ac4.jpg** - Customer satisfaction

---

## 🏠 Homepage Sections

### 1. Hero Carousel (Top Section)
```
┌─────────────────────────────────────────┐
│                                         │
│  [AUTO-ROTATING IMAGE CAROUSEL]        │
│                                         │
│  - Displays one image at a time        │
│  - Rotates every 5 seconds             │
│  - Manual navigation with arrows       │
│  - Dot indicators below                │
│  - Text overlay with title & description│
│                                         │
│  ◄ [Image] ◄ ● ○ ○ ○ ►                │
│                                         │
└─────────────────────────────────────────┘
```

### 2. Service Gallery Section (Why Choose Us)
```
┌──────────────────────────────────────────────┐
│  Our Service Quality                         │
├──────────────────────────────────────────────┤
│                                              │
│  ┌──────────────┐  ┌──────────────┐        │
│  │   ac1.jpg    │  │   ac2.png    │        │
│  │              │  │              │        │
│  │ Professional │  │ Advanced     │        │
│  │ AC Mainten.. │  │ Cooling..    │        │
│  └──────────────┘  └──────────────┘        │
│                                              │
│  ┌──────────────┐  ┌──────────────┐        │
│  │   ac3.png    │  │   ac4.jpg    │        │
│  │              │  │              │        │
│  │ Quick & Rel..│  │ Customer     │        │
│  │ Service      │  │ Satisfaction │        │
│  └──────────────┘  └──────────────┘        │
│                                              │
└──────────────────────────────────────────────┘

Hover Effects:
- Image scales up 1.1x
- Text slides up with fade
- Shadow increases
```

---

## 🔧 Service Detail Pages

### Hero Image Display
```
┌─────────────────────────────────────────┐
│                                         │
│  [SERVICE HERO IMAGE]                  │
│  - ac1.jpg, ac2.png, ac3.png, ac4.jpg  │
│                                         │
│  Overlay Content:                       │
│  - Service name (e.g., Air Conditioner)│
│  - Emoji icon                          │
│  - Rating (★★★★★ 4.8/5)               │
│  - Starting price                      │
│                                         │
│  Dark gradient overlay for readability │
│                                         │
└─────────────────────────────────────────┘
```

---

## 📊 Image Specifications

| Property | Value |
|----------|-------|
| **Format** | JPG/PNG |
| **Resolution** | 1200x800px (recommended) |
| **Aspect Ratio** | 3:2 |
| **Hero Height** | 384px (h-96) |
| **Gallery Height** | 192px (h-48) |
| **Loading** | Lazy loading enabled |
| **Optimization** | Object-fit: cover |

---

## 🎯 Image Distribution Map

```
Frontend-Wireframe Application
│
├── 🏠 Home Page (/)
│   ├── Hero Carousel (top)
│   │   └── Displays: ac1.jpg, ac2.png, ac3.png, ac4.jpg
│   │       Auto-rotates every 5 seconds
│   │
│   └── Service Gallery Section
│       └── Displays: All 4 images in 2x2 grid
│           With hover effects and descriptions
│
├── 🔍 Service Detail Pages (/service/:id)
│   ├── Service 1 (Water Purifier)
│   │   └── Hero: ac2.jpg (cycled)
│   │
│   ├── Service 2 (Air Conditioner) ⭐
│   │   └── Hero: ac1.jpg (primary)
│   │
│   ├── Service 3 (Fridge)
│   │   └── Hero: ac3.jpg (cycled)
│   │
│   ├── Service 4 (Washing Machine)
│   │   └── Hero: ac4.jpg (cycled)
│   │
│   └── ... (other services cycle through images)
│
└── Other Pages (No images used)
    ├── Checkout Page
    ├── Payment Page
    ├── Login Page
    ├── Customer Dashboard
    └── Admin Dashboard
```

---

## 🎨 Visual Effects Applied

### Carousel
- ✅ Auto-rotation (5 second interval)
- ✅ Smooth fade transitions
- ✅ Previous/Next arrow navigation
- ✅ Dot indicator controls
- ✅ Dark overlay (40% opacity)
- ✅ Centered text content

### Gallery
- ✅ Responsive grid (2 cols on desktop, 1 on mobile)
- ✅ Image zoom on hover (1.1x scale)
- ✅ Text slide-up animation
- ✅ Shadow increase on hover
- ✅ Dark overlay progression (0% to 40%)
- ✅ Smooth transitions (300ms)

### Service Detail
- ✅ Full-width image display
- ✅ Gradient overlay (left dark → right transparent)
- ✅ Lazy loading for performance
- ✅ Object-fit cover for perfect display
- ✅ Responsive height adaptation

---

## 🚀 Performance Optimizations

1. **Lazy Loading**
   - Images load only when needed
   - Reduces initial page load time
   - Applied to: carousel, gallery, service detail

2. **Object-Fit CSS**
   - Images maintain aspect ratio
   - No distortion on different screen sizes
   - Automatic cropping to fit container

3. **Responsive Heights**
   - Carousel: 384px (desktop) → scales on mobile
   - Gallery: 192px fixed height
   - Service Detail: 384px responsive

4. **Image Formats**
   - JPG: Best for photographs (ac1.jpg, ac4.jpg)
   - PNG: Best for graphics/screenshots (ac2.png, ac3.png)
   - Proper format selection = better compression

---

## 🔄 Carousel Auto-Rotation Logic

```javascript
useEffect(() => {
  const interval = setInterval(() => {
    setCarouselIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length)
  }, 5000) // 5000ms = 5 seconds
  return () => clearInterval(interval)
}, [])
```

**Timeline:**
- T=0s: ac1.jpg displayed
- T=5s: ac2.png displayed
- T=10s: ac3.png displayed
- T=15s: ac4.jpg displayed
- T=20s: ac1.jpg (cycle repeats)

---

## 📱 Responsive Behavior

### Desktop (>1024px)
- Carousel: Full width with 384px height
- Gallery: 2 columns
- Hero image: 384px height

### Tablet (768px - 1024px)
- Carousel: Full width with 320px height
- Gallery: 2 columns
- Hero image: 320px height

### Mobile (<768px)
- Carousel: Full width with 256px height
- Gallery: 1 column (stacked)
- Hero image: 256px height

---

## ✅ Setup Verification Checklist

- [ ] Images placed in `public/images/` directory
- [ ] All 4 images present (ac1.jpg, ac2.png, ac3.png, ac4.jpg)
- [ ] Development server running (`npm run dev`)
- [ ] Homepage carousel displays and rotates
- [ ] Service gallery shows all 4 images
- [ ] Service detail pages show images
- [ ] Hover effects work smoothly
- [ ] Images responsive on all screen sizes
- [ ] Browser console shows no 404 errors for images

---

## 🐛 Troubleshooting

**Images not showing?**
1. Check file names exactly match (case-sensitive)
2. Verify files are in `public/images/` directory
3. Clear browser cache (Ctrl+Shift+Del)
4. Restart dev server (`npm run dev`)
5. Check browser console for 404 errors

**Images look distorted?**
- Images should be at least 1200x800px
- Check image aspect ratio (should be 3:2)
- CSS is set to object-fit: cover (should handle scaling)

**Carousel not auto-rotating?**
- Check browser console for JavaScript errors
- Verify useEffect hook is running
- Test manual navigation (arrows/dots)

---

**Last Updated:** June 2026  
**Image Implementation:** Complete ✅
