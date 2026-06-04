import fs from 'node:fs';
import path from 'node:path';

// -----------------------------------------------------------------------------
// Pure / Side-Effect-Free Data Extraction and Formatting Functions
// -----------------------------------------------------------------------------

/**
 * Extracts the version number from .env file content.
 * Specifically checks the second line first, then falls back to regex search.
 * Pure function: receives env file content, returns version or empty string if not found.
 */
export function extractVersionFromEnvContent(envContent: string): string {
    const envLines = envContent.split(/\r?\n/);
    
    // Specifically check line 2 (index 1) as requested
    const line2 = envLines[1];
    
    if (line2 && line2.startsWith('VITE_BUILD=')) {
        return line2.split('=')[1].trim();
    }
    
    // Fallback: search the whole file for VITE_BUILD
    const match = envContent.match(/^VITE_BUILD=(.*)$/m);
    if (match) {
        return match[1].trim();
    }
    
    return '';
}

/**
 * Updates the version field inside the package.json content.
 * Pure function: receives package.json content and new version, returns updated formatted string
 * or null if version is already up to date.
 */
export function updatePackageJsonContent(pkgContent: string, newVersion: string): string | null {
    const pkg = JSON.parse(pkgContent);
    
    if (pkg.version === newVersion) {
        return null; // Version is already up to date, no changes needed
    }
    
    pkg.version = newVersion;
    
    // Format JSON with 4 spaces and append a clean trailing newline
    return JSON.stringify(pkg, null, 4) + '\n';
}

// -----------------------------------------------------------------------------
// Side-Effect I/O Orchestration (Main Flow)
// -----------------------------------------------------------------------------

function run() {
    try {
        const rootDir = process.cwd();

        // 1. Read .env file and extract version
        const envPath = path.join(rootDir, '.env');
        if (!fs.existsSync(envPath)) {
            console.error(`Error: .env file not found at ${envPath}`);
            process.exit(1);
        }

        const envContent = fs.readFileSync(envPath, 'utf-8');
        const buildVersion = extractVersionFromEnvContent(envContent);

        if (!buildVersion) {
            console.error('Error: Could not find VITE_BUILD version in .env file.');
            process.exit(1);
        }

        console.log(`Extracted VITE_BUILD version from .env: ${buildVersion}`);

        // 2. Read package.json and prepare update
        const pkgPath = path.join(rootDir, 'package.json');
        if (!fs.existsSync(pkgPath)) {
            console.error(`Error: package.json not found at ${pkgPath}`);
            process.exit(1);
        }

        const pkgContent = fs.readFileSync(pkgPath, 'utf-8');
        const updatedContent = updatePackageJsonContent(pkgContent, buildVersion);

        // 3. Write back to package.json only if changed
        if (updatedContent === null) {
            console.log(`package.json version is already up to date (${buildVersion}).`);
        } else {
            fs.writeFileSync(pkgPath, updatedContent, 'utf-8');
            console.log(`Successfully updated package.json version to: ${buildVersion}`);
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
