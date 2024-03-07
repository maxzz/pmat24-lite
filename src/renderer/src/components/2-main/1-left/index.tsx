import { PanelHeader } from "./0-header";
import { DemoTreeWithOptions } from "./2-tree-demo";
import { panel1Classes, panel2Classes, panel3Classes } from "../3-middle/shared-panels";

export function PanelA() {
    return (
        <div className={`${panel1Classes} pr-0`}>
            <div className={`${panel2Classes} rounded-l`}>
                <div className={panel3Classes}>
                    <PanelHeader />

                    <DemoTreeWithOptions />
                </div>
            </div>
        </div>
    );
}
