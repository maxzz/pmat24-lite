import * as fs from 'fs';
import * as path from 'path';
import { type Config, defaultConfig } from './1-config';
import { scanAndExtract } from './4-scan-process';
import { help } from './2-help';

const DEFAULT_CONFIG_FILE_NAME = 'extract-i18n-config.json';

function loadConfigFile(configFileName?: string): Partial<Config> {
    const fileName = configFileName || DEFAULT_CONFIG_FILE_NAME;
    const configPath = path.resolve(fileName);
    
    if (!fs.existsSync(configPath)) {
        if (configFileName) {
            // If explicitly specified, warn that it doesn't exist
            console.warn(`⚠️  Config file not found: ${configPath}`);
        }
        return {};
    }

    try {
        const content = fs.readFileSync(configPath, 'utf-8');
        const config = JSON.parse(content);
        console.log(`📄 Loaded configuration from ${fileName}`);
        return config;
    } catch (error) {
        console.warn(`⚠️  Failed to parse ${fileName}:`, error instanceof Error ? error.message : error);
        return {};
    }
}

function main() {
    const args = process.argv.slice(2);

    if (args.includes('--help') || args.includes('-h')) {
        help();
        return;
    }

    // Check for custom config file
    let configFileName: string | undefined;
    const configArgIndex = args.findIndex(arg => arg === '--config' || arg === '-c');
    if (configArgIndex !== -1 && args[configArgIndex + 1]) {
        configFileName = args[configArgIndex + 1];
    }

    // Start with config from file (if exists)
    const config: Partial<Config> = loadConfigFile(configFileName);

    // CLI arguments override config file
    for (let i = 0; i < args.length; i += 2) {
        const key = args[i].replace(/^-+/, '');
        const value = args[i + 1];

        if (key === 'c' || key === 'config') {
            // Already handled above, skip
            continue;
        } else if (key === 'src') config.srcDir = value;
        else if (key === 'output') config.outputFile = value;
        else if (key === 'min-length') config.minStringLength = parseInt(value, 10);
        else if (key === 'exclude') config.excludeFiles = value.split(',').map(f => f.trim());
        else if (key === 'exclude-paths') config.excludePaths = value.split(',').map(p => p.trim());
        else if (key === 'exclude-pattern') config.excludePattern = value;
        else if (key === 'classname-suffix') config.classNameSuffix = value;
    }

    console.log('🔍 Extracting localization strings (AST-based)...');
    console.log(`   Source: ${config.srcDir || defaultConfig.srcDir}`);
    console.log(`   Output: ${config.outputFile || defaultConfig.outputFile}`);
    if (config.excludeFiles && config.excludeFiles.length > 0) {
        console.log(`   Excluding files: ${config.excludeFiles.join(', ')}`);
    }
    if (config.excludePaths && config.excludePaths.length > 0) {
        console.log(`   Excluding paths: ${config.excludePaths.join(', ')}`);
    }
    if (config.excludePattern) {
        console.log(`   Exclude pattern: ${config.excludePattern}`);
    }

    const results = scanAndExtract(config);
    const totalStrings = Object.values(results).reduce((sum, obj) => sum + Object.keys(obj).length, 0);

    const outputPath = path.resolve(config.outputFile || defaultConfig.outputFile);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf-8');

    console.log(`✅ Extracted ${totalStrings} strings from ${Object.keys(results).length} files`);
    console.log(`   Saved to: ${outputPath}`);
}

// Auto-execute when run directly
main();
