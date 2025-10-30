import pc from 'picocolors';

export function help() {
    console.log(`
${pc.cyan('╔═══════════════════════════════════════════════════════════════════════════╗')}
${pc.cyan('║')}      ${pc.bold('AST-Based i18n String Extraction Utility')} (TypeScript, React)         ${pc.cyan('║')}
${pc.cyan('╚═══════════════════════════════════════════════════════════════════════════╝')}

Extract user-facing strings from TypeScript/JavaScript/React files using AST.

${pc.bold(pc.yellow('USAGE:'))}
  ${pc.green('npx tsx scripts/i18n-ast/0-main.ts')} ${pc.gray('[options]')}

${pc.bold(pc.yellow('OPTIONS:'))}
  ${pc.cyan('--config')} ${pc.gray('<path>')}, ${pc.cyan('-c')}                        Custom configuration file path (default: ${pc.dim('extract-i18n-config.json5')})
  ${pc.cyan('--src')} ${pc.gray('<path>')}                               Source directory to scan (default: ${pc.dim('./src')})
  ${pc.cyan('--output')} ${pc.gray('<path>')}                            Output JSON file path (default: ${pc.dim('./scripts/i18n-strings.json')})
  ${pc.cyan('--min-length')} ${pc.gray('<number>')}                      Minimum string length to extract (default: ${pc.dim('10')})
  ${pc.cyan('--exclude')} ${pc.gray('<files>')}                          Comma-separated list of filenames to exclude
  ${pc.cyan('--exclude-paths')} ${pc.gray('<paths>')}                    Comma-separated list of paths to exclude
  ${pc.cyan('--exclude-pattern')} ${pc.gray('<regex>')}                  Regular expression pattern to exclude files
  ${pc.cyan('--classname-suffix')} ${pc.gray('<str>')}                   Suffix for className variable names (default: ${pc.dim('Classes')})
  ${pc.cyan('--classname-functions')} ${pc.gray('<names>')}              Comma-separated className function names (default: ${pc.dim('classNames,cn')})
  ${pc.cyan('--exclude-function-prefixes')} ${pc.gray('<names>')}        Comma-separated function name prefixes to exclude (default: ${pc.dim('print,trace')})
  ${pc.cyan('--exclude-attribute-suffix-pattern')} ${pc.gray('<regex>')} Regex pattern for JSX attribute suffixes to exclude (default: ${pc.dim('Classes$')})
  ${pc.cyan('--verbose')}, ${pc.cyan('-v')}                              Show detailed configuration and file information
  ${pc.cyan('--help')}, ${pc.cyan('-h')}                                 Show this help message

${pc.bold(pc.yellow('CONFIGURATION FILE:'))}
  You can create a file named ${pc.green('\'extract-i18n-config.json5\'')} in the project root.
  The file supports ${pc.bold('JSON5')} format (comments, trailing commas, unquoted keys).

  ${pc.dim('Example (extract-i18n-config.json5):')}

  ${pc.gray('{')}
    ${pc.gray('// Source directory to scan')}
    ${pc.cyan('srcDir')}: ${pc.green('"./src"')},
    
    ${pc.gray('// Output file for extracted strings')}
    ${pc.cyan('outputFile')}: ${pc.green('"./scripts/i18n-strings.json"')},
    
    ${pc.cyan('minStringLength')}: ${pc.yellow('10')},
    ${pc.cyan('extensions')}: ${pc.gray('[".ts", ".tsx", ".js", ".jsx"]')},
    
    ${pc.gray('// Specific files to exclude (full path or filename)')}
    ${pc.cyan('excludeFiles')}: ${pc.gray('[')}
      ${pc.green('"src/path/to/file.ts"')},    ${pc.gray('// Full path')}
      ${pc.green('"constants.ts"')},            ${pc.gray('// Just filename')}
    ${pc.gray(']')},
    
    ${pc.gray('// Directories to exclude')}
    ${pc.cyan('excludePaths')}: ${pc.gray('[')}
      ${pc.green('"src/tests"')},
      ${pc.green('"src/__tests__"')},
    ${pc.gray(']')},
    
    ${pc.gray('// Regex pattern to exclude files')}
    ${pc.cyan('excludePattern')}: ${pc.green('"\\\\.test\\\\."')},
    
    ${pc.cyan('classNameSuffix')}: ${pc.green('"Classes"')},
    ${pc.cyan('classNameFunctions')}: ${pc.gray('["classNames", "cn"]')},
    
    ${pc.gray('// Function name prefixes to exclude (e.g., printNames, traceData)')}
    ${pc.cyan('excludeFunctionPrefixes')}: ${pc.gray('["print", "trace"]')},
    
    ${pc.gray('// Regex pattern for JSX attribute suffixes to exclude (e.g., fooClasses, barClasses)')}
    ${pc.cyan('excludeAttributeSuffixPattern')}: ${pc.green('"Classes$"')},
  ${pc.gray('}')}

  Both ${pc.bold('.json5')} and ${pc.bold('.json')} formats are supported.
  ${pc.dim('CLI arguments override configuration file settings.')}

${pc.bold(pc.yellow('EXAMPLES:'))}
  ${pc.dim('# Run with defaults')}
  ${pc.green('npx tsx scripts/i18n-ast/0-main.ts')}

  ${pc.dim('# Use custom config file (JSON5 or JSON)')}
  ${pc.green('npx tsx scripts/i18n-ast/0-main.ts')} ${pc.cyan('--config')} my-config.json5
  ${pc.green('npx tsx scripts/i18n-ast/0-main.ts')} ${pc.cyan('-c')} my-config.json

  ${pc.dim('# Custom source and output')}
  ${pc.green('npx tsx scripts/i18n-ast/0-main.ts')} ${pc.cyan('--src')} ./app ${pc.cyan('--output')} ./i18n/strings.json

  ${pc.dim('# Exclude test files')}
  ${pc.green('npx tsx scripts/i18n-ast/0-main.ts')} ${pc.cyan('--exclude-pattern')} ${pc.yellow('"\\\\.test\\\\."')}

  ${pc.dim('# Set minimum string length')}
  ${pc.green('npx tsx scripts/i18n-ast/0-main.ts')} ${pc.cyan('--min-length')} ${pc.yellow('5')}

  ${pc.dim('# Custom className function names')}
  ${pc.green('npx tsx scripts/i18n-ast/0-main.ts')} ${pc.cyan('--classname-functions')} ${pc.yellow('"clsx,classnames,cn"')}

${pc.bold(pc.yellow('FEATURES:'))}
  ${pc.green('✓')} AST-based parsing for accurate extraction
  ${pc.green('✓')} TypeScript and JavaScript support
  ${pc.green('✓')} React/JSX text content extraction
  ${pc.green('✓')} Preserves i18n placeholders like ${pc.cyan('{variable}')}
  ${pc.green('✓')} Filters out technical strings (imports, CSS classes, etc.)
  ${pc.green('✓')} Excludes console.log/warn/error messages
  ${pc.green('✓')} Handles string literals and JSX text
  ${pc.green('✓')} Generates clickable ${pc.cyan('file://')} URLs
  ${pc.green('✓')} Configurable via file or CLI

${pc.bold(pc.yellow('OUTPUT FORMAT:'))}
  ${pc.gray('{')}
    ${pc.cyan('"file:///C:/path/to/file.tsx"')}: ${pc.gray('{')}
      ${pc.cyan('"stringKey"')}: ${pc.green('"String value"')},
      ${pc.cyan('"anotherKey"')}: ${pc.green('"Text with {placeholder}"')}
    ${pc.gray('}')}
  ${pc.gray('}')}

${pc.dim('For more information, see README.md in scripts/i18n-ast/')}
${pc.dim('Additional documentation available in scripts/i18n-ast/docs/')}
`);
}
