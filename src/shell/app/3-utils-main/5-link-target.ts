import path from 'path';
import { promisify } from 'util';
import { exec } from 'child_process';

// Promisify the exec function to use with async/await
const execPromise = promisify(exec);

/**
 * Gets the target path of a Windows .lnk file.
 * @param linkPath The path to the .lnk file.
 * @returns A Promise that resolves with the target path, or rejects on error.
 */
export async function getLinkTargetPath(linkPath: string): Promise<string> {
    if (process.platform !== 'win32') {
        throw new Error('This function only works on Windows.');
    }

    // Check if the file extension is .lnk
    if (path.extname(linkPath).toLowerCase() !== '.lnk') {
        return linkPath;
    }

    // Use PowerShell to read the TargetPath property of the shortcut
    // The extra quotes and escaping are important for handling paths with spaces
    const command = `(New-Object -ComObject WScript.Shell).CreateShortcut('${linkPath}').TargetPath`;

    try {
        const { stdout } = await execPromise(command, { 'shell': 'powershell.exe' });
        return stdout.trim(); // Trim any trailing whitespace from the output
    } catch (err: any) {
        if (err.stderr) {
            throw new Error(`PowerShell error: ${err.stderr}`);
        }
        throw err;
    }
}

/*
    gai: 'how to check in nodejs that path is Windows link or folder'
        // const stats = fs.lstatSync(filePath); If filePath points to a Windows symbolic link (e.g., a .lnk file): stats.isSymbolicLink() will be true.
        'is symbolic link the same as Windows shotcut?' 
            // No, a Windows symbolic link is not the same as a Windows shortcut. A shortcut is a regular file with a .lnk extension.
            'How to get destination of Windows .lnk file?'
                //npm install windows-shortcuts-ps https://github.com/felixrieseberg/windows-shortcuts-ps
                'Make Method 2 as typescript function that receive link path as parameter'
                'Make alternative example as typescript function that receive link path as parameter'

    or: https://github.com/felixrieseberg/windows-shortcuts-ps/blob/master/lib/index.js

    gai: 'how to check in Chrome browser that path is Windows link or folder?' <- In a Chrome browser, you cannot directly check if a Windows path is a shortcut (.lnk file) or a folder due to security restrictions.
*/
