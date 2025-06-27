import { useSnapshot } from "valtio";
import { appSettings } from "@/store";
import { type FileUsCtx, type ManualFieldState } from "@/store/1-atoms/2-file-mani-atoms";
import { InputLabel } from "../8-props-ui";
import { Col_PolicyOrLink } from "./6-col-policy-or-link";
import { Col_ManualFieldValue } from "./5-col-value";
import { Col_FiledCatalog } from "./7-col-field-catalog";

export function SecondRow({ item, fileUsCtx }: { item: ManualFieldState.CtxFld; fileUsCtx: FileUsCtx; }) {
    const { fcAllowed } = useSnapshot(appSettings.files.shownManis);
    return (
        <div className={fcAllowed ? "grid grid-cols-[1fr,1fr,auto] gap-2" : "grid grid-cols-[1fr,auto] gap-2"}>
            <InputLabel label="Value">
                <Col_ManualFieldValue item={item} fileUsCtx={fileUsCtx} />
            </InputLabel>

            <Col_FiledCatalog item={item} fileUsCtx={fileUsCtx} />

            <Col_PolicyOrLink item={item} fileUsCtx={fileUsCtx} />
        </div>
    );
}
