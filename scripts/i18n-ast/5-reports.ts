import * as fs from 'fs';
import * as path from 'path';
import pc from 'picocolors';
import { defaultConfig } from './1-config';

interface LocalizationStrings {
    [filename: string]: Record<string, string>;
}

/**
 * Process extraction results and create a report.
 * Saves results to JSON file and displays summary statistics.
 * 
 * @param results - The localization strings extracted by scanAndExtract()
 * @param outputFile - Optional output file path (defaults to config default)
 */
export function createReport(results: LocalizationStrings, outputFile?: string): void {
    const totalStrings = Object.values(results).reduce((sum, obj) => sum + Object.keys(obj).length, 0);
    const totalFiles = Object.keys(results).length;

    const outputPath = path.resolve(outputFile || defaultConfig.outputFile);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf-8');

    console.log(`✅ Extracted ${pc.cyan(pc.bold(totalStrings))} strings from ${pc.cyan(pc.bold(totalFiles))} files`);
    console.log(pc.gray(`   Saved to: ${outputPath}`));
}
