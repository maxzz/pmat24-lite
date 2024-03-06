import { LongPanel } from "../2-right/LongPanel";
import { DemoTreeWithOptions } from "./2-tree-demo";

export function PanelA() {
    return (
        <div className="m-1 h-full">
            {/* <span className="font-semibold">One</span> */}
            {/* <LongPanel /> */}
            <DemoTreeWithOptions />
        </div>
    );
}
