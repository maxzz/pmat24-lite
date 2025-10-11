# Extract i18n Strings

A tool for automatically extracting user-facing strings from TypeScript/JavaScript source files for localization purposes.

## Overview

This utility scans your source code and identifies string literals that appear to be user-facing text, while intelligently filtering out technical strings like:
- Import paths and module names
- CSS classes (including Tailwind)
- Code identifiers and variable names
- URLs and file paths
- Color codes and CSS units
- GUIDs/UUIDs
- Strings containing only numbers or symbols

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
| `--exclude-pattern <regex>` | Regex pattern to exclude filenames | (none) |
| `--help` | Show help message | - |

### Examples

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

#### Combined exclusions

```bash
# Combine exact filenames and regex pattern
npx tsx scripts/extract-i18n/extract-i18n-strings.ts \
  --exclude types.ts,constants.ts \
  --exclude-pattern "\\.test\\.tsx?$"
```

#### Combined options

```bash
npx tsx scripts/extract-i18n/extract-i18n-strings.ts \
  --src ./src/renderer \
  --output ./locales/en/strings.json \
  --min-length 5 \
  --exclude types.ts,test-data.ts \
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
- Import/require paths (`./components/MyComponent`, `@/utils/helper`)
- CSS classes (`flex items-center`, `text-lg font-bold`)
- Technical identifiers (`userId`, `apiKey`)
- File paths and URLs (`https://example.com`, `../assets/icon.png`)
- Color codes (`#ffffff`, `rgb(255, 0, 0)`)
- CSS units (`16px`, `2rem`, `100%`)
- GUIDs (`{c0f864c8-7bbb-422e-98a3-e033d7360c97}`)
- Numbers and symbols only (`123`, `---`, `***`)
- Short strings (less than configured minimum length)

## Configuration

Default configuration is defined in `9-config.ts`:

```typescript
{
  srcDir: './src',
  outputFile: './scripts/i18n-strings.json',
  minStringLength: 10,
  extensions: ['.ts', '.tsx', '.js', '.jsx'],
  excludeFiles: [],
  excludePattern: undefined
}
```

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
├── README.md                    # This file
├── extract-i18n-strings.ts      # Main CLI entry point
├── 2-scan-process.ts            # Core extraction logic
├── 8-help.ts                    # Help text
├── 9-config.ts                  # Configuration
└── i18n-strings.json            # Generated output (default)
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
