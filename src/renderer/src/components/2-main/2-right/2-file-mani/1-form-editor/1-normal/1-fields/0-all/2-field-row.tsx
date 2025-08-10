import { useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { appSettings } from "@/store/9-ui-state";
import { type FileUsCtx, type FieldRowCtx } from "@/store/1-atoms/2-file-mani-atoms";
import { type FceItem } from "@/store/1-atoms/4-field-catalogs";
import { Column1_UseIt } from "../1-column-useIt";
import { Column2_Type } from "../2-column-type";
import { Column3_Label } from "../3-column-label";
import { Column4_ValueSelector } from "../4-column-value-selector";
import { Column5_Catalog } from "../5-column-catalog";
import { Column6_PolicySelector } from "../6-column-policy-selector/0-all-policy-link-selector";
//import { usePrintFileUsHwnds } from "./8-use-print-form-fields";

export function FieldRow({ rowCtx, fileUsCtx }: { rowCtx: FieldRowCtx; fileUsCtx: FileUsCtx; }) {
    const { useItAtom, typeAtom, labelAtom, valueLifeAtom, policiesAtom, metaField } = rowCtx;
    const maniField = metaField.mani;
    const isTextField = maniField.type === 'text';

    const setUseIt = useSetAtom(useItAtom);
    const enableRow = () => setUseIt(true);

    const { fcAllowed } = useSnapshot(appSettings.files.shownManis);
    const { showFormTextFields } = useSnapshot(appSettings.appUi.uiGeneral);

    function onSelectCatItem(item: FceItem | undefined) {
    }

    //usePrintFileUsHwnds({ ctx: fileUsCtx });

    if (!showFormTextFields && isTextField) {
        return null;
    }

    return (<>
        <Column2_Type
            useItAtom={useItAtom}
            maniField={maniField}
            onClick={enableRow}
        />

        <Column1_UseIt
            useItAtom={useItAtom}
        />

        <Column3_Label
            useItAtom={useItAtom}
            valueAtom={labelAtom}
            highlightCtx={{ nFieldCtx: rowCtx, fileUs: fileUsCtx.fileUs, formIdx: fileUsCtx.formIdx }}
            onClick={enableRow}
        />

        <Column4_ValueSelector
            rowCtx={rowCtx}
            fileUsCtx={fileUsCtx}
        />

        {fcAllowed && (
            <Column5_Catalog
                rowCtx={rowCtx}
                fileUsCtx={fileUsCtx}
                onSelectCatItem={onSelectCatItem}
                onClick={enableRow}
                key={rowCtx.metaField.uuid} // we need key to updata Column5_Catalog.selectValueAtom
            />
        )}

        <Column6_PolicySelector
            rowCtx={rowCtx}
            fileUsCtx={fileUsCtx}
        />
    </>);
}
