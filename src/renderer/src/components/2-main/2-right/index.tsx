import { LongPanel } from "./LongPanel";
import { PanelHeader } from "./0-header";
import { panel1Classes, panel2Classes, panel3Classes } from "../3-middle/shared-panels";

export function PanelB() {
    return (
        <div className={`${panel1Classes} pl-0`}>
            <div className={`${panel2Classes} rounded-r`}>
                <div className={panel3Classes}>
                    <PanelHeader />

                    <div className="flex-1 outline-none overflow-auto" tabIndex={0}>
                        <LongPanel />
                    </div>
                </div>
            </div>
        </div>
    );
}
