# Troubleshooting Didomi SDK Errors

## Error: "EncodingError: Error encoding core->vendorListVersion: Cannot read properties of undefined (reading 'toString')"

### What This Error Means

This error occurs when the Didomi SDK tries to initialize but cannot fetch the vendor list information. This typically happens when:

1. **Invalid or Missing API Key** - The most common cause
2. **Network Issues** - Cannot reach Didomi's servers
3. **API Key Not Activated** - The API key exists but isn't properly configured in Didomi Dashboard

### Solution

#### Step 1: Verify Your API Key

1. **Check if `.env` file exists** in the root directory
2. **Verify the API key format:**
   ```bash
   VITE_DIDOMI_API_KEY=your_actual_api_key_here
   ```
   - No quotes around the key
   - No spaces before/after the `=`
   - The key should be a long string (usually 32+ characters)

#### Step 2: Get Your API Key from Didomi Dashboard

1. Log in to [Didomi Dashboard](https://dashboard.didomi.io/)
2. Navigate to **Settings** → **API Keys**
3. Copy your API Key
4. If you don't have one, create a new API key

#### Step 3: Create/Update `.env` File

Create a `.env` file in the root directory (same level as `package.json`):

```bash
VITE_DIDOMI_API_KEY=your_actual_api_key_from_dashboard
```

**Important:**
- The `.env` file should NOT be committed to git (it's already in `.gitignore`)
- Restart your dev server after creating/updating `.env`

#### Step 4: Restart Dev Server

After updating `.env`, you MUST restart the dev server:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
yarn dev
# or
npm run dev
```

### Verification

1. **Check the browser console** - The error should disappear
2. **Look for the warning banner** - If API key is still invalid, you'll see a red warning banner
3. **Test the notice** - Visit: `http://localhost:5173/#didomi:notice.ignoreCountry=true`

### Additional Troubleshooting

#### If Error Persists:

1. **Clear Browser Cache:**
   - Clear localStorage: `localStorage.clear()` in browser console
   - Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

2. **Check Network Tab:**
   - Open DevTools → Network tab
   - Look for failed requests to `*.didomi.io` domains
   - Check if requests are being blocked

3. **Verify API Key Format:**
   - API keys should not have spaces
   - Should be a single continuous string
   - Usually starts with letters/numbers

4. **Check Didomi Dashboard:**
   - Ensure your API key is active
   - Verify your Didomi account is properly set up
   - Check if there are any account restrictions

5. **Test with a Different Browser:**
   - Sometimes browser extensions can interfere
   - Try incognito/private mode

### Development Mode (Without API Key)

If you want to develop without Didomi temporarily, the app will now show a warning banner instead of crashing. The app will continue to work normally, just without the consent notice.

### Production Deployment

For Vercel deployment:

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add: `VITE_DIDOMI_API_KEY` with your actual API key value
4. Redeploy your application

### Common Mistakes

❌ **Wrong:**
```bash
VITE_DIDOMI_API_KEY = "your-key"  # Spaces and quotes
VITE_DIDOMI_API_KEY=YOUR_API_KEY  # Placeholder text
```

✅ **Correct:**
```bash
VITE_DIDOMI_API_KEY=abc123def456ghi789jkl012mno345pqr678stu901vwx234yz
```

### Still Having Issues?

1. Check Didomi's official documentation: https://developers.didomi.io/
2. Contact Didomi support through your dashboard
3. Check browser console for more detailed error messages
4. Verify your Didomi account is active and in good standing

