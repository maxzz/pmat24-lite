# Changes Summary - i18n-ast Tool Updates

## Date: October 31, 2025

## Added Features

### 1. Dual Operation Modes

Added `--mode` / `-m` CLI option to support two operation modes: **scan** (default) and **translated**.

**Scan Mode (Default):**
Extracts untranslated strings that need to be localized:
```bash
npx tsx scripts/i18n-ast/0-main.ts --mode scan
# or simply
npx tsx scripts/i18n-ast/0-main.ts
```

**Translated Mode:**
Collects already-translated strings from `t()` and `dt()` function calls:
```bash
npx tsx scripts/i18n-ast/0-main.ts --mode translated
npx tsx scripts/i18n-ast/0-main.ts -m translated
```

**Implementation Details:**
- Added `mode: 'scan' | 'translated'` property to `Config` interface
- Default mode is `'scan'` for backward compatibility
- CLI parsing validates that mode is either `'scan'` or `'translated'`
- Implemented `collectTranslatedStrings()` function using AST to find `t()` and `dt()` calls
- Both modes use the same configuration for source directory, output file, and exclusions
- Results stored in separate properties: `strings` for scan mode, `translatedStrings` for translated mode

**Use Cases:**
- **Scan mode**: Initial i18n setup, finding new strings to translate
- **Translated mode**: Auditing existing translations, generating list of strings in use

**Files Modified:**
- `scripts/i18n-ast/7-config-types.ts` - Added `mode` property to Config interface
- `scripts/i18n-ast/7-get-config.ts` - Added CLI parsing for `--mode` / `-m` option
- `scripts/i18n-ast/1-scan-process.ts` - Added mode branching and `collectTranslatedStrings()` function
- `scripts/i18n-ast/8-help.ts` - Added `--mode` option to help documentation
- `scripts/i18n-ast/README.md` - Added "Operation Modes" section and examples

**Testing:**
```bash
# Test scan mode (default)
npx tsx scripts/i18n-ast/0-main.ts
✅ Extracts untranslated strings as before

# Test translated mode
npx tsx scripts/i18n-ast/0-main.ts -m translated
✅ Finds and extracts strings from t() and dt() calls

# Test invalid mode
npx tsx scripts/i18n-ast/0-main.ts -m invalid
✅ Shows error: "Invalid mode: invalid. Must be 'scan' or 'translated'"
```

**Backward Compatibility:**
✅ **Fully backward compatible**  
- Default mode is `'scan'`, preserving existing behavior
- No changes to existing CLI options or output format
- `mode` is optional in config files

---

## Date: October 14, 2025

## Added Features

### 1. Custom Configuration File Option

Added `--config` / `-c` CLI option to specify a custom configuration file path.

**Usage:**
```bash
# Long form
npx tsx scripts/i18n-ast/0-main.ts --config my-config.json

# Short form
npx tsx scripts/i18n-ast/0-main.ts -c my-config.json
```

**Implementation Details:**
- Modified `0-main.ts` to accept and process `--config` / `-c` arguments
- Updated `loadConfigFile()` function to accept optional config file path
- Added warning when explicitly specified config file doesn't exist
- CLI arguments still override config file settings

**Files Modified:**
- `scripts/i18n-ast/0-main.ts` - Added config file parameter handling
- `scripts/i18n-ast/2-help.ts` - Added --config option to help message

### 2. VS Code Debug Configurations

Added three debug configurations for the i18n-ast tool in `.vscode/launch.json`:

#### Debug Configurations:

**1. Debug i18n-ast extraction**
- Runs with default settings
- Uses integrated terminal for output
- Breakpoints work throughout the extraction process

**2. Debug i18n-ast extraction (custom config)**
- Runs with `extract-i18n-config.json`
- Good for debugging config file loading and parsing
- Tests config file override behavior

**3. Debug i18n-ast extraction (test output)**
- Outputs to `i18n-strings-ast-debug.json`
- Uses `--min-length 5` to extract more strings
- Useful for testing filter logic with shorter strings

