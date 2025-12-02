# Didomi HTML Customization Guide

## Adding Images to Didomi Consent Notice

This guide explains how to add:
1. **An image on the top section** of the consent notice
2. **A small camera logo on the right side** of the consent notice

---

## Method 1: Using Didomi Dashboard (Recommended)

### Step 1: Access Didomi Dashboard
1. Log in to [Didomi Dashboard](https://dashboard.didomi.io/)
2. Navigate to **Consent Notices**
3. Select your consent notice
4. Go to **Customization** → **HTML/CSS**

### Step 2: Add Image to Top Section

In the **HTML** section, you can customize the notice structure. To add an image at the top:

**Option A: Using CSS Background Image**
- Go to **Customization** → **CSS**
- Add this CSS:
```css
.didomi-popup-view::before,
.didomi-notice-view::before {
  content: '';
  display: block;
  width: 100%;
  height: 120px; /* Adjust height as needed */
  background-image: url('YOUR_IMAGE_URL_HERE');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center top;
  margin-bottom: 1rem;
}
```

**Option B: Using HTML Template (if available)**
- Some Didomi plans allow HTML template customization
- Add an `<img>` tag at the beginning of your notice content
- Example structure:
```html
<div class="didomi-header-image">
  <img src="YOUR_IMAGE_URL" alt="Header Image" />
</div>
```

### Step 3: Add Camera Logo on Right Side

**Using CSS Pseudo-element:**
```css
.didomi-popup-view::after,
.didomi-notice-view::after {
  content: '';
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 32px; /* Adjust size as needed */
  height: 32px;
  background-image: url('YOUR_CAMERA_LOGO_URL');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 10;
}

.didomi-popup-view,
.didomi-notice-view {
  position: relative; /* Required for absolute positioning */
}
```

---

## Method 2: Using CSS in Your Project (src/styles/didomi-custom.css)

### Step 1: Prepare Your Images

1. **Add images to your project:**
   - Create a folder: `public/images/` or `src/assets/images/`
   - Place your header image there (e.g., `header-image.png`)
   - Place your camera logo there (e.g., `camera-logo.svg`)

2. **For public folder:** Use path `/images/header-image.png`
3. **For src/assets:** Import in your CSS or use relative paths

### Step 2: Add CSS Rules

Edit `src/styles/didomi-custom.css` and add:

**For Top Image:**
```css
/* Add image at the top of the notice */
.didomi-popup-view::before,
.didomi-notice-view::before,
.didomi-banner-view::before {
  content: '';
  display: block;
  width: 100%;
  max-width: 300px; /* Adjust as needed */
  height: 100px; /* Adjust height */
  margin: 0 auto 1.5rem auto;
  background-image: url('/images/header-image.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center top;
}

/* Ensure the view container has proper spacing */
.didomi-popup-view,
.didomi-notice-view,
.didomi-banner-view {
  position: relative;
  padding-top: 0; /* Adjust if needed */
}
```

**For Camera Logo on Right:**
```css
/* Add camera logo on the right side */
.didomi-popup-view::after,
.didomi-notice-view::after,
.didomi-banner-view::after {
  content: '';
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 24px; /* Small logo size */
  height: 24px;
  background-image: url('/images/camera-logo.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 1000;
  opacity: 0.8; /* Optional: make it subtle */
  transition: opacity 0.3s ease;
}

.didomi-popup-view::after:hover,
.didomi-notice-view::after:hover {
  opacity: 1;
}

/* Ensure parent containers are positioned */
.didomi-popup-view,
.didomi-notice-view,
.didomi-banner-view {
  position: relative;
}
```

---

## Method 3: Using JavaScript Injection (Advanced)

If you need more control, you can inject HTML after the notice loads:

### In `src/App.jsx`, modify the `handleNoticeShown` function:

```javascript
const handleNoticeShown = () => {
  console.log('Didomi Notice Shown')
  
  // Wait for DOM to be ready
  setTimeout(() => {
    // Find the notice container
    const noticeView = document.querySelector('.didomi-notice-view, .didomi-popup-view')
    
    if (noticeView) {
      // Add header image at top
      const headerImg = document.createElement('div')
      headerImg.className = 'custom-header-image'
      headerImg.innerHTML = '<img src="/images/header-image.png" alt="Header" />'
      noticeView.insertBefore(headerImg, noticeView.firstChild)
      
      // Add camera logo on right
      const cameraLogo = document.createElement('div')
      cameraLogo.className = 'custom-camera-logo'
      cameraLogo.innerHTML = '<img src="/images/camera-logo.svg" alt="Camera" />'
      cameraLogo.style.cssText = 'position: absolute; top: 1rem; right: 1rem; width: 24px; height: 24px; z-index: 1000;'
      noticeView.appendChild(cameraLogo)
    }
  }, 100)
}
```

Then add corresponding CSS in `didomi-custom.css`:
```css
.custom-header-image {
  text-align: center;
  margin-bottom: 1.5rem;
}

.custom-header-image img {
  max-width: 300px;
  height: auto;
}

.custom-camera-logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
```

---

## Image Requirements & Best Practices

### Image Formats:
- **Header Image:** PNG, JPG, or SVG (recommended: PNG with transparency or SVG)
- **Camera Logo:** SVG (best for scalability) or PNG with transparency

### Image Sizes:
- **Header Image:** Recommended max-width: 300-400px, height: 80-120px
- **Camera Logo:** 24x24px to 32x32px (small icon size)

### Image Optimization:
- Use WebP format for better compression (if supported)
- Compress images before adding
- Use SVG for logos/icons (scalable, small file size)

### Accessibility:
- Always include `alt` text for images
- Ensure images don't interfere with text readability
- Test with screen readers if needed

---

## Testing Your Customization

1. **Start your dev server:**
   ```bash
   yarn dev
   ```

2. **Force show the notice:**
   ```
   http://localhost:5173/#didomi:notice.ignoreCountry=true
   ```

3. **Inspect the elements:**
   - Open browser DevTools (F12)
   - Inspect the `.didomi-notice-view` or `.didomi-popup-view` element
   - Verify images are loading and positioned correctly

4. **Test responsiveness:**
   - Resize browser window
   - Test on mobile devices
   - Ensure images scale properly

---

## Troubleshooting

### Images Not Showing:
- Check image paths are correct
- Verify images exist in the specified location
- Check browser console for 404 errors
- Ensure images are in `public/` folder for absolute paths

### Positioning Issues:
- Verify parent container has `position: relative`
- Check z-index values (camera logo should be high, e.g., 1000)
- Adjust `top` and `right` values as needed

### Images Overlapping Content:
- Adjust padding/margins
- Reduce image sizes if needed
- Use `max-width` to constrain sizes

### Mobile Responsiveness:
- Add media queries for smaller screens
- Reduce image sizes on mobile
- Consider hiding camera logo on very small screens if needed

---

## CSS Selectors Reference

Common Didomi classes you can target:
- `.didomi-popup-view` - Main popup container
- `.didomi-notice-view` - Notice container
- `.didomi-banner-view` - Banner container
- `.didomi-popup-content` - Content area
- `.didomi-popup-title` - Title element
- `.didomi-popup-description` - Description text

---

## Next Steps

1. **Prepare your images** (header image + camera logo)
2. **Choose your method** (Dashboard CSS or project CSS)
3. **Add the CSS rules** to `src/styles/didomi-custom.css`
4. **Test locally** with the dev server
5. **Deploy** and test on production

For more advanced customization, refer to [Didomi's documentation](https://developers.didomi.io/cmp/web-sdk/customization).

