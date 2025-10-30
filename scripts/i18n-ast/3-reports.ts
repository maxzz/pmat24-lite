import * as fs from 'fs';
import * as path from 'path';
import pc from 'picocolors';
import { Config, defaultConfig } from './7-types-config';
import { type ResultOfScan } from './9-types';

/**
 * Process extraction results and create a report.
 * Saves results to JSON file and displays summary statistics.
 * 
 * @param scanResult - The scan results with statistics from scanAndExtract()
 * @param config - Optional configuration for output path
 */
export function createReport(scanResult: ResultOfScan, config: Partial<Config>): void {
    // 1. Write report file
    const outputPath = path.resolve(config?.outputFile || defaultConfig.outputFile);
    writeReportFile(scanResult.strings, outputPath);

    // 2. Display summary with all statistics
    const totalStrings = Object.values(scanResult.strings).reduce((sum, obj) => sum + Object.keys(obj).length, 0);

    console.log(`✅ Extracted ${pc.cyan(pc.bold(totalStrings))} strings from ${pc.cyan(pc.bold(scanResult.totalOfFilesWithStrings))} files`);
    
    console.log(pc.gray(`   Total files scanned: ${scanResult.totalOfAllFiles}`));
    console.log(pc.gray(`   Files with extractable strings: ${scanResult.totalOfFilesWithStrings}`));
    console.log(pc.gray(`   Files without strings: ${scanResult.totalOfAllFiles - scanResult.totalOfFilesWithStrings}`));
    
    console.log(pc.gray(`   Saved to: ${outputPath}`));
}

function writeReportFile(results: ResultOfScan['strings'], outputPath: string): void {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf-8');
}
