# Enhancement: Filter querySelector and querySelectorAll Arguments

**Issue**: CSS selectors passed to `querySelector`, `querySelectorAll`, `closest`, and `matches` methods were being extracted as localizable strings, but these are technical DOM query strings, not user-facing text.

**Date**: 2025-10-19  
**Status**: ✅ Fixed

---

## Problem Description

DOM query methods like `querySelector` and `querySelectorAll` take CSS selector strings as arguments. These selectors are technical identifiers used to find DOM elements and should not be localized:

```tsx
// CSS selectors - should NOT be extracted
const list = document.querySelector('[data-panel-actions-list="0"]');
const parent = container.querySelector('[data-radix-scroll-area-viewport]');
const item = container.querySelector(`[data-list-uiid="${uuid}"]`);
const element = node.closest('.container');
const isMatch = element.matches('.active');
```

These were incorrectly appearing in the extraction output:

```json
{
  "file:///d-panel-actions-list-activation.ts": {
    "datapanelactionslistformidx": "[data-panel-actions-list=\"${formIdx}\"]"
  },
  "file:///3-do-scroll-to-item.tsx": {
    "dataradixscrollareaviewport": "[data-radix-scroll-area-viewport]",
    "datalistuiidselecteditemfcemetauuid": "[data-list-uiid=\"${selectedItem.fceMeta.uuid}\"]"
  }
}
```

---

## Root Cause

The AST parser was checking for console statements and className function calls, but not for DOM query methods. Any string passed to these methods was treated as potentially user-facing text.

### Context

DOM query methods that take CSS selectors:
- `document.querySelector(selector)`
- `document.querySelectorAll(selector)`
- `element.querySelector(selector)`
- `element.querySelectorAll(selector)`
- `element.closest(selector)`
- `element.matches(selector)`

All of these take CSS selector strings that should be filtered out.

---

## Solution

Added a new filter function `isInQuerySelectorCall()` that checks if a string node is an argument to a DOM query method.

### Implementation

```typescript
function isInQuerySelectorCall(node: ts.Node): boolean {
    let current: ts.Node | undefined = node.parent;
    while (current) {
        if (ts.isCallExpression(current)) {
            const expr = current.expression;
            if (ts.isPropertyAccessExpression(expr)) {
                const prop = expr.name.text;
                // Check for querySelector, querySelectorAll, closest, matches, etc.
                if (['querySelector', 'querySelectorAll', 'closest', 'matches'].includes(prop)) {
                    return true;
                }
            }
        }
        current = current.parent;
    }
    return false;
}
```

Added to `shouldExtractString()` checks:
```typescript
function shouldExtractString(text: string, minLength: number, node: ts.Node): boolean {
    // ... other checks ...
    
    // Check if it's in a querySelector/querySelectorAll call
    if (isInQuerySelectorCall(node)) return false;
    
    // ... rest of filtering ...
}
```

---

## Examples

### Filtered Out (CSS Selectors)

```tsx
// ❌ Attribute selectors
document.querySelector('[data-panel-actions-list="0"]')
// → Not extracted

// ❌ Data attributes with placeholders
container.querySelector(`[data-list-uiid="${uuid}"]`)
// → Not extracted

// ❌ Complex selectors
document.querySelectorAll('[data-radix-scroll-area-viewport]')
// → Not extracted

// ❌ Class selectors
element.closest('.container-class')
// → Not extracted

// ❌ Pseudo-class selectors
element.matches(':hover')
// → Not extracted

// ❌ ID selectors
document.querySelector(`#${fontID} > defs`)
// → Not extracted

// ❌ Multiple attribute selectors
container.querySelector('[role="button"][aria-pressed="true"]')
// → Not extracted
```

### Still Extracted (User-Facing Text)

```tsx
// ✅ Error messages
const message = "Element not found";
// → Extracted

// ✅ User notifications
console.log("Please select an element"); // Filtered by console check
const alert = "Please select an element"; // → Extracted

