import { hasMain, R2MCalls } from '@/xternal-to-main';

// Non-reactive Napi reentrancy lock

export const napiLock = {
    isLocked: false,
    canceled: false, // Non-reactive detection cancellation. This is cheked by fake loaders when there is no electron.

    locked(): boolean {
        if (this.isLocked) {
            console.error('Napi call lock is already locked');
            return true;
        }
        this.isLocked = true;
        this.canceled = false;
        return false;
    },
    unlock() {
        this.isLocked = false;
    },
    cancel() {
        this.canceled = true;
        if (hasMain()) {
            R2MCalls.cancelDetection();
        }
    },
};
