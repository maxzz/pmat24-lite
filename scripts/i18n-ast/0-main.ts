import * as fs from 'fs';
import * as path from 'path';
import JSON5 from 'json5';
import pc from 'picocolors';
import { type Config, defaultConfig } from './1-config';
import { scanAndExtract } from './4-scan-process';
import { help } from './2-help';

const DEFAULT_CONFIG_FILE_NAME = 'extract-i18n-config.json5';

function loadConfigFile(configFileName: string | undefined): Partial<Config> {
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
        const config = JSON5.parse(content);
        console.log(pc.gray(`♻️  Loaded configuration from ${fileName}`));
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

    // Check for verbose flag
    const verbose = args.includes('--verbose') || args.includes('-v');

    if (verbose) {
        console.log(`♻️  ${pc.bold('Extracting localization strings')} ${pc.gray('(AST-based)')}...`);
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
        } else if (key === 'v' || key === 'verbose') {
            // Already handled above, skip
            continue;
        } else if (key === 'src') config.srcDir = value;
        else if (key === 'output') config.outputFile = value;
        else if (key === 'min-length') config.minStringLength = parseInt(value, 10);
        else if (key === 'exclude') config.excludeFiles = value.split(',').map(f => f.trim());
        else if (key === 'exclude-paths') config.excludePaths = value.split(',').map(p => p.trim());
        else if (key === 'exclude-pattern') config.excludePattern = value;
        else if (key === 'classname-suffix') config.classNameSuffix = value;
        else if (key === 'classname-functions') config.classNameFunctions = value.split(',').map(f => f.trim());
    }

    if (verbose) {
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
    }

    const results = scanAndExtract(config);
    const totalStrings = Object.values(results).reduce((sum, obj) => sum + Object.keys(obj).length, 0);

    const outputPath = path.resolve(config.outputFile || defaultConfig.outputFile);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf-8');

    console.log(`✅ Extracted ${pc.cyan(pc.bold(totalStrings))} strings from ${pc.cyan(pc.bold(Object.keys(results).length))} files`);
    console.log(pc.gray(`   Saved to: ${outputPath}`));
}

// Auto-execute when run directly
main();
