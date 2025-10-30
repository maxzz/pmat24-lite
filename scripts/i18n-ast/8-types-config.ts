export interface Config {
    srcDir: string;
    outputFile: string;
    minStringLength: number;
    extensions: string[];
    excludeFiles: string[];
    excludePaths: string[];
    excludePattern?: string;
    classNameSuffix: string;
    classNameFunctions: string[];
    excludeFunctionPrefixes: string[];
    excludeAttributeSuffixPattern: string;
}

export const defaultConfig: Config = {
    srcDir: './src',
    outputFile: './scripts/i18n-strings.json',
    minStringLength: 10,
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    excludeFiles: [],
    excludePaths: [],
    excludePattern: undefined,
    classNameSuffix: 'Classes',
    classNameFunctions: ['classNames', 'cn'],
    excludeFunctionPrefixes: ['print', 'trace'],
    excludeAttributeSuffixPattern: 'Classes$',
};

export const DEFAULT_CONFIG_FILE_NAME = 'extract-i18n-config.json5';
