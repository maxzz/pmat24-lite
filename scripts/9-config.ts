export interface Config {
    srcDir: string;
    outputFile: string;
    minStringLength: number;
    extensions: string[];
}

export const defaultConfig: Config = {
    srcDir: './src',
    outputFile: './scripts/i18n-strings.json',
    minStringLength: 10,
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
};
