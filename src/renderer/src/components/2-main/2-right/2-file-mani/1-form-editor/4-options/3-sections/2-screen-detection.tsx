import { useAtom, useAtomValue } from 'jotai';
import { OptionsState } from '@/store/atoms/3-file-mani-atoms/4-options';
import { RowInput, RowInputWLabel } from '../4-controls';

export function Part2ScreenDetection({ atoms }: { atoms: OptionsState.Atoms; }) {

    const { urlAtom, captionAtom, monitorAtom } = atoms.uiPart2ScreenDetection;

    // const [url, setUrl] = useAtom(urlAtom);
    // const [caption, setCaption] = useAtom(captionAtom); //TODO: show only if web app
    // const [monitor, setMonitor] = useAtom(monitorAtom);

    const fileUs = useAtomValue(atoms.fileUsAtom);
    const isWeb = fileUs.stats.isWeb;

    return (
        isWeb
            ? (<>
                <RowInputWLabel stateAtom={urlAtom} label="URL" />
                {/* <div className="">
                    URL
                </div>
                <RowInput value={url} onChange={(e) => setUrl(e.target.value)} /> */}
            </>)
            : (<>
                <RowInputWLabel stateAtom={captionAtom} label="Windows Caption" />
                {/* <div className="">
                    Windows Caption
                </div>
                <RowInput value={caption} onChange={(e) => setCaption(e.target.value)} /> */}

                <RowInputWLabel stateAtom={monitorAtom} label="Monitor screen changes" />
                {/* <div className="">
                    Monitor screen changes
                </div>
                <RowInput value={monitor ? '1' : '0'} onChange={(e) => setMonitor(e.target.value === '1')} /> */}
            </>)
    );
}
