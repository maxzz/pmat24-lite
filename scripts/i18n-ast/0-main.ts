import pc from 'picocolors';
import { type Config } from './8-types-config';
import { getConfig } from './1-get-config';
import { scanAndExtract } from './4-scan-process';
import { createReport } from './5-reports';

function main() {
    const config: Partial<Config> | undefined = getConfig();
    if (config) {
        console.log(pc.yellow('⚠️  No configuration found'));
        return;
    }

    const results = scanAndExtract(config);
    createReport(results, config);
}

main(); // Auto-execute when run directly
