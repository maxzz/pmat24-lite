import { useSnapshot } from "valtio";
import { appSettings } from "@/store";
import { type FileUsCtx, type ManualFieldState } from "@/store/1-atoms/2-file-mani-atoms";
import { Column3_Label } from "../../../../1-normal/1-fields";
import { InputLabel } from "../8-props-ui";
import { Col_ManualFieldType } from "./2-col-field-type";
import { Col_PolicyOrLink } from "./6-col-policy-or-link";
import { Col_ManualFieldValue } from "./5-col-value";
import { Col_FiledCatalog } from "./7-col-field-catalog";

export function PropsEditorFld({ item, fileUsCtx }: { item: ManualFieldState.CtxFld; fileUsCtx: FileUsCtx; }) {
    const { useItAtom, labelAtom } = item.rowCtx;
    const { fcAllowed } = useSnapshot(appSettings.files.shownManis);

    return (<>
        <div className="grid grid-cols-[auto,1fr] gap-2">
            <InputLabel label="Type">
                <Col_ManualFieldType item={item} />
            </InputLabel>

            <InputLabel label="Label">
                <Column3_Label
                    useItAtom={useItAtom}
                    valueAtom={labelAtom}
                    highlightCtx={{ mFieldCtx: item, fileUs: fileUsCtx.fileUs, formIdx: fileUsCtx.formIdx }}
                />
            </InputLabel>
        </div>

        <div className={fcAllowed ? "grid grid-cols-[1fr,1fr,auto] gap-2" : "grid grid-cols-[1fr,auto] gap-2"}>
            <InputLabel label="Value">
                <Col_ManualFieldValue item={item} fileUsCtx={fileUsCtx} />
            </InputLabel>

            <Col_FiledCatalog item={item} fileUsCtx={fileUsCtx} />

            <Col_PolicyOrLink item={item} fileUsCtx={fileUsCtx} />
        </div>
    </>);
}
