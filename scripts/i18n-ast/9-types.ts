export interface LocalizationStrings {
    [filename: string]: Record<string, string>;
}

export type ResultOfScan = {
    totalOfAllFiles: number;
    totalOfFilesWithStrings: number;
    strings: LocalizationStrings;           // strings extracted from source code to be translated
    translatedStrings: LocalizationStrings; // already translated strings
}
