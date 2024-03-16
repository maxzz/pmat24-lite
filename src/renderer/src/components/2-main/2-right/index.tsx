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
    console.log('render ContentForSelected', selected, selected.raw);
    
    return (
        <Body_Xml text={selected.raw || "Not supported format"} />
    );
}

export function PanelB() {
    const { selected } = useSnapshot(rightPanel);
    console.log('render PanelB', selected);
    
    return (
        <div className={`${panel1Classes} pl-0`}>
            <div className={`${panel2Classes} rounded-r`}>
                <div className={panel3Classes}>
                    <PanelHeader />

                    <div className="flex-1 outline-none" tabIndex={0}>
                        {/* <LongPanel /> */}

                        {selected ? (
                            <ContentForSelected selectedAtom={selected} />
                        )
                            : (
                                <div className="flex items-center justify-center h-full text-muted-foreground">
                                    No file selected
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
