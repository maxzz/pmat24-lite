import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { FieldTyp, FormIdx } from "@/store/manifest";
import { type FceItem, appSettings } from "@/store";
import { type FileUsCtx, type ManualFieldState } from "@/store/1-atoms/2-file-mani-atoms";
import { Column3_Label, Column4_Value, Column5_Catalog } from "../../../../1-normal/1-fields";
import { InputLabel } from "../8-props-ui";
import { ManualFieldType } from "./2-col-field-type";
import { ManualFieldPolicyBtn, PolicyOrLink } from "./6-col-policy-or-link";
import { ManualFieldValue } from "./5-col-value";
import { Col_FiledCatalog } from "./7-col-field-catalog";

export function PropsEditorFld({ item, fileUsCtx }: { item: ManualFieldState.CtxFld; fileUsCtx: FileUsCtx; }) {
    const { useItAtom, labelAtom, valueLifeAtom, typeAtom } = item.rowCtx;

    const isFieldPsw = useAtomValue(typeAtom) === FieldTyp.psw;
    const isFormLogin = fileUsCtx.formIdx === FormIdx.login;

    const { fcAllowed } = useSnapshot(appSettings.files.shownManis);
    const valueRowClasses = fcAllowed ? "grid grid-cols-[1fr,1fr,auto] gap-2" : "grid grid-cols-[1fr,auto] gap-2";

    // function onSelectCatItem(item: FceItem | undefined) {
    //     /*TODO:*/
    // }

    return (<>
        <div className="grid grid-cols-[auto,1fr] gap-2">
            <InputLabel label="Type">
                <ManualFieldType item={item} />
            </InputLabel>

            <InputLabel label="Label">
                <Column3_Label
                    useItAtom={useItAtom}
                    valueAtom={labelAtom}
                    highlightCtx={{ mFieldCtx: item, fileUs: fileUsCtx.fileUs, formIdx: fileUsCtx.formIdx }}
                />
            </InputLabel>
        </div>

        <div className={valueRowClasses}>
            <InputLabel label="Value">
                {/* <Column4_Value
                    useItAtom={useItAtom}
                    valueLifeAtom={valueLifeAtom}
                    choosevalue=""
                /> */}
                <ManualFieldValue item={item} fileUsCtx={fileUsCtx} />
            </InputLabel>

            <Col_FiledCatalog item={item} fileUsCtx={fileUsCtx} />
            {/* {fcAllowed && (<>
                <InputLabel label="Catalog">
                    <Column5_Catalog
                        rowCtx={item.rowCtx}
                        fileUsCtx={fileUsCtx}
                        onSelectCatItem={onSelectCatItem}
                    />
                </InputLabel>
            </>)} */}

            <PolicyOrLink item={item} fileUsCtx={fileUsCtx} />

            {/* {isFieldPsw && <>
                {isFormLogin
                    ? <ManualFieldPolicyBtn item={item} />
                    : <LinkToLoginForm item={item} />

                }
            </>} */}

        </div>
    </>);
}
