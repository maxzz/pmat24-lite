import { type LocalizationStrings } from './9-types';
import { type Config } from './7-types-config';
import { getConfig } from './7-get-config';
import { scanAndExtract } from './1-scan-process';
import { createReport } from './3-reports';

function main() {
    const config: Partial<Config> = getConfig();
    const results: LocalizationStrings = scanAndExtract(config);
    createReport(results, config);
}

main(); // Auto-execute when run directly
