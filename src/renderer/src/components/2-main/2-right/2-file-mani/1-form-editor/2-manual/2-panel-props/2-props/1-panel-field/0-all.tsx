import { useSnapshot } from "valtio";
import { type FceItem, appSettings } from "@/store";
import { type FileUsCtx, type ManualFieldState } from "@/store/1-atoms/3-file-mani-atoms";
import { Column3_Label, Column4_Value, Column5_Catalog } from "../../../../1-normal/1-fields";
import { InputLabel, ManualFieldPolicy, ManualFieldType } from "../8-props-ui";

export function PropsEditorFld({ item, fileUsCtx }: { item: ManualFieldState.CtxFld; fileUsCtx: FileUsCtx; }) {
    const { useItAtom, labelAtom, valueLifeAtom } = item.rowCtx;

    const { showFieldCatalog } = useSnapshot(appSettings.appUi.uiAdvanced);
    const valueRowClasses = showFieldCatalog ? "grid grid-cols-[1fr,1fr,auto]" : "grid grid-cols-[1fr,auto]";

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

            {showFieldCatalog && (<>
                <InputLabel label="Catalog" className="ml-2">
                    <Column5_Catalog
                        rowCtx={item.rowCtx}
                        fileUsCtx={fileUsCtx}
                        onSelectCatItem={onSelectCatItem}
                    />
                </InputLabel>
            </>)}

            <ManualFieldPolicy item={item} />
        </div>
    </>);
}
