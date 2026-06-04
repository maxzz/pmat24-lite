# Bundle Size Analysis and Optimization Guide

**Date:** October 31, 2025  
**Current Bundle Size:** ~2.6 MB uncompressed (~800 KB gzipped)  
**Target Bundle Size:** ~1.2-1.5 MB uncompressed (~400-500 KB gzipped)

## 📊 Current Bundle Breakdown

| Chunk | Size (KB) | Size (MB) | Purpose |
|-------|-----------|-----------|---------|
| index.js | 675.9 | 0.66 | Main app code ⚠️ |
| vendor-react-dom | 610.3 | 0.60 | React DOM |
| vendor-other | 475.6 | 0.46 | Other vendors |
| vendor-radix-ui | 307.3 | 0.30 | Radix UI components |
| vendor-motion | 256.3 | 0.25 | Motion/Framer Motion |
| index.css | 136.3 | 0.13 | Tailwind CSS |
| vendor-utils | 51.8 | 0.05 | Utilities |
| vendor-react | 42.8 | 0.04 | React core |
| vendor-state | 34.1 | 0.03 | State management |
| vendor-syntax-highlighter | 23.6 | 0.02 | Syntax highlighter |
| **TOTAL** | **~2,614 KB** | **~2.55 MB** | |

## 🔍 Key Findings

### Critical Issues

1. **Main index.js is HUGE (676 KB)** ⚠️
   - This contains your application code and should be much smaller
   - Needs aggressive code splitting and lazy loading

2. **vendor-other (476 KB)** 
   - Contains: pm-manifest, browser-fs-access, sonner, vaul
   - Consider selective imports from pm-manifest

3. **Motion library (256 KB)**
   - Heavy animation library
   - Consider CSS animations for simple cases

4. **Radix UI (307 KB)**
   - All UI components bundled together
   - Already split into separate chunk (good!)

## 🎯 Action Plan to Reduce Bundle Size

### Priority 1: Lazy Load Heavy Features (Save ~300-400 KB)

Create a lazy loading file for heavy components:

```tsx
// src/renderer/src/components/lazy-components.tsx
import { lazy } from 'react';

// Lazy load dialogs and heavy components
export const DlgFieldCatalog = lazy(() => 
    import('./4-dialogs/4-dlg-field-catalog/0-all/0-all')
);

export const DlgCreateLogin = lazy(() => 
    import('./4-dialogs/2-dlg-create-login/1-dlg-w-saw/2-entry-create-dlg/0-all-dlg')
);

export const DlgOptions = lazy(() => 
    import('./4-dialogs/8-dlg-options/0-all')
);

export const DlgPolicy = lazy(() => 
    import('./4-dialogs/7-dlg-policy/0-all/0-conv/0-all')
);

export const SyntaxHighlighterXml = lazy(() => 
    import('./2-main/2-right/4-file-xml/syntax-highlighter-xml')
);
```

Then wrap usage in `<Suspense>`:

```tsx
import { Suspense } from 'react';
import { DlgFieldCatalog } from './lazy-components';

// In your component
<Suspense fallback={<div>Loading...</div>}>
    <DlgFieldCatalog />
</Suspense>
```

### Priority 2: Optimize Motion Usage (Save ~100-150 KB)

Replace simple animations with CSS where possible:

```css
/* Instead of <motion.div animate={{ opacity: 1 }} /> */
.fade-in {
    animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
```

Consider lazy loading motion components:

```tsx
// Only load motion when needed
const MotionDiv = lazy(() => 
    import('motion/react').then(mod => ({ default: mod.motion.div }))
);
```

### Priority 3: Optimize pm-manifest Import (Save ~50-100 KB)

Instead of re-exporting everything:

```tsx
// ❌ BAD - Imports everything
export * from "pm-manifest";

// ✅ GOOD - Only import what you need
export type { Mani, Meta, FormDef } from "pm-manifest"; // Types are tree-shakeable
export { parseMani, validateMani, createMani } from "pm-manifest";
```

Check `src/renderer/src/store/manifest/index.ts` and make selective.

### Priority 4: Remove Unused Code (Save ~100-200 KB)

Review and potentially remove these files:

**Experimental/Test Files:**
- `src/renderer/src/ui/local-ui/nun/ai-listview/radix-original-select.tsx` - Large file with many Radix imports (likely unused)
- Files in `nun/` folders - Appear to be experiments/tests
- Files with `x-` prefix - Seem like old/experimental code
- `7-test-lucide-icons-original.tsx` - Test file

**Unused shadcn Components:**
Review `src/renderer/src/ui/shadcn/` and remove components you don't use:
- Are you using all of: accordion, collapsible, context-menu, menubar, radio-group, etc.?

