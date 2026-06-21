# Images Setup Instructions

The frontend-wireframe uses AC service images for the hero carousel and service showcase sections.

## Image Files Required

Place the following images in the `public/images/` directory:

```
public/
└── images/
    ├── ac1.jpg
    ├── ac2.png
    ├── ac3.png
    └── ac4.jpg
```

## Current Image Location

The images are currently located in the root folder:
```
frontend-wireframe/
├── ac1.jpg
├── ac2.png
├── ac3.png
└── ac4.jpg
```

## Steps to Setup

1. Create the directory structure:
   ```bash
   mkdir -p public/images
   ```

2. Move the images to the correct location:
   ```bash
   # On Windows (PowerShell)
   Move-Item -Path ac1.jpg -Destination public/images/
   Move-Item -Path ac2.png -Destination public/images/
   Move-Item -Path ac3.png -Destination public/images/
   Move-Item -Path ac4.jpg -Destination public/images/
   
   # On Mac/Linux (bash)
   mv ac1.jpg public/images/
   mv ac2.png public/images/
   mv ac3.png public/images/
   mv ac4.jpg public/images/
   ```

3. Or use File Explorer to drag and drop the images to `public/images/`

## Where Images Are Used

- **Homepage Hero Carousel**: Auto-rotating carousel with all 4 images
- **Service Gallery Section**: Grid display of all 4 images with hover effects
- **Service Detail Pages**: Dynamic image assignment based on service type
- **Responsive Display**: Images scale perfectly on mobile, tablet, and desktop

## Image Display Details

- Carousel rotates automatically every 5 seconds
- Navigation arrows and dots for manual control
- Responsive height (h-96 = 384px on desktop, scales on mobile)
- Overlay gradient for better text readability
- Smooth transitions and hover effects

## Testing

1. Start the dev server:
   ```bash
   npm run dev
   ```

2. Visit http://localhost:3000

3. Verify:
   - Hero carousel displays images
   - Images auto-rotate with navigation controls
   - Service gallery shows all 4 images
   - Images are responsive on different screen sizes

---

**Note**: The images will not display until they are properly placed in the `public/images/` directory.
