# Feature Addition: className Function Filter

## Date: October 18, 2025

## Overview

Added a new filter to exclude strings that are parameters of className utility functions like `classNames()` and `cn()`. This prevents CSS class strings from being extracted as localizable content.

## Problem Solved

Many React projects use utility functions to combine className strings:

```tsx
// Common patterns
<div className={cn("text-lg", "font-bold", isActive && "text-blue-500")}>
<div className={classNames("flex", "items-center", "gap-2")}>
<div className={clsx("rounded", "border")}>
```

Previously, these CSS class strings would be extracted as localizable strings, polluting the i18n output with technical content.

## Solution

Added AST-based detection of function call expressions to filter out string arguments to specified className utility functions.

### Implementation

**New Function: `isInClassNameFunction()`**

Similar to `isInConsoleStatement()`, this function walks up the AST parent chain to detect if a string node is within a call expression to a className utility function.

```typescript
function isInClassNameFunction(node: ts.Node): boolean {
    let current: ts.Node | undefined = node.parent;
    while (current) {
        if (ts.isCallExpression(current)) {
            const expr = current.expression;
            // Check for direct function call like classNames() or cn()
            if (ts.isIdentifier(expr) && classNameFunctions.includes(expr.text)) {
                return true;
            }
        }
        current = current.parent;
    }
    return false;
}
```

## Configuration

### Default Behavior

By default, filters strings in these functions:
- `classNames()`
- `cn()`

### CLI Option

`--classname-functions <names>` - Comma-separated list of function names to filter

**Examples:**
```bash
# Use clsx instead
npx tsx scripts/i18n-ast/0-main.ts --classname-functions "clsx"

# Multiple functions
npx tsx scripts/i18n-ast/0-main.ts --classname-functions "cn,clsx,classnames,twMerge"

# Empty list (disable filtering)
npx tsx scripts/i18n-ast/0-main.ts --classname-functions ""
```

### Config File

Add to `extract-i18n-config.json`:
```json
{
  "classNameFunctions": ["classNames", "cn", "clsx"]
}
```

## Changes Made

### Files Modified

1. **`1-config.ts`**
   - Added `classNameFunctions: string[]` to Config interface
   - Set default: `['classNames', 'cn']`

2. **`3-ast-parser.ts`**
   - Added `classNameFunctions` parameter to `extractStringsFromAST()`
   - Added `isInClassNameFunction()` filter function
   - Integrated into `shouldExtractString()` check

3. **`4-scan-process.ts`**
   - Pass `cfg.classNameFunctions` to `extractStringsFromAST()`

4. **`0-main.ts`**
   - Added CLI argument parsing for `--classname-functions`
   - Splits comma-separated values and trims whitespace

5. **`2-help.ts`**
   - Added option to help message
   - Added example usage
   - Updated configuration example

6. **`extract-i18n-config.json`**
   - Added `"classNameFunctions": ["classNames", "cn"]`

7. **`README.md`**
   - Added to CLI options section
   - Added examples
   - Added to features list
   - Added example in "Extracted String Examples" section
   - Updated configuration file example

## Testing

### Test Results

**Before filtering:**
```bash
npx tsx scripts/i18n-ast/0-main.ts --classname-functions ""
✅ Extracted 372 strings from 191 files
```

**With default filtering (cn, classNames):**
```bash
npx tsx scripts/i18n-ast/0-main.ts
✅ Extracted 346 strings from 173 files
```

**Difference:** 26 fewer strings extracted (CSS classes filtered out)

### Verified Behavior

Tested with actual codebase usage:
```tsx
// These strings are now filtered:
<svg className={classNames("fill-none stroke-current", className)}>
<div className={cn("border-b", className)}>
<svg className={classNames("fill-none stroke-[1.5] stroke-current", className)}>
```

✅ All CSS class strings in `cn()` and `classNames()` calls are properly filtered

## Benefits

### For Users
✅ Cleaner i18n output - no CSS classes  
✅ Reduced manual filtering effort  
✅ Configurable per project needs  
✅ Works with popular className libraries  

### For Extraction Accuracy
✅ More precise string detection  
✅ Fewer false positives  
✅ Better signal-to-noise ratio  

### For Different Projects
✅ Works with `classnames` package  
✅ Works with `clsx` package  
✅ Works with Tailwind `cn()` utility  
✅ Works with custom utility functions  

## Common Use Cases

### Tailwind Projects
```bash
npx tsx scripts/i18n-ast/0-main.ts --classname-functions "cn,twMerge"
```

### Using clsx
```bash
npx tsx scripts/i18n-ast/0-main.ts --classname-functions "clsx"
```

### Multiple Libraries
```bash
npx tsx scripts/i18n-ast/0-main.ts --classname-functions "cn,clsx,classNames"
```

### Custom Utility
```bash
# If you have a custom function like cx()
npx tsx scripts/i18n-ast/0-main.ts --classname-functions "cx,cn"
```

## Implementation Notes

### AST Approach vs Regex

**Why AST is better here:**
- Accurately detects function calls
- Handles nested expressions
- No false positives from string content
- Works with any function name
- Type-safe implementation

**Example AST detects correctly:**
```tsx
// Correctly filters "flex" and "gap-2"
<div className={cn("flex", "gap-2", someCondition ? "active" : "")}>
  {"This text is extracted"}  // ✅ Still extracted
</div>

// Would be hard with regex to distinguish these cases
```

### Performance

Minimal overhead:
- Check only performed for string nodes
- Early exit when not in call expression
- No additional file I/O
- Same single-pass AST traversal

## Edge Cases Handled

### Nested Calls
```tsx
// Both inner and outer strings filtered
<div className={cn("outer", classNames("inner", "more"))}>
```

### Conditional Classes
```tsx
// All strings filtered
<div className={cn(
  "base-class",
  isActive && "active-class",
  error ? "error-class" : "normal-class"
)}>
```

### Template Literals
```tsx
// Template literals already filtered by other rules
<div className={cn(`dynamic-${variant}`)}>  // ❌ Template literal
```

## Compatibility

✅ **Fully backward compatible**  
- Default behavior filters common functions  
- Can be disabled with empty list  
- Config file optional  
- CLI override works as expected  

## Future Enhancements

Potential additions:
- [ ] Support for method calls: `utils.cn()`
- [ ] Detect className functions via import analysis
- [ ] Per-file function name detection
- [ ] Warning when function not found in codebase

## Related Features

Works in conjunction with:
- `--classname-suffix` - Filters className variables
- `className` attribute filtering in JSX
- CSS class pattern detection

All three together provide comprehensive CSS filtering!
