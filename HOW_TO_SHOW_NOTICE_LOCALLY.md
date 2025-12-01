# How to Show Didomi Notice on Local Development

## Quick Methods to Show the Notice

### Method 1: Use Development Helper Buttons (Easiest)

When running in development mode (`yarn dev`), you'll see green "Dev Tools" buttons in the top-right corner:

1. **Show Notice** - Click to manually trigger the notice
2. **Clear Consent** - Clears stored consent and refreshes the page

### Method 2: Clear Browser Storage

The notice won't show if you've already given consent. Clear it:

**Option A: Browser Console**
1. Open browser DevTools (F12)
2. Go to Console tab
3. Run:
```javascript
localStorage.clear()
location.reload()
```

**Option B: Application Tab**
1. Open DevTools (F12)
2. Go to **Application** tab (Chrome) or **Storage** tab (Firefox)
3. Find **Local Storage** → `http://localhost:5173`
4. Delete the `didomi_token` entry
5. Refresh the page

**Option C: Clear All Site Data**
1. Open DevTools (F12)
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"

### Method 3: Force Show via URL Parameter

Add this to your URL:
```
http://localhost:5173/#didomi:notice.ignoreCountry=true
```

This forces the notice to show regardless of:
- Your location (GDPR region)
- Previous consent status

### Method 4: Configure Auto-Show in Development

Add to your `.env` file:
```bash
VITE_DIDOMI_FORCE_SHOW=true
```

Then restart your dev server. The notice will automatically show when the SDK loads.

### Method 5: Programmatically Show Notice

Open browser console and run:
```javascript
// Show the notice
window.Didomi.showNotice()

// Clear consent and show notice
window.Didomi.clearUserConsent()
window.Didomi.showNotice()
```

## Why the Notice Might Not Show

### 1. **Consent Already Given**
- Didomi stores consent in `localStorage`
- Once you accept/reject, it won't show again
- **Solution:** Clear localStorage (see Method 2)

### 2. **Not in GDPR Region**
- By default, Didomi only shows notices to users in GDPR regions (EU)
- **Solution:** Use URL parameter `#didomi:notice.ignoreCountry=true`

### 3. **Notice Not Configured in Dashboard**
- You need to create and publish a consent notice in Didomi Dashboard
- **Solution:** 
  1. Go to [Didomi Dashboard](https://dashboard.didomi.io/)
  2. Navigate to **Consent Notices**
  3. Create a new notice or ensure existing notice is **Published**
  4. Make sure it's assigned to your API key

### 4. **API Key Issues**
- Invalid or inactive API key
- **Solution:** Verify your API key in `.env` file and Didomi Dashboard

## Step-by-Step Setup Checklist

### ✅ Step 1: Verify API Key
```bash
# Check .env file exists and has valid key
cat .env
# Should show: VITE_DIDOMI_API_KEY=your_actual_key
```

### ✅ Step 2: Verify Notice in Dashboard
1. Log in to [Didomi Dashboard](https://dashboard.didomi.io/)
2. Go to **Consent Notices**
3. Ensure you have at least one notice
4. Ensure the notice status is **Published** (not Draft)
5. Check that the notice is assigned to your organization/API key

### ✅ Step 3: Clear Previous Consent
```javascript
// In browser console:
localStorage.clear()
```

### ✅ Step 4: Restart Dev Server
```bash
# Stop server (Ctrl+C)
yarn dev
```

### ✅ Step 5: Force Show Notice
Visit: `http://localhost:5173/#didomi:notice.ignoreCountry=true`

## Testing Different Scenarios

### Test 1: First Visit (No Consent)
```javascript
// Clear everything
localStorage.clear()
sessionStorage.clear()
location.reload()
```

### Test 2: After Accepting
1. Show notice
2. Click "Accept" or "Agree"
3. Notice should disappear
4. Refresh page - notice should NOT show again

### Test 3: After Rejecting
1. Show notice
2. Click "Reject" or "Decline"
3. Notice should disappear
4. Refresh page - notice should NOT show again

### Test 4: Clear and Show Again
```javascript
// Clear consent
window.Didomi.clearUserConsent()
localStorage.removeItem('didomi_token')
location.reload()
```

## Debugging Tips

### Check if SDK is Loaded
```javascript
// In browser console:
console.log(window.Didomi)
// Should show the Didomi object, not undefined
```

### Check Consent Status
```javascript
// In browser console:
window.Didomi.getUserConsentStatus()
// Shows current consent status
```

### Check if Notice Should Show
```javascript
// In browser console:
window.Didomi.shouldConsentBeCollected()
// Returns true/false
```

### View All Didomi Data
```javascript
// In browser console:
console.log(localStorage.getItem('didomi_token'))
// Shows stored consent token
```

## Common Issues & Solutions

### Issue: "Notice never appears"
**Solutions:**
1. Check browser console for errors
2. Verify API key is correct
3. Ensure notice is published in Dashboard
4. Try URL parameter: `#didomi:notice.ignoreCountry=true`
5. Clear all browser storage

### Issue: "Notice appears but disappears immediately"
**Solutions:**
1. Check if consent was already given
2. Clear localStorage
3. Check Didomi Dashboard notice configuration

### Issue: "Notice appears but buttons don't work"
**Solutions:**
1. Check browser console for JavaScript errors
2. Verify Didomi SDK loaded correctly
3. Check network tab for failed API requests

## Production vs Development

### Development
- Use `#didomi:notice.ignoreCountry=true` to test
- Use dev helper buttons
- Clear localStorage frequently for testing

### Production
- Notice shows automatically to users in GDPR regions
- Notice shows to users who haven't given consent
- Don't use force-show options in production

## Need More Help?

1. **Check Browser Console** - Look for errors or warnings
2. **Check Network Tab** - Verify requests to `*.didomi.io` are successful
3. **Didomi Dashboard** - Verify notice configuration
4. **Didomi Documentation** - https://developers.didomi.io/

