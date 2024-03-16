import { useAtomValue } from 'jotai';
import { LongPanel } from "./LongPanel";
import { PanelHeader } from "./0-header";
import { panel1Classes, panel2Classes, panel3Classes } from "../3-middle/shared-panels";
import { Body_Xml } from "./3-file-xml";
import { useSnapshot } from 'valtio';
import { rightPanel } from '@/store';
import { FileUsAtomType } from '@/store/store-types';

function ContentForSelected({ selectedAtom }: { selectedAtom: FileUsAtomType; }) {
    const selected = useAtomValue(selectedAtom);
    return (
        <Body_Xml text={selected.raw} />
    );
}

export function PanelB() {
    const selectedAtom = useSnapshot(rightPanel);
    return (
        <div className={`${panel1Classes} pl-0`}>
            <div className={`${panel2Classes} rounded-r`}>
                <div className={panel3Classes}>
                    <PanelHeader />

                    <div className="flex-1 outline-none" tabIndex={0}>
                        {/* <LongPanel /> */}

                        {selectedAtom.selected && (
                            <ContentForSelected selectedAtom={selectedAtom.selected} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
