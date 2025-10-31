import * as fs from "fs";
import * as path from "path";
import pc from "picocolors";
import { Config, defaultConfig } from "./7-config-types";
import { type ResultOfScan } from "./9-types";

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

    if (config.mode === 'scan') {
        // 2. Display summary with all statistics
        const totalStrings = Object.values(scanResult.strings).reduce((sum, obj) => sum + Object.keys(obj).length, 0);

        console.log(`✅ Extracted ${pc.cyan(pc.bold(totalStrings))} strings from ${pc.cyan(pc.bold(scanResult.totalOfFilesWithStrings))} files`);
        
        if (config.verbose) {
            console.log(pc.gray(`   Total files scanned ${pc.cyan(scanResult.totalOfAllFiles)}: with extractable strings ${pc.cyan(scanResult.totalOfFilesWithStrings)} and without ${pc.cyan(scanResult.totalOfAllFiles - scanResult.totalOfFilesWithStrings)}`));
        }

        writeReportFile(scanResult.strings, outputPath);
        console.log(pc.gray(`   Saved to: ${outputPath}`));
    }
    else if (config.mode === 'translated') {
        // 2. Display summary with all statistics
        const totalStrings = Object.values(scanResult.translatedStrings).reduce((sum, obj) => sum + Object.keys(obj).length, 0);

        console.log(`✅ Collected ${pc.cyan(pc.bold(totalStrings))} strings from ${pc.cyan(pc.bold(scanResult.totalOfFilesWithStrings))} files`);
        
        if (config.verbose) {
            console.log(pc.gray(`   Total files scanned ${pc.cyan(scanResult.totalOfAllFiles)}: with extractable strings ${pc.cyan(scanResult.totalOfFilesWithStrings)} and without ${pc.cyan(scanResult.totalOfAllFiles - scanResult.totalOfFilesWithStrings)}`));
        }

        writeReportFile(scanResult.translatedStrings, outputPath);
        console.log(pc.gray(`   Saved to: ${outputPath}`));
    }
}

function writeReportFile(results: ResultOfScan['strings'], outputPath: string): void {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf-8');
}