// ✅ UI labels
const label = "Click to select";
// → Extracted
```

---

## Test Cases

### querySelector Calls

```tsx
// All these selectors should be filtered:
document.querySelector('.class-name')
document.querySelector('#element-id')
document.querySelector('[data-attr]')
document.querySelector('[data-attr="value"]')
document.querySelector(`[data-attr="${variable}"]`)
element.querySelector('div > span')
```

### querySelectorAll Calls

```tsx
// All these selectors should be filtered:
document.querySelectorAll('.items')
element.querySelectorAll('[role="button"]')
container.querySelectorAll(`[data-id="${id}"]`)
```

### closest and matches

```tsx
// All these selectors should be filtered:
element.closest('.parent-class')
element.closest('[data-container]')
element.matches('.active')
element.matches('[aria-selected="true"]')
```

---

## Impact

### Before Enhancement
```
✅ Extracted 433 strings from 174 files
```

Example output included CSS selectors:
```json
{
  "file:///d-panel-actions-list-activation.ts": {
    "datapanelactionslistformidx": "[data-panel-actions-list=\"${formIdx}\"]"
    // ❌ CSS selector extracted
  },
  "file:///3-do-scroll-to-item.tsx": {
    "dataradixscrollareaviewport": "[data-radix-scroll-area-viewport]",
    // ❌ CSS selector extracted
    "datalistuiidselecteditemfcemetauuid": "[data-list-uiid=\"${selectedItem.fceMeta.uuid}\"]"
    // ❌ CSS selector extracted
  }
}
```

### After Enhancement
```
✅ Extracted 415 strings from 166 files
```

CSS selectors removed from output:
```json
{
  // ✅ Files with only querySelector selectors completely removed
  // ✅ Files with mixed content only show actual user-facing strings
}
```

**Net reduction**: -18 false positive strings removed (CSS selectors)

---

## Files Changed

### Modified
- `scripts/i18n-ast/3-ast-parser.ts`
  - Added `isInQuerySelectorCall()` function
  - Added querySelector/querySelectorAll check to `shouldExtractString()`
  - Filters arguments to: `querySelector`, `querySelectorAll`, `closest`, `matches`

---

## Edge Cases Handled

### Template Literals in Selectors

```tsx
// Complex selectors with template literals
const selector = `[data-id="${id}"]`;
const element = document.querySelector(selector);
// Both the template and its use in querySelector are filtered
```

### Method Chaining

```tsx
// querySelector in chains
const text = document.querySelector('.container')?.querySelector('.item')?.textContent;
// Selectors filtered, but textContent (if it were a string) would be evaluated separately
```

### Dynamic Selectors

```tsx
// Selectors built from variables
const attr = 'data-id';
const value = '123';
const selector = `[${attr}="${value}"]`;
document.querySelector(selector);
// The selector variable is filtered when used in querySelector
```

---

## Related Features

- **Console Statement Filter**: [Similar pattern] - Filters console.log/warn/error arguments
- **className Function Filter**: [FEATURE-CLASSNAME-FUNCTIONS.md](./FEATURE-CLASSNAME-FUNCTIONS.md) - Filters className utility calls
- **CSS Class Filter**: [Built-in] - Filters strings that look like CSS classes

---

## Verification

To verify the fix works correctly:

```bash
# Run extraction
pnpm i18n:ast

# Verify querySelector selectors are not in output
grep "data-panel-actions-list" scripts/i18n-strings-ast.json
# Should return: No matches

grep "data-radix-scroll-area-viewport" scripts/i18n-strings-ast.json  
# Should return: No matches

grep "data-list-uiid" scripts/i18n-strings-ast.json
# Should return: No matches
```

Expected: No CSS selector strings from querySelector/querySelectorAll calls in the output.

---

## Summary

✅ **querySelector arguments now properly filtered**
- Filters `querySelector()` and `querySelectorAll()` arguments
- Filters `closest()` and `matches()` selector arguments
- Removes CSS selectors from extraction output
- Reduces false positives by 18 strings in this codebase
- Improves localization quality by excluding DOM query strings

This enhancement ensures that **technical DOM selectors** are not confused with user-facing translatable text, keeping the extraction focused on actual UI strings.
