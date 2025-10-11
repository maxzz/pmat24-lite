# Extract i18n Strings

A tool for automatically extracting user-facing strings from TypeScript/JavaScript source files for localization purposes.

## Features

- 🔍 **Smart Extraction**: Automatically identifies user-facing strings while filtering out technical strings
- � **Directive Filtering**: Excludes JavaScript/React directives ("use strict", "use client", "use server")
- 🎨 **CSS Class Filtering**: Skips className attributes and CSS class variables (customizable suffix)
- �📁 **Flexible Exclusion**: Three methods to exclude files (exact names, paths, regex patterns)
- ⚙️ **Multiple Configuration Methods**: CLI arguments, configuration file, or both
- 🎯 **Intelligent Filtering**: Skips imports, CSS classes, GUIDs, URLs, template interpolations, and more
- 📝 **Auto-generated Keys**: Creates camelCase keys from extracted strings
- 🔄 **Customizable**: Adjust minimum string length, output location, and more

## Overview

This utility scans your source code and identifies string literals that appear to be user-facing text, while intelligently filtering out technical strings like:
- **Import and export statements** (single and multi-line)
- **JavaScript/React directives** ("use strict", "use client", "use server")
- **Template literal interpolations** (strings with `${...}` patterns)
- **CSS className attributes and class variables** (customizable suffix detection)
- Import paths and module names
- CSS classes (including Tailwind)
- Code identifiers and variable names
- URLs and file paths
- Color codes and CSS units
- GUIDs/UUIDs
- Strings containing only numbers or symbols

## Configuration

The tool supports two ways to configure it:

### 1. Configuration File (Recommended)

Create an `extract-i18n-config.json` file in your project root:

```json
{
  "srcDir": "./src/renderer",
  "outputFile": "./i18n/strings.json",
  "minStringLength": 5,
  "excludeFiles": ["types.ts", "constants.ts", "config.ts"],
  "excludePattern": "\\.(test|spec)\\."
}
```

The tool will automatically load this configuration if the file exists.

**Example file:** See `scripts/extract-i18n/extract-i18n-config.example.json` for a complete example.

### 2. Command Line Arguments

CLI arguments override configuration file settings:

```bash
npx tsx scripts/extract-i18n/extract-i18n-strings.ts --src ./src --output ./i18n/strings.json
```

## Installation

The tool is already part of your project. No additional installation required.

## Usage

### Basic Usage

```bash
# Run with defaults (scans ./src, outputs to ./scripts/i18n-strings.json)
npx tsx scripts/extract-i18n/extract-i18n-strings.ts

# Or using pnpm script (if configured in package.json)
pnpm i18n:extract
```

### Command Line Options

| Option | Description | Default |
|--------|-------------|---------|
| `--src <path>` | Source directory to scan | `./src` |
| `--output <path>` | Output JSON file path | `./scripts/i18n-strings.json` |
| `--min-length <num>` | Minimum string length to extract | `10` |
| `--exclude <files>` | Comma-separated list of filenames to exclude | (none) |
| `--exclude-paths <paths>` | Comma-separated list of file/folder paths to exclude (relative) | (none) |
| `--exclude-pattern <regex>` | Regex pattern to exclude filenames | (none) |
| `--classname-suffix <suffix>` | Suffix for CSS class variable names to exclude | `Classes` |
| `--help` | Show help message | - |

**Note:** CLI arguments take precedence over configuration file settings.

### Configuration File Schema

```json
{
  "srcDir": "string (optional)",
  "outputFile": "string (optional)",
  "minStringLength": "number (optional)",
  "excludeFiles": ["string", "..."] (optional),
  "excludePaths": ["string", "..."] (optional),
  "excludePattern": "string (optional)",
  "classNameSuffix": "string (optional, default: 'Classes')"
}
```

All fields are optional. Omitted fields will use default values.

### Examples

#### Using Configuration File

1. Create `extract-i18n-config.json`:

```json
{
  "srcDir": "./src/renderer",
  "outputFile": "./i18n/en/strings.json",
  "minStringLength": 8,
  "excludeFiles": ["types.ts", "test-data.ts"],
  "excludePaths": ["src/tests", "src/__mocks__", "src/utils/helpers.ts"],
  "excludePattern": "\\.(test|spec|mock)\\.",
  "classNameSuffix": "Classes"
}
```

2. Run the extractor:

```bash
npx tsx scripts/extract-i18n/extract-i18n-strings.ts
```

#### Override Config File with CLI Arguments

```bash
# Config file sets srcDir to "./src/renderer"
# This command overrides it to "./src"
npx tsx scripts/extract-i18n/extract-i18n-strings.ts --src ./src
```

#### Custom source directory and output

```bash
npx tsx scripts/extract-i18n/extract-i18n-strings.ts --src ./src/renderer --output ./i18n/strings.json
```

#### Extract shorter strings

```bash
npx tsx scripts/extract-i18n/extract-i18n-strings.ts --min-length 5
```

#### Exclude specific files

