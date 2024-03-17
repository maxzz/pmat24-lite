import { useAtomValue } from 'jotai';
import { LongPanel } from "./LongPanel";
import { PanelHeader } from "./0-header";
import { panel1Classes, panel2Classes, panel3Classes } from "../3-middle/shared-panels";
import { Body_Xml } from "./3-file-xml";
import { useSnapshot } from 'valtio';
import { rightPanel } from '@/store';
import { FileUsAtomType } from '@/store/store-types';
import { memo } from 'react';

// function ContentForSelected({ selectedAtom }: { selectedAtom: FileUsAtomType; }) {
//     // const selected = useAtomValue(selectedAtom);
//     // console.log('render ContentForSelected', `${selectedAtom}`, selected);
    
//     console.log('render ContentForSelected');

//     return null;
//     // return (
//     //     <Body_Xml text={selected.raw || "Not supported format"} />
//     // );
// }

const ContentForSelected = memo(function _ContentForSelected({ selectedAtom }: { selectedAtom: FileUsAtomType; }) {
    const selected = useAtomValue(selectedAtom);
    console.log('render ContentForSelected', `${selectedAtom}`, selected);
    
    // console.log('render ContentForSelected');

    // return null;
    return (
        <Body_Xml text={selected.raw || "Not supported format"} />
    );
})

export function PanelB() {
    const { selected } = useSnapshot(rightPanel);
    console.log('render PanelB', `${selected}`);

    return (
        <div className={`${panel1Classes} pl-0`}>
            <div className={`${panel2Classes} rounded-r`}>
                <div className={panel3Classes}>
                    <PanelHeader />

                    <div className="flex-1 outline-none" tabIndex={0}>
                        {/* <LongPanel /> */}

                        {selected
                            ? (<>
                                {console.log('ContentForSelected render before')!}
                                <ContentForSelected selectedAtom={selected} />
                                {console.log('ContentForSelected render after')!}
                            </>
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
            {console.log('render PanelB end')!}
        </div>
    );
}
