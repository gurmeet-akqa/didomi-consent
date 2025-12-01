# Quick Guide: Copy Local HTML & CSS to Didomi Dashboard

This guide shows you exactly what to copy from your local files and paste into the Didomi Dashboard.

## Workflow Overview

1. ✅ **Develop locally** - Edit HTML in `public/didomi-custom.json` and CSS in `src/styles/didomi-custom.css`
2. ✅ **Test locally** - See changes immediately in your browser
3. ✅ **Copy to Dashboard** - Copy the HTML and CSS to Didomi Dashboard when ready

---

## Step 1: Copy Custom HTML

### Source File
📁 `public/didomi-custom.json`

### What to Copy
Copy the HTML string from the `"html"` field:

```json
{
  "notice": {
    "content": {
      "html": {
        "en": "<div class=\"custom-notice-wrapper\">...</div>"  ← COPY THIS
      }
    }
  }
}
```

### Where to Paste in Dashboard

1. Go to [Didomi Dashboard](https://dashboard.didomi.io/)
2. Navigate to **Consent Notices** → Select your notice
3. Go to **Advanced Settings** → **Custom JSON**
4. Paste this JSON structure:

```json
{
  "notice": {
    "content": {
      "html": {
        "en": "PASTE_YOUR_HTML_HERE"
      }
    }
  }
}
```

**Or** if you just want the HTML string, paste it directly in the `"html"` field.

---

## Step 2: Copy Custom CSS

### Source File
📁 `src/styles/didomi-custom.css`

### What to Copy
Copy **ALL** the CSS content from the file (or just the parts you want).

### Where to Paste in Dashboard

1. In the same notice editor, go to **Advanced Settings** → **Custom CSS**
2. Paste your entire CSS file content
3. Click **Save**

---

## Quick Copy Commands

### Copy HTML from JSON (Windows)
```bash
# Open the JSON file and copy the HTML string from the "en" field
# Or use this PowerShell command to extract it:
Get-Content public\didomi-custom.json | ConvertFrom-Json | ConvertTo-Json -Depth 10
```

### Copy CSS (Windows)
```bash
# Copy entire CSS file content
Get-Content src\styles\didomi-custom.css | Set-Clipboard
```

---

## Example: Complete Copy Process

### 1. Extract HTML from JSON

**From:** `public/didomi-custom.json`
```json
"en": "<div class=\"custom-notice-wrapper\"><div class=\"custom-notice-header\"><h2 class=\"custom-notice-title\">Cookie Preferences</h2></div>..."
```

**To Dashboard Custom JSON:**
```json
{
  "notice": {
    "content": {
      "html": {
        "en": "<div class=\"custom-notice-wrapper\"><div class=\"custom-notice-header\"><h2 class=\"custom-notice-title\">Cookie Preferences</h2></div>..."
      }
    }
  }
}
```

### 2. Copy CSS

**From:** `src/styles/didomi-custom.css`
```css
/* Main Popup/Banner Container */
.didomi-popup,
.didomi-notice,
.didomi-banner {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', ...
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
}
...
```

**To Dashboard Custom CSS:**
Paste the entire CSS content directly.

---

## Tips for Easy Copying

### Tip 1: Format HTML for Readability
Before copying, you might want to format the HTML for easier editing:

```javascript
// In browser console, format the HTML:
const html = '<div class="custom-notice-wrapper">...</div>';
console.log(html.replace(/></g, '>\n<'));
```

### Tip 2: Use a JSON Formatter
Format the JSON before copying to Dashboard:
- Use an online JSON formatter
- Or use VS Code's "Format Document" command

### Tip 3: Keep Both in Sync
- **Local development** = `public/didomi-custom.json` + `src/styles/didomi-custom.css`
- **Dashboard production** = Copy from local files when ready

---

## What Gets Copied Where

| Local File | Dashboard Location | What to Copy |
|------------|-------------------|--------------|
| `public/didomi-custom.json` → `notice.content.html.en` | **Custom JSON** → `notice.content.html.en` | HTML string |
| `src/styles/didomi-custom.css` | **Custom CSS** | Entire CSS file |

---

## Verification Checklist

After copying to Dashboard:

- [ ] HTML appears correctly in Dashboard preview
- [ ] CSS styles are applied
- [ ] Buttons have correct `data-didomi-action` attributes
- [ ] Test on Dashboard preview
- [ ] Publish the notice
- [ ] Test on your live site

---

## Common Issues

### Issue: HTML doesn't appear in Dashboard
**Solution:** Make sure you're pasting into the `"html"` field within the JSON structure, not just as plain text.

### Issue: CSS not applying
**Solution:** 
- Check CSS selectors match your HTML classes
- Ensure CSS is in the **Custom CSS** section, not Custom JSON
- Check for syntax errors

### Issue: Buttons not working
**Solution:** Ensure buttons have `data-didomi-action` attributes:
- `data-didomi-action="accept"`
- `data-didomi-action="reject"`
- `data-didomi-action="customize"`

---

## Best Practice Workflow

1. **Develop & Test Locally**
   - Edit `public/didomi-custom.json`
   - Edit `src/styles/didomi-custom.css`
   - Test in browser

2. **Finalize Design**
   - Make sure everything looks good locally
   - Test on different screen sizes

3. **Copy to Dashboard**
   - Copy HTML from JSON → Dashboard Custom JSON
   - Copy CSS → Dashboard Custom CSS
   - Preview in Dashboard

4. **Publish**
   - Publish the notice in Dashboard
   - Test on production

---

## Quick Reference: File Locations

```
Your Project/
├── public/
│   └── didomi-custom.json          ← HTML structure (copy to Dashboard Custom JSON)
├── src/
│   └── styles/
│       └── didomi-custom.css        ← CSS styles (copy to Dashboard Custom CSS)
└── index.html                       ← Loader script (already configured)
```

---

**That's it!** You can now develop locally and easily copy to Dashboard when ready. 🚀

