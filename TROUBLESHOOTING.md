# Troubleshooting Guide

## Issue: White/Blank Page

If you're seeing a blank white page when running `npm run dev`, follow these steps:

### Step 1: Clear Browser Cache

1. Open Developer Tools (F12 or Right-click → Inspect)
2. Go to the "Network" tab
3. Check "Disable cache"
4. Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)

### Step 2: Check Browser Console

1. Open Developer Tools (F12)
2. Go to "Console" tab
3. Look for any red error messages
4. Take a screenshot and check what the error says

### Step 3: Verify Server is Running

```bash
# Check if dev server is running
npm run dev
```

You should see:
```
▲ Next.js 16.3.6 (Turbopack)
- Local:        http://localhost:3000
✓ Ready in XXXms
```

### Step 4: Test Simple Page

Navigate to: `http://localhost:3000/test`

This is a simple test page. If this works, the issue is with the main page.

### Step 5: Use Simple Homepage (Temporary)

If the test page works but homepage doesn't, use the simple version:

```bash
# Backup current homepage
mv app/page.tsx app/page-full.tsx

# Use simple homepage
mv app/page-simple.tsx app/page.tsx
```

Then refresh browser: `http://localhost:3000`

### Step 6: Check for Port Conflicts

```bash
# Kill existing processes on port 3000
taskkill /F /IM node.exe

# Or use a different port
npm run dev -- --port 3001
```

Then open: `http://localhost:3001`

### Step 7: Rebuild the Project

```bash
# Stop dev server (Ctrl+C)

# Clean build files
Remove-Item -Recurse -Force .next

# Reinstall dependencies (if needed)
Remove-Item -Recurse -Force node_modules
npm install

# Rebuild and start
npm run build
npm run dev
```

### Step 8: Check Tailwind CSS

Verify Tailwind is working by opening browser console and typing:

```javascript
getComputedStyle(document.body).backgroundColor
```

Should return something like `rgb(255, 255, 255)` or similar.

### Step 9: Verify File Structure

Make sure these files exist:
- `app/layout.tsx`
- `app/page.tsx`
- `app/globals.css`
- `tailwind.config.ts`
- `next.config.js`

### Step 10: Check for JavaScript Errors

1. Open: `http://localhost:3000`
2. Open DevTools Console (F12)
3. Look for errors like:
   - "Cannot find module"
   - "Unexpected token"
   - "Failed to compile"

## Common Issues & Solutions

### Issue: "Port 3000 is already in use"

**Solution:**
```bash
# Windows
taskkill /F /PID <PID_NUMBER>

# Or use a different port
npm run dev -- --port 3001
```

### Issue: Tailwind styles not applying

**Solution:**
1. Check `app/globals.css` has:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

2. Check `tailwind.config.ts` has correct content paths:
```typescript
content: [
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
],
```

3. Restart dev server

### Issue: Images not loading

**Solution:**
1. Check internet connection (using Unsplash CDN)
2. Check `next.config.js` has:
```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'images.unsplash.com',
    },
  ],
}
```

### Issue: TypeScript errors

**Solution:**
```bash
# Check for TypeScript errors
npm run type-check

# If errors exist, fix them or check tsconfig.json
```

### Issue: Module not found

**Solution:**
```bash
# Reinstall dependencies
Remove-Item -Recurse -Force node_modules
npm install
```

## Still Not Working?

### Option 1: Use Simplified Version

I've created a simplified homepage at `app/page-simple.tsx`. To use it:

```bash
# In PowerShell
Move-Item app/page.tsx app/page-backup.tsx
Move-Item app/page-simple.tsx app/page.tsx
```

Refresh browser.

### Option 2: Start Fresh

```bash
# Clean everything
Remove-Item -Recurse -Force .next, node_modules

# Reinstall
npm install

# Start fresh
npm run dev
```

### Option 3: Check Specific URLs

Try accessing:
- `http://localhost:3000` - Homepage
- `http://localhost:3000/test` - Test page
- `http://localhost:3000/shop` - Shop page
- `http://localhost:3000/men` - Men's page

If ANY of these work, the setup is fine and it's just a page-specific issue.

## Getting Help

If you still have issues, provide:
1. Screenshot of browser console (F12)
2. Screenshot of terminal showing `npm run dev` output
3. Which URL you're trying to access
4. What you see (blank page, error message, etc.)

## Quick Test Commands

```bash
# Test if server is responding
curl http://localhost:3000

# Check if build works
npm run build

# Type check
npm run type-check

# Lint check
npm run lint
```

## Browser Compatibility

Tested on:
- Chrome 120+
- Firefox 120+
- Edge 120+
- Safari 17+

If using an older browser, try updating or use a modern browser.

## Development Tips

1. Always check browser console first
2. Hard refresh (Ctrl+Shift+R) after changes
3. Keep terminal visible to see compilation errors
4. Use React DevTools browser extension
5. Check Network tab for failed requests
