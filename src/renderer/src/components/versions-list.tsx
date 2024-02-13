import { useState } from 'react';

export function Versions(): JSX.Element {
    if (!window.electron) {
        return <div className="versions" style={{ display: 'block', padding: '0.5rem 1rem' }}>No electron running</div>;
    }
    const [versions] = useState(window.electron.process.versions);
    return (
        <ul className="versions">
            <li className="electron-version">Electron v{versions.electron}</li>
            <li className="chrome-version">Chromium v{versions.chrome}</li>
            <li className="node-version">Node v{versions.node}</li>
        </ul>
    );
}
