import fs from 'fs';
import path from 'path';

/**
 * Save file from renderer in the main process.
 * @param fileName - file name with path
 * @param content - file content
 * @returns - error message or empty string
 */
export async function saveFileInMain(fileName: string, content: string): Promise<string> {

    // 1. Create dir if needed

    const fileDir = path.dirname(fileName || '');
    if (!fileDir || fileDir === '.') {
        console.error(`saveFile: no dirname "${fileName}"`);
        return `Cannot save file "${fileName}"`;
    }

    //TODO: check 255 chars limit

    // 2. Write file

    try {
        if (!fs.existsSync(fileDir)) {
            await fs.promises.mkdir(fileDir, { recursive: true });
        }

        console.log('saveFile', fileName, content);

        // await fs.promises.writeFile(fileName, content);
        return '';
    } catch (error) {
        console.error('saveFileInMain', error);
        return `Cannot save file "${fileName}", error: ${error}`;
    }
}