### Priority 5: Optimize lucide-react (Already Good! ✅)

You're already using selective imports:
```tsx
import { AlertOctagon, AppWindow, Check } from "lucide-react";
```

This is correct. Keep doing this!

### Priority 6: Configuration Improvements (Already Applied! ✅)

Updated `electron.vite.config.ts` with:

```typescript
function manualChunks(id: string) {
    if (id.includes("node_modules")) {
        if (id.includes("react-dom")) return "vendor-react-dom";
        if (id.includes("react") && !id.includes("react-")) return "vendor-react";
        if (id.includes("@radix-ui")) return "vendor-radix-ui";
        if (id.includes("motion")) return "vendor-motion";
        if (id.includes("lucide-react")) return "vendor-lucide";
        if (id.includes("react-syntax-highlighter")) return "vendor-syntax-highlighter";
        if (id.includes("jotai") || id.includes("valtio")) return "vendor-state";
        if (id.includes("fast-xml-parser") || id.includes("browser-fs-access")) {
            return "vendor-utils";
        }
        return "vendor-other";
    }
}
```

Build settings:
```typescript
build: {
    minify: 'esbuild',
    target: 'esnext',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
}
```

## 📝 Step-by-Step Implementation

### Step 1: Analyze Current Bundle
```bash
pnpm build
# Open visualization.html in browser to see what's taking space
```

### Step 2: Implement Lazy Loading
1. Create `lazy-components.tsx`
2. Update dialog imports to use lazy components
3. Wrap in `<Suspense>` boundaries

### Step 3: Clean Up Unused Code
1. Search for files in `nun/` folders
2. Remove test files (prefixed with `x-`, or containing `test` in name)
3. Remove unused shadcn components

### Step 4: Optimize Imports
1. Update `src/renderer/src/store/manifest/index.ts`
2. Make pm-manifest imports selective
3. Check all `export *` statements

### Step 5: Test and Verify
```bash
pnpm build
# Check new bundle sizes
# Open visualization.html again to verify improvements
```

## 🔧 Tools and Commands

### Build and Analyze
```bash
pnpm build                    # Build production bundle
pnpm build:unpack            # Build without packing
```

### View Bundle Analysis
- Open `visualization.html` in browser after build
- Shows sunburst diagram of bundle composition
- Displays gzip and brotli sizes

### Check Dependencies
```bash
pnpm list --depth=0          # List all dependencies
pnpm why <package-name>      # Why is package installed
```

## 📈 Expected Results

### Before Optimizations
- Total: ~2.6 MB (~800 KB gzipped)
- Main chunk: 676 KB (too large)
- Many vendor chunks: 1.9 MB

### After Optimizations (Target)
- Total: ~1.2-1.5 MB (~400-500 KB gzipped)
- Main chunk: ~200-300 KB (with lazy loading)
- Initial load: ~800 KB total
- Additional chunks: Load on demand

## 🎬 Quick Wins Checklist

- [x] Improved code splitting configuration
- [x] Better vendor chunking
- [x] Build optimization settings
- [ ] Implement lazy loading for dialogs
- [ ] Remove experimental/test files
- [ ] Optimize pm-manifest imports
- [ ] Replace simple Motion animations with CSS
- [ ] Remove unused shadcn components

## 📚 Additional Resources

### Files to Review
- `visualization.html` - Bundle analysis visualization
- `src/renderer/src/components/4-dialogs/` - Heavy dialog components
- `src/renderer/src/ui/local-ui/nun/` - Experimental components
- `src/renderer/src/store/manifest/index.ts` - pm-manifest re-exports

### Documentation
- [Vite Code Splitting](https://vitejs.dev/guide/features.html#code-splitting)
- [React.lazy](https://react.dev/reference/react/lazy)
- [Rollup Manual Chunks](https://rollupjs.org/configuration-options/#output-manualchunks)

## 🚨 Important Notes

1. **Don't optimize prematurely** - Focus on features that users don't need immediately
2. **Test after changes** - Ensure lazy loading doesn't break functionality
3. **Monitor initial load** - Keep initial bundle under 500 KB gzipped
4. **Use browser DevTools** - Check Network tab for actual download sizes
5. **Consider route-based splitting** - If you have multiple routes/views

## 💡 Long-term Strategies

1. **Bundle analyzer CI check** - Add bundle size checks to CI/CD
2. **Performance budgets** - Set max sizes for each chunk
3. **Modern bundler** - Consider Turbopack or Rolldown when stable
4. **Dependency audit** - Regular review of package sizes
5. **Tree-shaking analysis** - Use tools to find unused exports

---

**Last Updated:** October 31, 2025  
**Config Changes Applied:** Yes (electron.vite.config.ts updated)  
**Next Action:** Open visualization.html to identify specific optimization targets
