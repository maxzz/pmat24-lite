import { useAtom, useAtomValue } from 'jotai';
import { OptionsState } from '@/store/atoms/3-file-mani-atoms/4-options';
import { RowInput } from '../4-controls';

export function Part2ScreenDetection({ atoms }: { atoms: OptionsState.Atoms; }) {
    
    const [url, setUrl] = useAtom(atoms.uiPart2ScreenDetection.urlAtom);
    const [caption, setCaption] = useAtom(atoms.uiPart2ScreenDetection.captionAtom); //TODO: show only if web app
    const [monitor, setMonitor] = useAtom(atoms.uiPart2ScreenDetection.monitorAtom);

    const fileUs = useAtomValue(atoms.fileUsAtom);
    const isWeb = fileUs.stats.isWeb;

    return (
        isWeb
            ? (<>
                <div className="">
                    URL
                </div>
                <RowInput value={url} onChange={(e) => setUrl(e.target.value)} />
            </>)
            : (<>
                <div className="">
                    Windows Caption
                </div>
                <RowInput value={caption} onChange={(e) => setCaption(e.target.value)} />

                <div className="">
                    Monitor screen changes
                </div>
                <RowInput value={monitor ? '1' : '0'} onChange={(e) => setMonitor(e.target.value === '1')} />
            </>)
    );
}
