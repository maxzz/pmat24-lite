import { Versions } from '../versions-list';
import electronLogo from '../../assets/electron.svg';

export function SectionMain() {
    const ipcHandle = (): void => window.electron.ipcRenderer.send('ping');
    return (
        <div>
            Main

            <div className="action">
                <a target="_blank" rel="noreferrer" onClick={ipcHandle}>
                    Send IPC
                </a>
            </div>

            <Versions />
            <img alt="logo" className="logo" src={electronLogo} />

        </div>
    );
}
