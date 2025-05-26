import { useSnapshot } from "valtio";
import { FieldTyp, FormIdx } from "@/store/manifest";
import { InputLabel, ManualFieldPolicy, ManualFieldType } from "../8-props-ui";
import { type FceItem, appSettings } from "@/store";
import { type FileUsCtx, type ManualFieldState } from "@/store/1-atoms/2-file-mani-atoms";
import { Column3_Label, Column4_Value, Column5_Catalog } from "../../../../1-normal/1-fields";
import { useAtomValue } from "jotai";

export function PropsEditorFld({ item, fileUsCtx }: { item: ManualFieldState.CtxFld; fileUsCtx: FileUsCtx; }) {
    const { useItAtom, labelAtom, valueLifeAtom, typeAtom } = item.rowCtx;
    
    const isCpass = fileUsCtx.formIdx === FormIdx.cpass;
    const isPsw  = useAtomValue(typeAtom) === FieldTyp.psw;

    const { fcAllowed } = useSnapshot(appSettings.files.shownManis);
    const valueRowClasses = fcAllowed ? "grid grid-cols-[1fr,1fr,auto]" : "grid grid-cols-[1fr,auto]";

    function onSelectCatItem(item: FceItem | undefined) {
        /*TODO:*/
    }

    return (<>
        <div className="grid grid-cols-[auto,1fr] gap-2">
            <InputLabel label="Type">
                <ManualFieldType item={item} />
            </InputLabel>

            <InputLabel label="Label">
                <Column3_Label
                    useItAtom={useItAtom}
                    valueAtom={labelAtom}
                    highlightCtx={{ mFieldCtx: item }}
                />
            </InputLabel>
        </div>

        <div className={valueRowClasses}>
            <InputLabel label="Value">
                <Column4_Value
                    useItAtom={useItAtom}
                    valueLifeAtom={valueLifeAtom}
                    choosevalue=""
                />
            </InputLabel>

            {fcAllowed && (<>
                <InputLabel label="Catalog" className="ml-2">
                    <Column5_Catalog
                        rowCtx={item.rowCtx}
                        fileUsCtx={fileUsCtx}
                        onSelectCatItem={onSelectCatItem}
                    />
                </InputLabel>
            </>)}

            {isCpass ? (
                <LinkToLoginForm item={item} />
            ) : (
                <ManualFieldPolicy item={item} />
            )}

        </div>
    </>);
}

function LinkToLoginForm({ item }: { item: ManualFieldState.CtxFld; }) {
    return (
        <div className="text-xs text-foreground">
            Link
        </div>
    );
}
