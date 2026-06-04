import fs from 'node:fs';
import path from 'node:path';

// -----------------------------------------------------------------------------
// Pure / Side-Effect-Free Data Extraction and Formatting Functions
// -----------------------------------------------------------------------------

/**
 * Extracts the version number from package.json contents.
 * Pure function: receives content, parses, returns version.
 */
export function extractVersionFromPackageJson(pkgContent: string): string {
    const pkg = JSON.parse(pkgContent);
    const version = pkg.version;
    if (!version) {
        throw new Error('version field not found in package.json.');
    }
    return version;
}

/**
 * Formats a Date object into a string with 'YY.MM.DD-HHMM' format.
 * Pure function: receives date, returns formatted string.
 */
export function formatBuildTime(date: Date): string {
    const yy = String(date.getFullYear()).slice(-2);
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    return `${yy}.${mm}.${dd}-${hh}${min}`;
}

/**
 * Computes all necessary absolute file paths and names based on inputs.
 * Pure function: receives config, returns directory and file mappings.
 */
export interface PathConfig {
    rootDir: string;
    version: string;
    formattedTime: string;
}

export interface ComputedPaths {
    releaseDir: string;
    originalFileName: string;
    originalFilePath: string;
    targetFileName: string;
    targetFilePath: string;
    originalBlockmapName: string;
    originalBlockmapPath: string;
    targetBlockmapName: string;
    targetBlockmapPath: string;
    latestYmlPath: string;
}

export function computeTargetPaths(config: PathConfig): ComputedPaths {
    const releaseDir = path.join(config.rootDir, 'release', config.version);
    
    const originalFileName = `pmat-setup-${config.version}.exe`;
    const originalFilePath = path.join(releaseDir, originalFileName);
    
    const targetFileName = `pmat-setup-v${config.version}_at_${config.formattedTime}.exe`;
    const targetFilePath = path.join(releaseDir, targetFileName);
    
    const originalBlockmapName = `${originalFileName}.blockmap`;
    const originalBlockmapPath = path.join(releaseDir, originalBlockmapName);
    
    const targetBlockmapName = `${targetFileName}.blockmap`;
    const targetBlockmapPath = path.join(releaseDir, targetBlockmapName);
    
    const latestYmlPath = path.join(releaseDir, 'latest.yml');
    
    return {
        releaseDir,
        originalFileName,
        originalFilePath,
        targetFileName,
        targetFilePath,
        originalBlockmapName,
        originalBlockmapPath,
        targetBlockmapName,
        targetBlockmapPath,
        latestYmlPath,
    };
}

/**
 * Replaces references of the old installer name with the new target name inside the latest.yml content.
 * Pure function: receives raw yml text and filenames, returns updated yml text.
 */
export function updateLatestYmlContent(content: string, originalFileName: string, targetFileName: string): string {
    const oldEscaped = originalFileName.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(oldEscaped, 'g');
    return content.replace(regex, targetFileName);
}

// -----------------------------------------------------------------------------
// Side-Effect I/O Orchestration (Main Flow)
// -----------------------------------------------------------------------------

function run() {
    try {
        const rootDir = process.cwd();

        // 1. Read package.json and extract version
        const pkgPath = path.join(rootDir, 'package.json');
        if (!fs.existsSync(pkgPath)) {
            console.error(`Error: package.json not found at ${pkgPath}`);
            process.exit(1);
        }
        const pkgContent = fs.readFileSync(pkgPath, 'utf-8');
        const version = extractVersionFromPackageJson(pkgContent);

        // 2. Generate date-time string
        const formattedTime = formatBuildTime(new Date());

        console.log(`Using version: ${version}`);
        console.log(`Formatted build time: ${formattedTime}`);

        // 3. Compute paths
        const paths = computeTargetPaths({ rootDir, version, formattedTime });

        // 4. Rename installer exe
        if (fs.existsSync(paths.originalFilePath)) {
            fs.renameSync(paths.originalFilePath, paths.targetFilePath);
            console.log(`Successfully renamed installer: "${paths.originalFileName}" -> "${paths.targetFileName}"`);
        } else {
            console.error(`Error: Installer file not found at expected path: ${paths.originalFilePath}`);
            process.exit(1);
        }

        // 5. Rename blockmap file
        if (fs.existsSync(paths.originalBlockmapPath)) {
            fs.renameSync(paths.originalBlockmapPath, paths.targetBlockmapPath);
            console.log(`Successfully renamed blockmap: "${paths.originalBlockmapName}" -> "${paths.targetBlockmapName}"`);
        }

        // 6. Update latest.yml auto-update metadata file
        if (fs.existsSync(paths.latestYmlPath)) {
            try {
                const content = fs.readFileSync(paths.latestYmlPath, 'utf-8');
                const updatedContent = updateLatestYmlContent(content, paths.originalFileName, paths.targetFileName);
                fs.writeFileSync(paths.latestYmlPath, updatedContent, 'utf-8');
                console.log(`Successfully updated references in "${paths.latestYmlPath}"`);
            } catch (err) {
                console.warn(`Warning: Failed to update latest.yml references: ${err}`);
            }
        }
    } catch (error) {
        console.error(`Error: ${error instanceof Error ? error.message : error}`);
        process.exit(1);
    }
}

// Only execute the script logic if run directly
if (process.env.NODE_ENV !== 'test') {
    run();
}
