import { spawn } from 'child_process';

/**
 * @param fullPath - full path to the file to run
 * @returns empty string on success, error message on failure
 */
export function runProcess(fullPath: string): Promise<string> {
    const rv = new Promise<string>((resolve) => {
        try {
            const child = spawn(fullPath, [], {
                detached: true,
                stdio: 'ignore'
            });

            let resolved = false;

            child.on('error', (err) => {
                if (!resolved) {
                    resolved = true;
                    resolve(err.message);
                }
            });

            child.on('spawn', () => {
                if (!resolved) {
                    resolved = true;
                    child.unref();
                    resolve('');
                }
            });
        } catch (e: any) {
            resolve(e.message || 'Unknown error');
        }
    });
    return rv;
}
