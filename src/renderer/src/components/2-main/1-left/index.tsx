import { LongPanel } from "../2-right/LongPanel";
import { DemoTreeWithOptions } from "./2-tree-demo";

export function PanelA() {
    return (
        <div className="m-0.5 h-full">
            {/* <span className="font-semibold">One</span> */}
            {/* <LongPanel /> */}
            <DemoTreeWithOptions />
        </div>
    );
}
