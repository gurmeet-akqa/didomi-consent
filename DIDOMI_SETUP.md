# Didomi SDK Setup Guide

This guide will help you set up and customize the Didomi Consent Management Platform (CMP) in this React application.

## Prerequisites

1. A Didomi account - Sign up at [https://dashboard.didomi.io/](https://dashboard.didomi.io/)
2. Your Didomi API Key (found in your Didomi Dashboard)

## Installation

The Didomi React SDK is already installed. If you need to reinstall:

```bash
yarn add @didomi/react
# or
npm install @didomi/react
```

## Configuration

### Step 1: Get Your API Key

1. Log in to your [Didomi Dashboard](https://dashboard.didomi.io/)
2. Navigate to **Settings** → **API Keys**
3. Copy your API Key

### Step 2: Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
VITE_DIDOMI_API_KEY=your_actual_api_key_here
```

**Important:** Never commit your `.env` file to version control. It's already included in `.gitignore`.

### Step 3: Update Configuration (Optional)

Edit `src/config/didomi.config.js` to customize Didomi settings:

```javascript
export const didomiConfig = {
  apiKey: import.meta.env.VITE_DIDOMI_API_KEY || 'YOUR_API_KEY',
  gdprAppliesGlobally: true,
  language: 'en', // Optional: Set default language
  noticeId: 'your-notice-id', // Optional: If you have multiple notices
}
```

## Customization

### Custom CSS Styling

The custom styles are located in `src/styles/didomi-custom.css`. You can modify this file to match your design requirements.

**Current Customizations:**
- Gradient background (purple theme)
- Modern button styles
- Responsive design for mobile
- Smooth transitions and hover effects

**Common CSS Selectors:**
- `.didomi-popup` - Main popup container
- `.didomi-banner` - Banner container
- `.didomi-button-highlight` - Primary/accept button
- `.didomi-button-regular` - Secondary/reject button
- `.didomi-popup-title` - Title text
- `.didomi-popup-description` - Description text

### Example: Change Color Scheme

To change the color scheme, edit `src/styles/didomi-custom.css`:

```css
/* Change gradient background */
.didomi-popup-view {
  background: linear-gradient(135deg, #your-color-1 0%, #your-color-2 100%);
}

/* Change button colors */
.didomi-button-highlight {
  background: #your-primary-color;
  color: #your-text-color;
}
```

### Customize via Didomi Dashboard

You can also customize the consent notice through the Didomi Console:

1. Log in to [Didomi Dashboard](https://dashboard.didomi.io/)
2. Go to **Consent Notices**
3. Select your notice
4. Navigate to **Customization** → **CSS**
5. Add your custom CSS rules

**Note:** Some CSS expressions are restricted for security. See [Didomi's documentation](https://support.didomi.io/restricted-css-expressions) for details.

## Testing

### Local Development

1. Start the development server:
   ```bash
   yarn dev
   # or
   npm run dev
   ```

2. The consent notice should appear automatically if:
   - You're in a GDPR region (EU), OR
   - You haven't given consent yet

### Force Show Notice (Testing)

To force the notice to appear regardless of location, add this to your URL:

```
http://localhost:5173/#didomi:notice.ignoreCountry=true
```

### Check Consent Status

Open your browser's developer console. You'll see logs when:
- Didomi SDK is ready
- Consent is given/withdrawn
- Notice is shown/hidden

## Integration in Code

The Didomi SDK is integrated in `src/App.jsx`:

```jsx
<DidomiSDK
  apiKey={didomiConfig.apiKey}
  gdprAppliesGlobally={didomiConfig.gdprAppliesGlobally}
  onReady={handleDidomiReady}
  onConsentChanged={handleConsentChanged}
  onNoticeShown={handleNoticeShown}
  onNoticeHidden={handleNoticeHidden}
/>
```

### Using Consent Status in Your App

You can check consent status programmatically:

```javascript
import { Didomi } from '@didomi/react';

// Check if user has consented to a specific purpose
const hasConsented = Didomi.getUserConsentStatusForPurpose('cookies');

// Check if user has consented to a vendor
const vendorConsented = Didomi.getUserConsentStatusForVendor('vendor-id');

// Get all consent status
const consentStatus = Didomi.getUserConsentStatus();
```

## Deployment

### Vercel Deployment

1. Add your API key as an environment variable in Vercel:
   - Go to your project settings in Vercel
   - Navigate to **Environment Variables**
   - Add `VITE_DIDOMI_API_KEY` with your API key value
   - Redeploy your application

2. The Didomi SDK will automatically load on your deployed site.

## Troubleshooting

### Notice Not Appearing

1. Check that your API key is correct
2. Verify you're in a GDPR region or use the test URL parameter
3. Clear your browser's localStorage (Didomi stores consent there)
4. Check browser console for errors

### Styling Not Applying

1. Ensure `didomi-custom.css` is imported in `App.jsx`
2. Check CSS specificity - you may need `!important` for some rules
3. Verify CSS selectors match Didomi's actual class names (inspect element)

### API Key Issues

- Make sure the API key is set in `.env` file
- Restart the dev server after adding/changing `.env`
- Verify the API key in Didomi Dashboard is active

## Resources

- [Didomi React SDK Documentation](https://developers.didomi.io/cmp/web-sdk/react)
- [Didomi Web SDK Reference](https://developers.didomi.io/cmp/web-sdk/reference)
- [Didomi Dashboard](https://dashboard.didomi.io/)
- [Didomi Support](https://support.didomi.io/)

## Support

For issues specific to Didomi:
- Check [Didomi Support Center](https://support.didomi.io/)
- Contact Didomi support through your dashboard

For issues with this integration:
- Check the browser console for errors
- Verify all dependencies are installed
- Ensure Node.js version is 18.12.0 or higher

