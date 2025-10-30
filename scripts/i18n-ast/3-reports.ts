import * as fs from 'fs';
import * as path from 'path';
import pc from 'picocolors';
import { Config, defaultConfig } from './7-types-config';
import { type LocalizationStrings } from './9-types';

/**
 * Process extraction results and create a report.
 * Saves results to JSON file and displays summary statistics.
 * 
 * @param results - The localization strings extracted by scanAndExtract()
 * @param outputFile - Optional output file path (defaults to config default)
 */
export function createReport(results: LocalizationStrings, config?: Partial<Config>): void {
    // 1. Write report file
    const outputPath = path.resolve(config?.outputFile || defaultConfig.outputFile);
    writeReportFile(results, outputPath);

    // 2. Display summary
    const totalStrings = Object.values(results).reduce((sum, obj) => sum + Object.keys(obj).length, 0);
    const totalFiles = Object.keys(results).length;

    console.log(`✅ Extracted ${pc.cyan(pc.bold(totalStrings))} strings from ${pc.cyan(pc.bold(totalFiles))} files`);
    console.log(pc.gray(`   Saved to: ${outputPath}`));
}

function writeReportFile(results: LocalizationStrings, outputPath: string): void {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf-8');
}
