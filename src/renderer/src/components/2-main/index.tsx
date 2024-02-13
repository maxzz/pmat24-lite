import { Versions } from '../versions-list';
import electronLogo from '../../assets/electron.svg';
import { Button } from '@/ui';

export function SectionMain() {
    const ipcHandle = (): void => window.electron.ipcRenderer.send('ping');
    return (
        <div>
            <Button onClick={ipcHandle}>Send IPC</Button>
            {/* <div className="action">
                <a target="_blank" rel="noreferrer" onClick={ipcHandle}>
                    Send IPC
                </a>
            </div> */}

            <Versions />
            <img alt="logo" className="logo" src={electronLogo} />

        </div>
    );
}
