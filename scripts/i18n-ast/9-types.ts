export interface LocalizationStrings {
    [filename: string]: Record<string, string>;
}

export type ResultOfScan = {
    totalOfAllFiles: number;
    totalOfFilesWithStrings: number;
    strings: LocalizationStrings;
}
