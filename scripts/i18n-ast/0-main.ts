import { getConfig } from "./7-config-get";
import { type Config } from "./7-config-types";
import { type ResultOfScan } from "./9-types";
import { scanAndExtract } from "./1-scan-process";
import { createReport } from "./3-reports";

function main() {
    const config: Config = getConfig();
    const results: ResultOfScan = scanAndExtract(config);
    createReport(results, config);
}

main(); // Auto-execute when run directly
