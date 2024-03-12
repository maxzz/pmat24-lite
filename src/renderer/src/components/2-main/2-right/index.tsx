import { LongPanel } from "./LongPanel";
import { PanelHeader } from "./0-header";
import { panel1Classes, panel2Classes, panel3Classes } from "../3-middle/shared-panels";
import { Body_Xml } from "./3-file-xml";
import { useAtomValue } from 'jotai';
import { xmlTextAtom } from '@/store';

export function PanelB() {
    const xmlText = useAtomValue(xmlTextAtom);
    return (
        <div className={`${panel1Classes} pl-0`}>
            <div className={`${panel2Classes} rounded-r`}>
                <div className={panel3Classes}>
                    <PanelHeader />

                    <div className="flex-1 opacity-60 outline-none overflow-auto" tabIndex={0}>
                        {/* <LongPanel /> */}
                        
                        <Body_Xml text={xmlText} />
                    </div>
                </div>
            </div>
        </div>
    );
}
