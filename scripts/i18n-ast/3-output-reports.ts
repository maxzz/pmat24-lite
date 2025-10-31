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
        const totalStrings = countSubKeys(scanResult.strings);

        console.log(
            `${totalStrings ? '✅' : '⚠️'} Extracted ${pc.cyan(pc.bold(totalStrings))} ` +
            `strings from ${pc.cyan(pc.bold(scanResult.totalOfFilesWithStrings))} files. ` +
            `Total files scanned ${pc.cyan(scanResult.totalOfAllFiles)}. ` +
            `Skipped ${pc.cyan(scanResult.totalOfAllFiles - scanResult.totalOfFilesWithStrings)} files without extractable strings.`
        );

        if (totalStrings) {
            const cnt = JSON.stringify(scanResult.strings, null, 2);
            writeReportFile(cnt, outputPath);
            console.log(pc.gray(`   Saved to: ${outputPath}`));
        }
    }
    else if (config.mode === 'translated') {
        // 2. Display summary with all statistics
        const totalStrings = countKeys(scanResult.translatedStrings);

        console.log(
            `${totalStrings ? '✅' : '⚠️'}  Collected ${pc.cyan(pc.bold(totalStrings))} ` +
            `strings from ${pc.cyan(pc.bold(scanResult.totalOfFilesWithStrings))} files. ` +
            `Total files scanned ${pc.cyan(scanResult.totalOfAllFiles)}. ` +
            `Skipped ${pc.cyan(scanResult.totalOfAllFiles - scanResult.totalOfFilesWithStrings)} files without translated strings.`
        );

        if (totalStrings) {
            const cnt = JSON.stringify(scanResult.translatedStrings, null, 2);
            writeReportFile(cnt, outputPath);
            console.log(pc.gray(`   Saved to: ${outputPath}`));
        }
    }
}

function writeReportFile(cnt: string, outputPath: string): void {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, cnt, 'utf-8');
}

function countKeys(obj: Record<string, Record<string, string>>): number {
    return Object.keys(obj).length;
}

function countSubKeys(obj: Record<string, Record<string, string>>): number {
    return Object.values(obj).reduce((acc, cur) => acc + Object.keys(cur).length, 0);
}