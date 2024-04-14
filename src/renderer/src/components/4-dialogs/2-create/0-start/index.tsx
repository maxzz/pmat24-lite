import { CreateManiDialog } from "../1-body-first-page";
import { CreateManiSecondDialog } from "../2-body-second-page";
import { ManiDrawer } from "../2-body-second-page/1-drawer";

export function ManiCreateDialogs() {
    return (<>
        <CreateManiDialog />
        <CreateManiSecondDialog />
        <ManiDrawer />
    </>);
}
