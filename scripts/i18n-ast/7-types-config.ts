export interface Config {
    srcDir: string;                             // Source directory to scan
    outputFile: string;                         // Output JSON file path
    minStringLength: number;                    // Minimum string length to extract
    extensions: string[];                       // File extensions to include
    excludeFiles: string[];                     // File names to exclude
    excludePaths: string[];                     // Paths to exclude
    excludePattern?: string;                    // Regex pattern to exclude files
    classNameSuffix: string;                    // Suffix for CSS class variable names to exclude
    classNameFunctions: string[];               // ClassName function names
    excludeFunctionPrefixes: string[];          // Function name prefixes to exclude
    excludeAttributeSuffixPattern: string;      // Regex pattern for JSX attribute suffixes to exclude
    verbose: boolean;
}

export const defaultConfig: Config = {
    srcDir: './src',
    outputFile: './scripts/i18n-ast-strings.json',
    minStringLength: 10,
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    excludeFiles: [],
    excludePaths: [],
    excludePattern: undefined,
    classNameSuffix: 'Classes',
    classNameFunctions: ['classNames', 'cn'],
    excludeFunctionPrefixes: ['print', 'trace'],
    excludeAttributeSuffixPattern: 'Classes$',
    verbose: false,
};

export const DEFAULT_CONFIG_FILE_NAME = 'config-i18n-ast.json5';
