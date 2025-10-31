# Documentation Reorganization

## Date: October 19, 2025

## Changes Made

All documentation files (except README.md) have been moved from `scripts/i18n-ast/` to `scripts/i18n-ast/docs/` for better organization.

## File Structure

### Before
```
scripts/i18n-ast/
├── 0-main.ts
├── 1-config.ts
├── 2-help.ts
├── 3-ast-parser.ts
├── 4-scan-process.ts
├── README.md                          ← Main docs
├── QUICKSTART.md                      ← Moved
├── COMPARISON.md                      ← Moved
├── CHANGELOG.md                       ← Moved
├── BUGFIX-SVG-PATH-FILTER.md         ← Moved
├── BUGFIX-EXCLUDE-FILES.md           ← Moved
├── ENHANCEMENT-JSON5-SUPPORT.md      ← Moved
├── ENHANCEMENT-CLASSNAME-SUFFIX.md   ← Moved
├── FEATURE-CLASSNAME-FUNCTIONS.md    ← Moved
├── FIXES-SUMMARY.md                  ← Moved
└── config-i18n-ast.json5
```

### After
```
scripts/i18n-ast/
├── 0-main.ts
├── 1-config.ts
├── 2-help.ts
├── 3-ast-parser.ts
├── 4-scan-process.ts
├── README.md                          ← Main docs (updated with links)
├── config-i18n-ast.json5
└── docs/                              ← New folder
    ├── INDEX.md                       ← New: Documentation index
    ├── QUICKSTART.md
    ├── COMPARISON.md
    ├── CHANGELOG.md
    ├── BUGFIX-SVG-PATH-FILTER.md
    ├── BUGFIX-EXCLUDE-FILES.md
    ├── ENHANCEMENT-JSON5-SUPPORT.md
    ├── ENHANCEMENT-CLASSNAME-SUFFIX.md
    ├── FEATURE-CLASSNAME-FUNCTIONS.md
    └── FIXES-SUMMARY.md
```

## Files Moved

1. ✅ `QUICKSTART.md` → `docs/QUICKSTART.md`
2. ✅ `COMPARISON.md` → `docs/COMPARISON.md`
3. ✅ `CHANGELOG.md` → `docs/CHANGELOG.md`
4. ✅ `BUGFIX-SVG-PATH-FILTER.md` → `docs/BUGFIX-SVG-PATH-FILTER.md`
5. ✅ `BUGFIX-EXCLUDE-FILES.md` → `docs/BUGFIX-EXCLUDE-FILES.md`
6. ✅ `ENHANCEMENT-JSON5-SUPPORT.md` → `docs/ENHANCEMENT-JSON5-SUPPORT.md`
7. ✅ `ENHANCEMENT-CLASSNAME-SUFFIX.md` → `docs/ENHANCEMENT-CLASSNAME-SUFFIX.md`
8. ✅ `FEATURE-CLASSNAME-FUNCTIONS.md` → `docs/FEATURE-CLASSNAME-FUNCTIONS.md`
9. ✅ `FIXES-SUMMARY.md` → `docs/FIXES-SUMMARY.md`

## Files Created

1. ✅ `docs/INDEX.md` - Documentation index with quick links and descriptions

## Files Updated

1. ✅ `README.md` - Added new "Documentation" section with links to docs folder
2. ✅ `2-help.ts` - Updated help text to reference docs folder

## Link Updates

### README.md

**Added new Documentation section:**
```markdown
## Documentation

- 📖 [Quick Start Guide](docs/QUICKSTART.md)
- 🔍 [Comparison with Regex Tool](docs/COMPARISON.md)
- 📝 [Changelog](docs/CHANGELOG.md)
- 🐛 [Bug Fixes & Enhancements](docs/FIXES-SUMMARY.md)
- 🎨 [Feature: className Functions](docs/FEATURE-CLASSNAME-FUNCTIONS.md)
- 🔧 [Enhancement: JSON5 Config](docs/ENHANCEMENT-JSON5-SUPPORT.md)
- 🔧 [Enhancement: className Suffix](docs/ENHANCEMENT-CLASSNAME-SUFFIX.md)
```

**Updated "See Also" section:**
```markdown
## See Also

- [Quick Start Guide](docs/QUICKSTART.md)
- [Comparison with Regex Tool](docs/COMPARISON.md)
- [Changelog](docs/CHANGELOG.md)
- [Bug Fixes](docs/FIXES-SUMMARY.md)
- [Feature Documentation](docs/FEATURE-CLASSNAME-FUNCTIONS.md)
- [Regex-based extraction tool](../extract-i18n/README.md)
- [TypeScript Compiler API](https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API)
```

### 2-help.ts

**Added line:**
```
Additional documentation available in scripts/i18n-ast/docs/
```

## Benefits

✅ **Better Organization** - Documentation is now grouped in its own folder  
✅ **Cleaner Root** - Only README.md and code files in main folder  
✅ **Easy Navigation** - INDEX.md provides overview of all docs  
✅ **Maintainable** - Easy to find and update documentation  
✅ **Scalable** - New docs can be added to docs/ folder  

## Verification

All functionality tested and working:

```bash
# Help works
npx tsx scripts/i18n-ast/0-main.ts --help
✅ Help message displays correctly with docs reference

# Extraction works
pnpm i18n:ast
✅ Extracted 394 strings from 161 files

# Documentation links work
# All links in README.md and INDEX.md are correct
```

## No Breaking Changes

✅ All code functionality unchanged  
✅ No changes to extraction logic  
✅ No changes to configuration  
✅ No changes to CLI interface  
✅ Only documentation files moved  

## Navigation

**From root:**
- Read `scripts/i18n-ast/README.md` for main documentation
- Browse `scripts/i18n-ast/docs/INDEX.md` for all available docs

**Quick access to specific topics:**
- Getting started: `docs/QUICKSTART.md`
- Bug fixes: `docs/FIXES-SUMMARY.md`
- Feature details: `docs/FEATURE-*.md`
- Enhancements: `docs/ENHANCEMENT-*.md`
- Bug fix details: `docs/BUGFIX-*.md`
