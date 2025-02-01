import { CreateManiDialog } from "./1-start-version-1-dialog";
import { CreateManiSecondDialog, ManiDrawer } from "./2-start-version-2-drawer";

export function ManiCreateDialogs() {
    return (<>
        <CreateManiDialog />
        <CreateManiSecondDialog />
        <ManiDrawer />
    </>);
}
