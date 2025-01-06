import { type Getter, type Setter } from "jotai";
import { type ValueLife, sameValueLife, valueAs2Str } from "@/store/manifest";
import { type FceItem } from "../../9-types";
import { type FcePropChangesProps } from "./1-prop-changes-atom";
import { setFileUsChangeFlag, hasFileUsAnyChanges } from "@/store/atoms/3-file-mani-atoms";

export function handleFcePropChanges(selectedItem: FceItem, ctx: FcePropChangesProps, get: Getter, set: Setter) {
    if (ctx.fceCtx.inData?.openItemPickerDlg) {
        return;
    }

    const { fceCtx, name, nextValue } = ctx;
    const beforeEdit = selectedItem.beforeEdit;
    const uuid = selectedItem.fceMeta.uuid;

    let changed = false;
    let changePrefix: string | undefined;

    switch (name) {
        case 'nameAtom': {
            changePrefix = 'name';
            const displayname = nextValue as string;
            changed = displayname !== beforeEdit.displayname;

            selectedItem.fieldValue.displayname = displayname;
            break;
        }
        case 'ownernoteAtom': {
            changePrefix = 'note';
            const ownernote = nextValue as string;
            changed = ownernote !== beforeEdit.ownernote;

            selectedItem.fieldValue.ownernote = ownernote;
            break;
        }
        case 'valueLifeAtom': {
            changePrefix = 'life';
            const valueLife = nextValue as ValueLife;
            changed = !sameValueLife(valueLife, beforeEdit);

            const { value, valueAs, isRef, fType, isNon } = valueLife;
            selectedItem.fieldValue.value = value;
            selectedItem.fieldValue.valueAs = valueAs;
            selectedItem.fieldValue.isRef = isRef;
            selectedItem.fieldValue.fType = fType;
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

        let s = JSON.stringify({ name, changed, fileChanged, uuid }, null, 2);

        s += JSON.stringify({ current: selectedItem.fieldValue, nextValue }, null, 2);

        console.log('FcePropChanges', s);

        const curr: any = { ...selectedItem.fieldValue };
        const next: any = {...nextValue as ValueLife};

        curr.valueAs = valueAs2Str(curr.valueAs);
        next.valueAs = valueAs2Str(next.valueAs);

        console.table({ current: curr, nextValue: next });
    }
}