```bash
# Exclude single file
npx tsx scripts/extract-i18n/extract-i18n-strings.ts --exclude types.ts

# Exclude multiple files
npx tsx scripts/extract-i18n/extract-i18n-strings.ts --exclude types.ts,constants.ts,config.ts
```

#### Exclude files by regex pattern

```bash
# Exclude all test files (ending with .test.ts or .test.tsx)
npx tsx scripts/extract-i18n/extract-i18n-strings.ts --exclude-pattern "\\.test\\.tsx?$"

# Exclude files containing "mock" or "test" in filename
npx tsx scripts/extract-i18n/extract-i18n-strings.ts --exclude-pattern "mock|test"

# Exclude spec and test files
npx tsx scripts/extract-i18n/extract-i18n-strings.ts --exclude-pattern "\\.(spec|test)\\."

# Exclude files starting with "temp" or "draft"
npx tsx scripts/extract-i18n/extract-i18n-strings.ts --exclude-pattern "^(temp|draft)"
```

#### Exclude specific paths (files or folders)

```bash
# Exclude entire folders
npx tsx scripts/extract-i18n/extract-i18n-strings.ts --exclude-paths src/tests,src/__mocks__

# Exclude specific files with relative paths
npx tsx scripts/extract-i18n/extract-i18n-strings.ts --exclude-paths src/utils/test-helpers.ts,src/config/dev.ts

# Exclude both files and folders
npx tsx scripts/extract-i18n/extract-i18n-strings.ts --exclude-paths "src/tests,src/mocks,src/utils/debug.ts"
```

#### Customize CSS class variable suffix

```bash
# Default suffix is "Classes" (matches: buttonClasses, cardClasses, etc.)
npx tsx scripts/extract-i18n/extract-i18n-strings.ts

# Use custom suffix "Styles"
npx tsx scripts/extract-i18n/extract-i18n-strings.ts --classname-suffix Styles

# Use custom suffix "CSS"
npx tsx scripts/extract-i18n/extract-i18n-strings.ts --classname-suffix CSS
```

This will exclude strings from:
- `className="..."`
- `const exampleClasses = "..."`
- `let buttonStyles = "..."` (if suffix is "Styles")
- `var cardCSS = "..."` (if suffix is "CSS")

#### Combined exclusions

```bash
# Combine exact filenames, paths, and regex pattern
npx tsx scripts/extract-i18n/extract-i18n-strings.ts \
  --exclude types.ts,constants.ts \
  --exclude-paths src/tests,src/__mocks__ \
  --exclude-pattern "\\.(spec|test)\\."
```

## Exclusion Methods Explained

The tool provides three complementary ways to exclude files from extraction:

### 1. `--exclude` (Exact Filenames)
Excludes files by exact filename match, regardless of their location in the source tree.

**Use when:** You want to exclude all files with a specific name across the entire project.

**Example:**
```bash
--exclude types.ts,constants.ts
```
Excludes `types.ts` and `constants.ts` in any folder.

### 2. `--exclude-paths` (File/Folder Paths)
Excludes specific files or entire folders by relative path from the project root.

**Use when:** You want to exclude specific folders or files at specific locations.

**Example:**
```bash
--exclude-paths src/tests,src/__mocks__,src/utils/debug.ts
```
- Excludes entire `src/tests` folder and all its contents
- Excludes entire `src/__mocks__` folder
- Excludes only `src/utils/debug.ts` file

### 3. `--exclude-pattern` (Regex Pattern)
Excludes files whose filename (not path) matches a regex pattern.

**Use when:** You want to exclude files based on naming conventions.

**Example:**
```bash
--exclude-pattern "\\.(test|spec)\\."
```
Excludes any file with `.test.` or `.spec.` in its name (e.g., `Component.test.tsx`, `utils.spec.ts`).

### Combining Methods

All three methods work together:
```bash
npx tsx scripts/extract-i18n/extract-i18n-strings.ts \
  --exclude constants.ts \              # Exclude all constants.ts files
  --exclude-paths src/tests,src/mocks \ # Exclude test and mock folders
  --exclude-pattern "\\.spec\\."        # Exclude all .spec. files
```

## Combined options

```bash
npx tsx scripts/extract-i18n/extract-i18n-strings.ts \
  --src ./src/renderer \
  --output ./locales/en/strings.json \
  --min-length 5 \
  --exclude types.ts,test-data.ts \
  --exclude-paths src/__tests__,src/mocks \
  --exclude-pattern "\\.(spec|test)\\."
```

## Output Format

The tool generates a JSON file with the following structure:

```json
{
  "src/components/MyComponent.tsx": {
    "theRegularExpressionIsEmpty": "The regular expression is empty, so the regular expression is useless.",
    "youCanDefineTheRegular": "You can define the regular expression as any part of the original URL.",
    "forExampleIfTheOriginal": "For example, if the original URL is"
  },
  "src/utils/helpers.ts": {
    "errorProcessingRequest": "Error processing request",
    "pleaseCheckYourInput": "Please check your input and try again"
  }
}
```

