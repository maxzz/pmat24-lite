# Bug Fix: SVG Path Filter False Positives

## Issue

The `isSvgPath()` filter was incorrectly identifying normal English text as SVG paths, causing many localizable strings to be filtered out.

### Example

From `2-saw-page-header.tsx`:
```tsx
const [title, explanation] = [
    'New manifest',  // ✅ Extracted
    'Sellect the fields you want to use for the new manifest, submit method and other options.'  // ❌ Was filtered as SVG path!
];
```

### Root Cause

The original `complexPathPattern` regex was too broad:

```typescript
const complexPathPattern = /[MmLlHhVvCcSsQqTtAaZz][\s,\d.-]+[MmLlHhVvCcSsQqTtAaZz]/;
```

This pattern matches:
- Any SVG command letter (M, L, T, S, etc.)
- Followed by spaces/commas/digits/dots/dashes
- Followed by another SVG command letter

**Problem:** This also matches normal English text!

Examples of false positives:
- `"submit method"` → matches `t m` ❌
- `"want to use"` → matches `t t` ❌
- `"test the"` → matches `t t` ❌

The pattern was matching any two SVG command letters with whitespace/punctuation between them, which is extremely common in normal text.

## Solution

Rewrote `isSvgPath()` to be more strict:

```typescript
function isSvgPath(str: string): boolean {
    // SVG paths must start with a command letter
    const svgPathPattern = /^[MmLlHhVvCcSsQqTtAaZz][\s,\d.-]+/;
    if (!svgPathPattern.test(str)) return false;
    
    // Check if string has a high ratio of digits to letters
    // SVG paths should have many more digits than letters
    const digits = (str.match(/\d/g) || []).length;
    const letters = (str.match(/[a-zA-Z]/g) || []).length;
    
    // SVG path should have at least 3 digits and more digits than letters
    if (digits < 3) return false;
    if (digits <= letters) return false;
    
    // Check that remaining characters after removing SVG path chars are minimal
    const pathChars = str.replace(/[MmLlHhVvCcSsQqTtAaZz\s,.\d-]/g, '');
    if (pathChars.length > 2) return false; // Allow a couple of unexpected chars
    
    return true;
}
```

### New Logic

1. **Must start with SVG command letter** - Normal text rarely starts with M, L, etc.
2. **Digit ratio check** - SVG paths have many numbers (coordinates)
   - Must have at least 3 digits
   - Must have more digits than letters
3. **Minimal non-path characters** - After removing SVG path chars, very little should remain

### Test Results

#### Normal Text (Now Correctly Passes) ✅

```typescript
isSvgPath('submit method and') // false ✅
isSvgPath('want to use') // false ✅
isSvgPath('Sellect the fields you want to use...') // false ✅
```

#### Real SVG Paths (Still Detected) ✅

```typescript
isSvgPath('M 10 10 L 20 20') // true ✅
isSvgPath('M10,20 L30,40 Z') // true ✅
isSvgPath('M9.57 2.44c-1.34.06-2.65.36-3.88.9l...') // true ✅
```

## Impact

### Before Fix
```
✅ Extracted 346 strings from 173 files
```

### After Fix
```
✅ Extracted 497 strings from 213 files
```

**Result:** ~151 additional localizable strings now correctly extracted! 🎉

## Files Changed

- `scripts/i18n-ast/3-ast-parser.ts` - Updated `isSvgPath()` function

## Verification

Tested with actual SVG paths from the codebase:
- `src/renderer/src/ui/icons/symbols/app/2-app-win.tsx` - Complex SVG path still filtered ✅
- `src/renderer/src/ui/icons/symbols/app/1-app-web-chrome.tsx` - Simple paths still filtered ✅

No false negatives detected - all real SVG paths are still correctly identified as non-localizable.
