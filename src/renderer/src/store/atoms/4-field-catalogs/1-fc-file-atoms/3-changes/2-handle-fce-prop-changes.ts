import { type Getter, type Setter } from "jotai";
import { type ValueLife, sameValueLife } from "@/store/manifest";
import { type FceItem } from "../../9-types";
import { type FcePropChangesProps } from "./1-prop-changes-atom";
import { setFileUsChangeFlag, hasFileUsAnyChanges } from "@/store/atoms/3-file-mani-atoms";

export function handleFcePropChanges(selectedItem: FceItem, ctx: FcePropChangesProps, get: Getter, set: Setter) {
    const { fceCtx, name, nextValue } = ctx;
    const beforeEdit = selectedItem.beforeEdit;
    const uuid = selectedItem.fceMeta.uuid;

    const openMainDlg = !fceCtx.inData?.openItemPickerDlg;
    if (!openMainDlg) {
        return;
    }

    let changed = false;
    let changePrefix: string | undefined;

    switch (name) {
        case 'nameAtom': {
            changePrefix = 'name';
            const displayname = nextValue as string;
            changed = displayname !== beforeEdit.displayname;
            //console.log('doFcePropChangesAtom', JSON.stringify({ name, changed, uuid, nextValue, current: selectedItem.fieldValue }, null, 2));
            selectedItem.fieldValue.displayname = displayname;
            break;
        }
        case 'ownernoteAtom': {
            changePrefix = 'note';
            const ownernote = nextValue as string;
            changed = ownernote !== beforeEdit.ownernote;
            //console.log('doFcePropChangesAtom', JSON.stringify({ name, changed, uuid, nextValue, current: selectedItem.fieldValue }, null, 2));
            selectedItem.fieldValue.ownernote = ownernote;
            break;
        }
        case 'valueLifeAtom': {
            changePrefix = 'life';
            changed = !sameValueLife(nextValue as ValueLife, beforeEdit);
            //console.log('doFcePropChangesAtom', JSON.stringify({ name, changed, uuid, nextValue, current: selectedItem.fieldValue }, null, 2));

            const { value, valueAs, isRef, isNon } = nextValue as ValueLife;
            selectedItem.fieldValue.value = value;
            selectedItem.fieldValue.valueAs = valueAs;
            selectedItem.fieldValue.isRef = isRef;
            selectedItem.fieldValue.isNon = isNon;
            break;
        }
    }

    if (changePrefix) {
        setFileUsChangeFlag(fceCtx.fceAtoms, changed, `${changePrefix}-${uuid}`);
    }

    printItemChanges(selectedItem, ctx, changed, uuid);
}

function printItemChanges(selectedItem: FceItem, ctx: FcePropChangesProps, changed: boolean, uuid: number) {
    const { fceCtx, name, nextValue } = ctx;

    if (fceCtx.fceAtoms.fileUs.parsedSrc.stats.isFCatRoot) {
        const fileChanged = hasFileUsAnyChanges(fceCtx.fceAtoms);
        console.log('doFcePropChangesAtom', JSON.stringify({ name, changed, fileChanged, uuid, nextValue, current: selectedItem.fieldValue }, null, 2));
    }
}
