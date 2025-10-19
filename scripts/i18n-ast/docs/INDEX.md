# Documentation Index

This folder contains all the detailed documentation for the AST-based i18n string extraction utility.

## Getting Started

- [QUICKSTART.md](QUICKSTART.md) - Quick start guide to get up and running in 5 minutes

## Comparison & Overview

- [COMPARISON.md](COMPARISON.md) - Detailed comparison between AST-based and Regex-based tools
- [CHANGELOG.md](CHANGELOG.md) - Version history and changes

## Features

- [FEATURE-CLASSNAME-FUNCTIONS.md](FEATURE-CLASSNAME-FUNCTIONS.md) - Filter strings in className utility functions (cn, classNames, clsx, etc.)

## Enhancements

- [ENHANCEMENT-JSON5-SUPPORT.md](ENHANCEMENT-JSON5-SUPPORT.md) - Configuration files with comments and flexible syntax
- [ENHANCEMENT-CLASSNAME-SUFFIX.md](ENHANCEMENT-CLASSNAME-SUFFIX.md) - Improved filtering for className variables and object properties

## Bug Fixes

- [BUGFIX-SVG-PATH-FILTER.md](BUGFIX-SVG-PATH-FILTER.md) - Fixed false positives in SVG path detection
- [BUGFIX-EXCLUDE-FILES.md](BUGFIX-EXCLUDE-FILES.md) - Fixed excludeFiles option not working with full paths
- [FIXES-SUMMARY.md](FIXES-SUMMARY.md) - Summary of all bug fixes and their impact

## Main Documentation

See [../README.md](../README.md) for the main documentation with usage instructions, examples, and architecture overview.

## Quick Links

### Configuration Examples

For JSON5 configuration with comments:
```json5
{
    // See ENHANCEMENT-JSON5-SUPPORT.md for details
    srcDir: "./src",
    excludeFiles: [
        "constants.ts",  // Comments and trailing commas work!
    ],
}
```

### Filtering Options

**className Functions** - See [FEATURE-CLASSNAME-FUNCTIONS.md](FEATURE-CLASSNAME-FUNCTIONS.md)
```bash
--classname-functions "cn,classNames,clsx"
```

**className Variables** - See [ENHANCEMENT-CLASSNAME-SUFFIX.md](ENHANCEMENT-CLASSNAME-SUFFIX.md)
```bash
--classname-suffix "Classes"
```

**File Exclusion** - See [BUGFIX-EXCLUDE-FILES.md](BUGFIX-EXCLUDE-FILES.md)
```json5
{
    excludeFiles: [
        "src/path/to/file.ts",  // Full path
        "constants.ts",          // Just filename
    ]
}
```

## Contributing

If you add new documentation:
1. Add the file to this docs folder
2. Update this INDEX.md
3. Add a link in the main README.md if appropriate
