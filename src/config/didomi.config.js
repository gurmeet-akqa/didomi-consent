/**
 * Didomi SDK Configuration
 * 
 * Replace 'YOUR_API_KEY' with your actual Didomi API key.
 * You can get your API key from: https://dashboard.didomi.io/
 * 
 * For local development, create a .env file with:
 * VITE_DIDOMI_API_KEY=your_api_key_here
 */

export const didomiConfig = {
  // API Key - Get this from Didomi Dashboard
  // IMPORTANT: Set this in your .env file as VITE_DIDOMI_API_KEY=your_key_here
  apiKey: import.meta.env.VITE_DIDOMI_API_KEY || '',
  
  // GDPR applies globally
  gdprAppliesGlobally: true,
  
  // Language (optional - defaults to browser language)
  // language: 'en',
  
  // Notice ID (optional - if you have multiple notices)
  // noticeId: 'your-notice-id',
  
  // Force show notice for testing (ignores country and consent status)
  // Set to true in development to always show the notice
  forceShowNotice: import.meta.env.DEV && import.meta.env.VITE_DIDOMI_FORCE_SHOW === 'true',
  
  // Additional configuration options
  // See: https://developers.didomi.io/cmp/web-sdk/reference/configuration
  
  // Disable automatic notice display if API key is invalid
  // This prevents the vendorListVersion error
  disabled: !import.meta.env.VITE_DIDOMI_API_KEY || import.meta.env.VITE_DIDOMI_API_KEY === '',
}

