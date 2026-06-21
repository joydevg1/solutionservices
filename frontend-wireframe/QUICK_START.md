# 🚀 Quick Start - Images Integration

## 5-Minute Setup

### Step 1: Move Images to Public Folder
```bash
# Create images directory
mkdir -p public/images

# Move images (Windows PowerShell)
Move-Item ac1.jpg public/images/
Move-Item ac2.png public/images/
Move-Item ac3.png public/images/
Move-Item ac4.jpg public/images/

# OR move images (macOS/Linux)
mv ac1.jpg ac2.png ac3.png ac4.jpg public/images/
```

### Step 2: Start Development Server
```bash
npm install
npm run dev
```

### Step 3: Verify Images
Visit http://localhost:3000 and check:
- ✅ Hero carousel at top (auto-rotating images)
- ✅ Service gallery section (4 images in grid)
- ✅ Service detail pages (hero images)

---

## 📁 File Structure After Setup

```
frontend-wireframe/
├── public/
│   └── images/
│       ├── ac1.jpg
│       ├── ac2.png
│       ├── ac3.png
│       └── ac4.jpg
├── src/
│   ├── pages/
│   │   ├── HomePage.jsx ← Images used here
│   │   └── ServiceDetailPage.jsx ← Images used here
│   └── ...
├── package.json
└── README.md
```

---

## 🎬 What You'll See

| Section | Details |
|---------|---------|
| **Hero Carousel** | All 4 images rotate every 5 seconds |
| **Service Gallery** | 2x2 grid with hover zoom effects |
| **Service Pages** | Each service gets a random AC image |

---

## 🎨 Key Features Implemented

✅ Auto-rotating carousel (5 sec interval)  
✅ Manual navigation (arrows + dots)  
✅ Responsive image display  
✅ Lazy loading for performance  
✅ Hover zoom effects on gallery  
✅ Dark overlay for text readability  
✅ Service gallery with descriptions  

---

## 📝 Image Details

- **ac1.jpg**: Professional AC maintenance
- **ac2.png**: Advanced cooling solutions
- **ac3.png**: Quick & reliable service
- **ac4.jpg**: Customer satisfaction

---

## 🆘 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Images not showing | Check `public/images/` exists and has all 4 files |
| 404 errors in console | File names must match exactly (case-sensitive) |
| Carousel not rotating | Clear browser cache and restart dev server |
| Images distorted | Ensure images are at least 1200x800px |

---

## 💡 Tips

- Use browser DevTools (F12) to debug image loading
- Check "Network" tab to see if images load successfully
- Image files can be WebP for even better optimization
- Carousel interval can be changed from 5000ms to any value

---

**Ready to go! 🎉 All images are fully integrated.**
