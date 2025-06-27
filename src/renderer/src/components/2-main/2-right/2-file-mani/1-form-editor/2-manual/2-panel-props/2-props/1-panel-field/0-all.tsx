import { type FileUsCtx, type ManualFieldState } from "@/store/1-atoms/2-file-mani-atoms";
import { Column3_Label } from "../../../../1-normal/1-fields";
import { InputLabel } from "../8-props-ui";
import { Col_ManualFieldType } from "./1-col-field-type";
import { SecondRow } from "./2-second-row";

export function PropsEditorFld({ item, fileUsCtx }: { item: ManualFieldState.CtxFld; fileUsCtx: FileUsCtx; }) {
    const { useItAtom, labelAtom } = item.rowCtx;
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

        <SecondRow item={item} fileUsCtx={fileUsCtx} />
    </>);
}
