# Enhancement: Improved className Suffix Filtering

## Issue

The `classNameSuffix` option was not filtering CSS class strings in all contexts. It only worked for:
1. JSX `className` attributes
2. Direct variable assignments like `const myClasses = "..."`

But it **failed to filter** CSS classes in:
3. Object property names ending with suffix: `{ circleClasses: "..." }`
4. Nested objects assigned to variables with suffix: `const stepClasses = { complete: { ... } }`

### Example from `2-step.tsx`

```typescript
// Lines 60-71
const stepClasses = {
    complete: {
        circleClasses: "text-background bg-[#5c90f0]",         // ❌ Was extracted
        circleBorderClasses: "bg-[#5c90f0]/50",                // ❌ Was extracted
        statusClasses: "text-foreground",                       // ❌ Was extracted
    },
    notStarted: {
        circleClasses: "text-foreground",                       // ❌ Was extracted
        circleBorderClasses: "bg-foreground/10",                // ❌ Was extracted
        statusClasses: "text-foreground/50",                    // ❌ Was extracted
    },
};

const lineStepClasses = {
    complete: "bg-[#5c90f0]",                                   // ❌ Was extracted
    incomplete: "bg-[#5c90f0]/20",                              // ❌ Was extracted
};
```

All these Tailwind CSS class strings were being extracted even though they're clearly not localizable content.

## Root Cause

The `isClassName()` function had two main problems:

1. **Didn't check object property names**
   - Properties like `circleClasses`, `borderClasses` were ignored
   
2. **Only checked immediate parent for VariableDeclaration**
   - Strings nested in object literals were missed
   - Need to walk up the AST tree to find the parent variable

## Solution

Enhanced the `isClassName()` function with two new checks:

### 1. Check Object Property Names

```typescript
// Check if string is in an object property ending with suffix
// e.g., { circleClasses: "...", borderClasses: "..." }
if (parent && ts.isPropertyAssignment(parent)) {
    const propName = parent.name;
    if (ts.isIdentifier(propName) && propName.text.endsWith(suffix)) {
        return true;
    }
}
```

This catches strings like:
```typescript
{
    circleClasses: "text-background bg-[#5c90f0]"  // ✅ Now filtered
}
```

### 2. Walk Up AST to Find Parent Variables

```typescript
// Check if string is inside an object literal assigned to a variable ending with suffix
// e.g., const stepClasses = { complete: { circleClasses: "..." } }
let current: ts.Node | undefined = node;
while (current) {
    if (ts.isVariableDeclaration(current)) {
        const varName = current.name;
        if (ts.isIdentifier(varName) && varName.text.endsWith(suffix)) {
            return true;
        }
    }
    current = current.parent;
}
```

This catches strings nested in objects:
```typescript
const stepClasses = {
    complete: {
        circleClasses: "..."  // ✅ Now filtered (walks up to find stepClasses)
    }
}
```

## Test Results

### Before Fix

```json
{
  "file:///.../2-step.tsx": {
    "textbackgroundBg5c90f0": "text-background bg-[#5c90f0]",  // ❌
    "bg5c90f050": "bg-[#5c90f0]/50",                            // ❌
    "bg5c90f0": "bg-[#5c90f0]",                                 // ❌
    "bg5c90f020": "bg-[#5c90f0]/20"                             // ❌
  }
}
```

Total: **497 strings extracted**

### After Fix

```json
// File completely filtered out - no entries ✅
```

Total: **476 strings extracted** (-21 CSS class strings)

## AST Structure Analysis

For the string `"text-background bg-[#5c90f0]"`:

```
StringLiteral (the string itself)
  ↑
PropertyAssignment (circleClasses: "...")  ← Check #1 catches this
  ↑
ObjectLiteralExpression ({ circleClasses: ..., borderClasses: ... })
  ↑
PropertyAssignment (complete: { ... })
  ↑
ObjectLiteralExpression ({ complete: {...}, notStarted: {...} })
  ↑
VariableDeclaration (stepClasses)  ← Check #2 catches this
```

Both checks work independently:
- **Check #1**: Catches property name `circleClasses` ending with `Classes`
- **Check #2**: Walks up and finds variable `stepClasses` ending with `Classes`

## Configuration

Works with the `classNameSuffix` option (default: `"ClassName"`):

```json
{
  "classNameSuffix": "Classes"  // Also filters properties/variables ending with "Classes"
}
```

CLI:
```bash
npx tsx scripts/i18n-ast/0-main.ts --classname-suffix Classes
```

## Use Cases

This enhancement now properly filters:

### 1. Direct Variable Assignment
```typescript
const buttonClasses = "px-4 py-2";  // ✅ Filtered
```

### 2. Object Properties
```typescript
const styles = {
    buttonClasses: "px-4 py-2",      // ✅ Filtered
    containerClasses: "flex gap-2"   // ✅ Filtered
};
```

### 3. Nested Objects
```typescript
const themeClasses = {
    light: {
        buttonClasses: "bg-white",   // ✅ Filtered
        textClasses: "text-black"    // ✅ Filtered
    },
    dark: {
        buttonClasses: "bg-black",   // ✅ Filtered
        textClasses: "text-white"    // ✅ Filtered
    }
};
```

### 4. Complex Nested Structures
```typescript
const componentClasses = {
    variants: {
        primary: {
            baseClasses: "...",       // ✅ Filtered
            hoverClasses: "..."       // ✅ Filtered
        }
    }
};
```

## Benefits

✅ Eliminates CSS class pollution in i18n output  
✅ Works with common React/Tailwind patterns  
✅ Configurable suffix (Classes, ClassName, Styles, etc.)  
✅ No false negatives - still extracts real localizable strings  
✅ Comprehensive AST traversal catches all cases  

## Files Changed

- `scripts/i18n-ast/3-ast-parser.ts` - Enhanced `isClassName()` function with property and parent variable checks
