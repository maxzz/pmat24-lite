import { type Getter, type Setter } from "jotai";
import { type ValueLife, sameValueLife } from "@/store/manifest";
import { type FceItem } from "../../9-types";
import { type FcePropChangesProps } from "./1-prop-changes-atom";
import { setFileUsChangeFlag, hasFileUsAnyChanges } from "@/store/atoms/3-file-mani-atoms";

export function handleFcePropChanges(selectedItem: FceItem, { fceCtx, name, nextValue }: FcePropChangesProps, get: Getter, set: Setter) {
    const beforeEdit = selectedItem.beforeEdit;
    const uuid = selectedItem.fceMeta.uuid;

    const openMainDlg = !fceCtx.inData?.openItemPickerDlg;
    if (!openMainDlg) {
        return;
    }

    switch (name) {
        case 'nameAtom': {
            const displayname = nextValue as string;
            const changed = displayname !== beforeEdit.displayname;
            //console.log('doFcePropChangesAtom', JSON.stringify({ name, changed, uuid, nextValue, current: selectedItem.fieldValue }, null, 2));
            selectedItem.fieldValue.displayname = displayname;
            
            setFileUsChangeFlag(fceCtx.fceAtoms, changed, `name-${uuid}`);
            break;
        }
        case 'ownernoteAtom': {
            const ownernote = nextValue as string;
            const changed = ownernote !== beforeEdit.ownernote;
            //console.log('doFcePropChangesAtom', JSON.stringify({ name, changed, uuid, nextValue, current: selectedItem.fieldValue }, null, 2));
            selectedItem.fieldValue.ownernote = ownernote;
            
            setFileUsChangeFlag(fceCtx.fceAtoms, changed, `note-${uuid}`);
            break;
        }
        case 'valueLifeAtom': {
            const changed = !sameValueLife(nextValue as ValueLife, beforeEdit);
            //console.log('doFcePropChangesAtom', JSON.stringify({ name, changed, uuid, nextValue, current: selectedItem.fieldValue }, null, 2));

            const { value, valueAs, isRef, isNon } = nextValue as ValueLife;
            selectedItem.fieldValue.value = value;
            selectedItem.fieldValue.valueAs = valueAs;
            selectedItem.fieldValue.isRef = isRef;
            selectedItem.fieldValue.isNon = isNon;

            setFileUsChangeFlag(fceCtx.fceAtoms, changed, `life-${uuid}`);
            break;
        }
    }

    if (fceCtx.fceAtoms.fileUs.parsedSrc.stats.isFCatRoot) {
        const changed = hasFileUsAnyChanges(fceCtx.fceAtoms);
        console.log('doFcePropChangesAtom', JSON.stringify({ name, changed, uuid, nextValue, current: selectedItem.fieldValue }, null, 2));
    }
}
