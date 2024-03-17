import { useAtomValue } from 'jotai';
import { rightPanelSelectedContentAtom } from '@/store';
import { PanelHeader } from "./0-header";
import { panel1Classes, panel2Classes, panel3Classes } from "../3-middle/shared-panels";
import { Body_Xml } from "./3-file-xml";
import { LongPanel } from './LongPanel';

function ContentForSelected() {
    const selected = useAtomValue(rightPanelSelectedContentAtom);

    const staticText = !selected ? 'No file selected' : !selected.raw ? 'Not supported format' : undefined;
    if (staticText) {
        return (
            <div className="h-full text-muted-foreground flex items-center justify-center">
                {staticText}
            </div>
        );
    }

    return (
        <Body_Xml text={selected?.raw || ''} />
    );
}

export function PanelB() {
    return (
        <div className={`${panel1Classes} pl-0`}>
            <div className={`${panel2Classes} rounded-r`}>
                <div className={panel3Classes}>
                    <PanelHeader />

                    <div className="relative w-full h-full">
                        <div className="absolute inset-px bottom-0.5 text-xs">
                            {/* <LongPanel className="w-full h-20 overflow-auto" /> */}
                            <ContentForSelected />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
