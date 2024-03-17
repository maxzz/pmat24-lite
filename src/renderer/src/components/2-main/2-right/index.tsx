import { useAtomValue } from 'jotai';
import { PanelHeader } from "./0-header";
import { panel1Classes, panel2Classes, panel3Classes } from "../3-middle/shared-panels";
import { Body_Xml } from "./3-file-xml";
import { rPanelSelectedContentAtom } from '@/store';

function ContentForSelected() {
    const selected = useAtomValue(rPanelSelectedContentAtom);

    if (!selected) {
        return (
            <div className="flex items-center justify-center h-full text-muted-foreground">
                No file selected
            </div>
        );
    } else if (!selected.raw) {
        return (
            <div className="flex items-center justify-center h-full text-muted-foreground">
                Not supported format
            </div>
        );
    }

    return (
        <Body_Xml text={selected.raw} />
    );
}

export function PanelB() {

    console.log('render PanelB');

    return (
        <div className={`${panel1Classes} pl-0`}>
            <div className={`${panel2Classes} rounded-r`}>
                <div className={panel3Classes}>
                    <PanelHeader />

                    <div className="flex-1 outline-none" tabIndex={0}>
                        {/* <LongPanel /> */}
                        <ContentForSelected />
                    </div>
                </div>
            </div>
        </div>
    );
}
