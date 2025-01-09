import { CreateManiDialog } from "../1-body-version-1-dialog";
import { CreateManiSecondDialog } from "../2-body-version-2-drawer";
import { ManiDrawer } from "../2-body-version-2-drawer/1-drawer";

export function ManiCreateDialogs() {
    return (<>
        <CreateManiDialog />
        <CreateManiSecondDialog />
        <ManiDrawer />
    </>);
}
