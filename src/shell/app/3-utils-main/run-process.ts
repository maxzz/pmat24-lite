import { spawn } from 'child_process';

export function runProcess(fullPath: string): Promise<string | null> {
    return new Promise((resolve) => {
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
                    resolve(null);
                }
            });
        } catch (e: any) {
            resolve(e.message || 'Unknown error');
        }
    });
}

