export interface Config {
    srcDir: string;
    outputFile: string;
    minStringLength: number;
    extensions: string[];
    excludeFiles: string[];
    excludePaths: string[];
    excludePattern?: string;
    classNameSuffix: string;
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
};
