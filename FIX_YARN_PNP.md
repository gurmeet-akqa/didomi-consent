# Fix for Yarn PnP Resolution Issue

## Problem
Vite cannot resolve `@didomi/react` because Yarn PnP (Plug'n'Play) is enabled, which requires special configuration.

## Solution Applied
1. Created `.yarnrc.yml` with `nodeLinker: node-modules` to use traditional node_modules instead of PnP
2. Updated `vite.config.js` to include proper resolution settings
3. Removed unnecessary `@yarnpkg/pnpify` dependency

## Steps to Complete the Fix

### Option 1: Restart Dev Server (Recommended)
1. **Stop the current dev server** (Ctrl+C in the terminal where it's running)
2. **Close any processes** that might be locking files:
   ```powershell
   # In PowerShell, find and kill any node processes if needed
   Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
   ```
3. **Clean and reinstall**:
   ```bash
   yarn install
   ```
4. **Start dev server again**:
   ```bash
   yarn dev
   ```

### Option 2: If File Lock Persists
If you still get permission errors:

1. **Close all terminals and VS Code/Cursor**
2. **Manually delete** (if needed):
   - `.yarn` folder
   - `.pnp.cjs` file
   - `.pnp.loader.mjs` file
3. **Reopen the project** and run:
   ```bash
   yarn install
   yarn dev
   ```

### Option 3: Use npm Instead
If Yarn continues to have issues:

```bash
npm install
npm run dev
```

## Verification
After restarting, the dev server should start without the `@didomi/react` resolution error.

## Current Configuration
- ✅ `.yarnrc.yml` - Configured for node_modules mode
- ✅ `vite.config.js` - Updated with proper resolution settings
- ✅ `package.json` - @didomi/react is listed as a dependency
- ✅ Package exists in `node_modules/@didomi/react`

The issue should be resolved after restarting the dev server with the new configuration.