### Key Generation

Keys are automatically generated in camelCase format from the first few words of the string:
- `"Hello World"` → `helloWorld`
- `"Please enter your email address"` → `pleaseEnterYourEmail`
- Special characters are removed and spaces become camelCase boundaries

## What Gets Extracted

✅ **Extracted:**
- User-facing messages and labels
- Error messages
- Help text and descriptions
- UI labels and button text
- Placeholder text

❌ **Filtered Out:**
- **Import/Export statements** (all strings in `import`/`export` statements, including multi-line)
  - `import { Component } from "./components/MyComponent"`
  - `export * from "@/utils/helper"`
  - `import("./dynamic-module")`
  - `require("module-name")`
- **JavaScript/React directives**
  - `"use strict"`
  - `"use client"`
  - `"use server"`
- **Template literal interpolations**
  - Strings containing `${...}` patterns
  - Variable interpolations like `${variableName}`, `${obj.prop}`, `${func()}`
- **CSS className attributes and class variables**
  - `className="flex items-center"`
  - `const buttonClasses = "px-4 py-2 bg-blue-500"` (variables ending with "Classes" or custom suffix)
  - Template literals in className
- CSS classes (`flex items-center`, `text-lg font-bold`)
- Technical identifiers (`userId`, `apiKey`)
- File paths and URLs (`https://example.com`, `../assets/icon.png`)
- Color codes (`#ffffff`, `rgb(255, 0, 0)`)
- CSS units (`16px`, `2rem`, `100%`)
- GUIDs (`{c0f864c8-7bbb-422e-98a3-e033d7360c97}`)
- Numbers and symbols only (`123`, `---`, `***`)
- Short strings (less than configured minimum length)

## Default Configuration

When no configuration file exists and no CLI arguments are provided:

```typescript
{
  srcDir: './src',
  outputFile: './scripts/i18n-strings.json',
  minStringLength: 10,
  extensions: ['.ts', '.tsx', '.js', '.jsx'],
  excludeFiles: [],
  excludePaths: [],
  excludePattern: undefined,
  classNameSuffix: 'Classes'
}
```

Note: `extensions` field is not configurable via config file or CLI.

## Adding to package.json

Add this script to your `package.json`:

```json
{
  "scripts": {
    "i18n:extract": "tsx scripts/extract-i18n/extract-i18n-strings.ts"
  }
}
```

Then run with:

```bash
pnpm i18n:extract
# or
npm run i18n:extract
```

## Integration with i18n Libraries

The output can be easily integrated with popular i18n libraries:

### react-i18next

```typescript
import en from './i18n/strings.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en }
  },
  // ... other config
});
```

### Usage in components:

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  return <div>{t('pleaseEnterYourEmail')}</div>;
}
```

## Workflow

1. **Extract strings** from your source code
2. **Review** the generated JSON file
3. **Remove false positives** (if any)
4. **Add translations** for other languages
5. **Integrate** with your i18n solution
6. **Replace** hardcoded strings with translation calls

## File Structure

```
scripts/extract-i18n/
├── README.md                         # This file
├── extract-i18n-strings.ts           # Main CLI entry point
├── extract-i18n-config.example.json  # Example configuration file
├── 2-scan-process.ts                 # Core extraction logic
├── 8-help.ts                         # Help text
├── 9-config.ts                       # Configuration
└── i18n-strings.json                 # Generated output (default)

extract-i18n-config.json              # Optional config file (project root)
```

## Troubleshooting

### Too many strings extracted

Increase the minimum string length:
```bash
npx tsx scripts/extract-i18n/extract-i18n-strings.ts --min-length 15
```

### Missing expected strings

Decrease the minimum string length:
```bash
npx tsx scripts/extract-i18n/extract-i18n-strings.ts --min-length 5
```

### Unwanted files included

Use the exclude option for exact filenames:
```bash
npx tsx scripts/extract-i18n/extract-i18n-strings.ts --exclude test.ts,mock-data.ts
```

Use exclude-paths for specific files or entire folders:
```bash
# Exclude entire test folder
npx tsx scripts/extract-i18n/extract-i18n-strings.ts --exclude-paths src/tests

# Exclude specific files with paths
npx tsx scripts/extract-i18n/extract-i18n-strings.ts --exclude-paths src/utils/debug.ts,src/config/dev.ts
```

Or use regex pattern for flexible matching:
```bash
# Exclude all test and spec files
npx tsx scripts/extract-i18n/extract-i18n-strings.ts --exclude-pattern "\\.(test|spec)\\."

# Exclude files with specific prefixes
npx tsx scripts/extract-i18n/extract-i18n-strings.ts --exclude-pattern "^(test-|mock-|temp-)"
```

## Contributing

To add new filters or improve string detection:
1. Edit `2-scan-process.ts`
2. Add new filter functions following the existing pattern
3. Add the filter to the condition list in `extractStringsFromFile()`
4. Update this README with the new filter behavior

## License

Part of the pmat24-lite project.
