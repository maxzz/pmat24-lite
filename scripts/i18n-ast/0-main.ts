import { type Config } from './8-types-config';
import { type LocalizationStrings } from './9-types';
import { getConfig } from './1-get-config';
import { scanAndExtract } from './4-scan-process';
import { createReport } from './5-reports';

function main() {
    const config: Partial<Config> = getConfig();
    const results: LocalizationStrings = scanAndExtract(config);
    createReport(results, config);
}

main(); // Auto-execute when run directly