**How to Use:**
1. Open VS Code
2. Press `F5` or open Run and Debug panel (Ctrl+Shift+D)
3. Select one of the "Debug i18n-ast" configurations from dropdown
4. Set breakpoints in `3-ast-parser.ts` or other files
5. Start debugging

**Common Breakpoint Locations:**
- `3-ast-parser.ts` - `visit()` function to see each AST node
- `3-ast-parser.ts` - Filter functions to understand exclusion logic
- `4-scan-process.ts` - File scanning logic
- `0-main.ts` - Config loading and CLI parsing

**Files Modified:**
- `.vscode/launch.json` - Added three new debug configurations

### 3. Documentation Updates

Updated all documentation to reflect the new features:

**README.md:**
- Added `--config` option to CLI options section
- Added examples for using custom config files
- Added comprehensive "Debugging" section with:
  - Available debug configurations
  - How to debug
  - Debug tips and best practices
- Updated "Contributing" section to reference `0-main.ts`

**QUICKSTART.md:**
- Added custom config file usage examples
- Added "Debugging in VS Code" section
- Updated file structure to show `0-main.ts`

**2-help.ts:**
- Added `--config <path>, -c` option to help message
- Added examples for using `--config` and `-c`
- Updated all command examples to use `0-main.ts`

## Benefits

### For Users:
✅ Can organize configs per project/environment  
✅ Easy to switch between different extraction settings  
✅ Can debug extraction issues directly in VS Code  
✅ Better understanding of AST parsing process  

### For Developers:
✅ Easy to debug filter logic  
✅ Can inspect AST nodes in real-time  
✅ Step through extraction process  
✅ Faster development of new features  

## Testing

All features tested and verified:

```bash
# Test custom config with long form
npx tsx scripts/i18n-ast/0-main.ts --config scripts/i18n-ast/extract-i18n-config.json
✅ Config loaded successfully

# Test custom config with short form
npx tsx scripts/i18n-ast/0-main.ts -c scripts/i18n-ast/extract-i18n-config.json
✅ Config loaded successfully

# Test CLI override of config settings
npx tsx scripts/i18n-ast/0-main.ts -c scripts/i18n-ast/extract-i18n-config.json --min-length 15
✅ CLI argument correctly overrides config file (258 strings vs 358 with min-length 10)

# Test debug configuration
✅ All three debug configurations launch successfully
✅ Breakpoints work as expected
✅ Integrated terminal shows output correctly
```

## Backward Compatibility

✅ **Fully backward compatible**  
- Default behavior unchanged (still looks for `extract-i18n-config.json`)
- All existing CLI options work the same
- No breaking changes to API or output format

## Example Workflows

### Workflow 1: Multiple Environments

```bash
# Development - extract everything
npx tsx scripts/i18n-ast/0-main.ts -c config/i18n-dev.json

# Production - stricter filtering
npx tsx scripts/i18n-ast/0-main.ts -c config/i18n-prod.json

# Testing - minimal strings
npx tsx scripts/i18n-ast/0-main.ts -c config/i18n-test.json
```

### Workflow 2: Debugging Extraction Issues

1. Set breakpoint in `3-ast-parser.ts` at line with `shouldExtractString()`
2. Press F5, select "Debug i18n-ast extraction"
3. Step through to see which filter is excluding your string
4. Adjust filter logic as needed
5. Re-run to verify fix

### Workflow 3: Custom Project Structure

```bash
# Use config from custom location
npx tsx scripts/i18n-ast/0-main.ts --config ../shared-configs/i18n.json

# Override specific settings
npx tsx scripts/i18n-ast/0-main.ts -c my-config.json --src ./app --output ./dist/i18n.json
```

## Future Enhancements

Potential future additions:
- [ ] Watch mode for continuous extraction
- [ ] Multiple output formats (JSON, YAML, CSV)
- [ ] Integration with popular i18n libraries
- [ ] Auto-detection of i18n library usage
- [ ] Incremental extraction (only changed files)
