import { useState } from 'react';
import { hasMain } from '@shared/ipc-client';

export function Versions(): JSX.Element {
    if (!hasMain()) {
        return <div>No electron running</div>;
    }
    const [versions] = useState(window.electron.process.versions);
    return (
        <ul className="flex gap-2">
            <li className="px-4 py-2 bg-muted border-muted border rounded">Electron v{versions.electron}</li>
            <li className="px-4 py-2 bg-muted border-muted border rounded">Chromium v{versions.chrome}</li>
            <li className="px-4 py-2 bg-muted border-muted border rounded">Node v{versions.node}</li>
        </ul>
    );
}
