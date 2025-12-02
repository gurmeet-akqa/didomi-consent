# Didomi Local Custom JSON Configuration Guide

This guide explains how to customize Didomi's HTML structure locally using a JSON configuration file, without needing to use the Didomi Dashboard.

## Overview

You can now customize the Didomi consent notice HTML structure locally in your codebase by editing a JSON file. The custom HTML will be automatically injected into the notice after it loads.

## Files Structure

```
public/
  ├── didomi-custom.json          # Your custom HTML configuration (EDIT THIS)
  └── didomi-custom-config.js     # Injection script (auto-generated)

index.html                        # Includes the injection script
```

## How It Works

1. **Didomi Loader Script** (in `index.html`) loads the notice from Didomi's servers
2. **Custom Config Script** (`didomi-custom-config.js`) loads your local JSON file
3. **HTML Injection** happens automatically when the notice appears
4. **Event Handlers** are re-attached to your custom buttons

## Customizing the HTML

### Step 1: Edit the JSON File

Open `public/didomi-custom.json` and modify the HTML structure:

```json
{
  "notice": {
    "content": {
      "html": {
        "en": "<div class=\"custom-notice-wrapper\">
                 <div class=\"custom-notice-header\">
                   <h2 class=\"custom-notice-title\">Your Custom Title</h2>
                 </div>
                 <div class=\"custom-notice-body\">
                   <p class=\"custom-notice-description\">Your custom description here</p>
                 </div>
                 <div class=\"custom-notice-footer\">
                   <button class=\"didomi-button-highlight\" data-didomi-action=\"accept\">Accept All</button>
                   <button class=\"didomi-button-regular\" data-didomi-action=\"reject\">Reject All</button>
                   <button class=\"didomi-button-link\" data-didomi-action=\"customize\">Customize</button>
                 </div>
               </div>"
      }
    },
    "buttons": {
      "accept": {
        "label": {
          "en": "Accept All"
        }
      },
      "reject": {
        "label": {
          "en": "Reject All"
        }
      },
      "customize": {
        "label": {
          "en": "Customize Preferences"
        }
      }
    }
  }
}
```

### Step 2: Add Custom CSS

Edit `src/styles/didomi-custom.css` to style your custom HTML:

```css
.custom-notice-wrapper {
  /* Your custom styles */
}

.custom-notice-title {
  /* Title styles */
}

.custom-notice-description {
  /* Description styles */
}
```

### Step 3: Test

1. Clear browser storage: `localStorage.clear()`
2. Refresh the page
3. The notice should appear with your custom HTML

## Important Notes

### Required Button Attributes

Your custom buttons **must** have these `data-didomi-action` attributes for functionality:

- `data-didomi-action="accept"` - Accept button
- `data-didomi-action="reject"` - Reject button  
- `data-didomi-action="customize"` - Customize/Preferences button

### Required CSS Classes

Use these classes for consistent styling with Didomi:

- `didomi-button-highlight` - Primary/Accept button
- `didomi-button-regular` - Secondary/Reject button
- `didomi-button-link` - Link-style button

### HTML Restrictions

Avoid these in your HTML (they're blocked by Didomi for security):

- `url()` in CSS
- `@import()`
- `@charset()`
- `expression()`
- `-moz-binding`
- `javascript:` protocols

## Multi-Language Support

Add multiple language versions:

```json
{
  "notice": {
    "content": {
      "html": {
        "en": "<div>English content</div>",
        "fr": "<div>Contenu français</div>",
        "de": "<div>Deutscher Inhalt</div>"
      }
    }
  }
}
```

The script will automatically detect the browser language or use 'en' as fallback.

## Example: Adding an Image

```json
{
  "notice": {
    "content": {
      "html": {
        "en": "<div class=\"custom-notice-wrapper\">
                 <div class=\"custom-notice-header\">
                   <img src=\"/images/logo.png\" alt=\"Logo\" class=\"notice-logo\" />
                   <h2 class=\"custom-notice-title\">Cookie Preferences</h2>
                 </div>
                 <div class=\"custom-notice-body\">
                   <p>We use cookies...</p>
                 </div>
                 <div class=\"custom-notice-footer\">
                   <button class=\"didomi-button-highlight\" data-didomi-action=\"accept\">Accept</button>
                   <button class=\"didomi-button-regular\" data-didomi-action=\"reject\">Reject</button>
                 </div>
               </div>"
      }
    }
  }
}
```

## Troubleshooting

### Custom HTML Not Appearing

1. **Check browser console** for errors
2. **Verify JSON is valid** - Use a JSON validator
3. **Check file path** - Ensure `didomi-custom.json` is in `public/` folder
4. **Clear cache** - Hard refresh (Ctrl+Shift+R)

### Buttons Not Working

1. **Check attributes** - Ensure buttons have `data-didomi-action` attributes
2. **Check Didomi loaded** - Verify `window.Didomi` exists in console
3. **Check event handlers** - Look for errors in browser console

### Styling Not Applying

1. **Import CSS file** - Ensure `didomi-custom.css` is imported in `App.jsx`
2. **Check CSS specificity** - You may need `!important` for some rules
3. **Inspect elements** - Use browser DevTools to see actual class names

## Advantages of Local Configuration

✅ **Version Control** - Track changes in Git  
✅ **Local Development** - Test changes without Dashboard  
✅ **Team Collaboration** - Share config via code repository  
✅ **CI/CD Integration** - Deploy with your application  
✅ **No Dashboard Dependency** - Edit locally, no internet needed

## Limitations

⚠️ **Notice ID Still Required** - The loader script still needs the notice ID from Dashboard  
⚠️ **Dashboard Override** - Dashboard settings may override some configurations  
⚠️ **Testing Required** - Always test after making changes

## Next Steps

1. Edit `public/didomi-custom.json` with your custom HTML
2. Style it in `src/styles/didomi-custom.css`
3. Test locally
4. Commit to your repository
5. Deploy!

