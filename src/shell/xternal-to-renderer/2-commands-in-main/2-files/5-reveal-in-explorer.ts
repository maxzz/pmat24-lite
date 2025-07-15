import path from "path";
import fs from "fs";
import { exec } from "child_process";

export function revealInExplorer(fpath: string): string { // call 'r2mi:reveal-in-explorer' in main
    if (!fs.existsSync(fpath)) {
        return 'File not found';
    }

    showFileInExplorer(fpath);
    return '';
}

async function showFileInExplorer(filePath: string) {
    const absolutePath = path.resolve(filePath);
    exec(
        `explorer /select,"${absolutePath}"`,
        (error, stdout, stderr) => {
            if (error) {
                console.error(`Error opening file: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
        }
    );
}
