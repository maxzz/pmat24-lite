import fs from 'fs';
import path from 'path';

export async function saveFileFromMain(fileName: string, content: string): Promise<boolean> {

    // 1. Create dir if needed
    
    const fileDir = path.dirname(fileName || '');
    if (!fileDir) {
        console.error(`saveFile: no dirname "${fileName}"`);
        return false;
    }

    if (!fs.existsSync(fileDir)) {
        await fs.promises.mkdir(fileDir, { recursive: true });
    }

    // 2. Write file
    
    console.log('saveFile', fileName, content);

    try {
        await fs.promises.writeFile(fileName, content);
        return true;
    } catch (error) {
        console.error('saveFile', error);
        return false;
    }
}
