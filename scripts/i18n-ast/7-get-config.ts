import * as fs from 'fs';
import * as path from 'path';
import JSON5 from 'json5';
import pc from 'picocolors';
import { help } from './8-help';
import { type Config, DEFAULT_CONFIG_FILE_NAME, defaultConfig } from './7-types-config';

export function getConfig(): Config {
    const args = process.argv.slice(2);

    if (args.includes('--help') || args.includes('-h')) {
        help();
        process.exit(0);
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
    const config: Partial<Config> = loadConfigFile(configFileName, verbose);

    // Set verbose in config
    config.verbose = verbose;

    // CLI arguments override config file
    for (let i = 0; i < args.length; i += 2) {
        const key = args[i].replace(/^-+/, '');
        const value = args[i + 1];

        if (key === 'c' || key === 'config') { continue; } // Already handled above, skip
        else if (key === 'v' || key === 'verbose') { continue; } // Already handled above, skip
        else if (key === 'src') config.srcDir = value;
        else if (key === 'output') config.outputFile = value;
        else if (key === 'min-length') config.minStringLength = parseInt(value, 10);
        else if (key === 'exclude') config.excludeFiles = value.split(',').map(f => f.trim());
        else if (key === 'exclude-paths') config.excludePaths = value.split(',').map(p => p.trim());
        else if (key === 'exclude-pattern') config.excludePattern = value;
        else if (key === 'classname-suffix') config.classNameSuffix = value;
        else if (key === 'classname-functions') config.classNameFunctions = value.split(',').map(f => f.trim());
        else if (key === 'exclude-function-prefixes') config.excludeFunctionPrefixes = value.split(',').map(f => f.trim());
        else if (key === 'exclude-attribute-suffix-pattern') config.excludeAttributeSuffixPattern = value;
        else if (key === 'mode' || key === 'm') {
            if (value === 'scan' || value === 'translated') {
                config.mode = value;
            } else {
                console.error(`❌ Invalid mode: "${value}". Valid values are: "scan", "translated"`);
                process.exit(1);
            }
        }
    }

    if (verbose) {
        console.log(`   Mode: ${config.mode || defaultConfig.mode}`);
        console.log(`   Source: ${config.srcDir || defaultConfig.srcDir}`);
        console.log(`   Output: ${config.outputFile || defaultConfig.outputFile}`);
        if (config.excludeFiles && config.excludeFiles.length > 0) {
            console.log(`   Excluding files: \n\t${config.excludeFiles.join('\n\t')}`);
        }
        if (config.excludePaths && config.excludePaths.length > 0) {
            console.log(`   Excluding paths: \n\t${config.excludePaths.join('\n\t')}`);
        }
        if (config.excludePattern) {
            console.log(`   Exclude pattern: \n\t${config.excludePattern}`);
        }
    }

    const cfg = { ...defaultConfig, ...config }
    return cfg;
}

function loadConfigFile(configFileName: string | undefined, verbose: boolean): Partial<Config> {
    const fileName = configFileName || DEFAULT_CONFIG_FILE_NAME;
    const configPath = path.resolve(fileName);

    if (!fs.existsSync(configPath)) {
        if (configFileName) {
            // If explicitly specified, warn that it doesn't exist
            console.warn(`⚠️  Config file not found: ${configPath}`);
            process.exit(1);
        }
        return {};
    }

    try {
        const content = fs.readFileSync(configPath, 'utf-8');
        const config = JSON5.parse(content);
        if (verbose) {
            console.log(pc.gray(`♻️  Loaded configuration from ${fileName}`));
        }
        return config;
    } catch (error) {
        console.warn(`⚠️  Failed to parse ${fileName}:`, error instanceof Error ? error.message : error);
        process.exit(1);
    }
}
