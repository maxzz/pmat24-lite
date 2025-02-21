import { DialogCreateManiSecondPage, DialogCreateManiV1 } from "./1-start-version-1-dialog";
import { DialogCreateManiV2 } from "./2-start-version-2-drawer";

export function ManiCreateDialogs() {
    return (<>
        <DialogCreateManiV1 />
        <DialogCreateManiSecondPage />
        <DialogCreateManiV2 />
    </>);
}
