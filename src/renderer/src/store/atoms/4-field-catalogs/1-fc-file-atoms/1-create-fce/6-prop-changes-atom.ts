import { atom, type Getter, type Setter } from "jotai";
import { type FceItem, type FceCtx } from "../../9-types";
import { type ValueLife } from "@/store/manifest";
import { setManiChanges, theSameValue } from "../../../3-file-mani-atoms";
import { debounce } from "@/utils";

type FcePropChangesProps = {
    fceCtx: FceCtx;
    name: string;
    nextValue: string | ValueLife;
};

export const doFcePropChangesAtom = atom(
    null,
    (get, set, props: FcePropChangesProps) => {
        const selectedItem = get(props.fceCtx.selectedItemAtom);
        if (!selectedItem) {
            return;
        }

        debouncedHandleFcePropChanges(selectedItem, props, get, set);
    },
);

function handleFcePropChanges(selectedItem: FceItem, { fceCtx, name, nextValue }: FcePropChangesProps, get: Getter, set: Setter) {
    console.log('handlePropChanges', name, nextValue);

    const beforeEdit = selectedItem.beforeEdit;
    const uuid = selectedItem.fceMeta.uuid;

    switch (name) {
        case 'nameAtom': {
            const displayname = nextValue as string;
            const changed = displayname !== beforeEdit.displayname;
            //console.log('doFcePropChangesAtom', JSON.stringify({ name, changed, uuid, nextValue, current: selectedItem.fieldValue }, null, 2));

            selectedItem.fieldValue.displayname = displayname;
            setManiChanges(fceCtx.fceAtoms, changed, `name-${uuid}`);
            break;
        }
        case 'ownernoteAtom': {
            const ownernote = nextValue as string;
            const changed = ownernote !== beforeEdit.ownernote;
            //console.log('doFcePropChangesAtom', JSON.stringify({ name, changed, uuid, nextValue, current: selectedItem.fieldValue }, null, 2));

            selectedItem.fieldValue.ownernote = ownernote;
            setManiChanges(fceCtx.fceAtoms, changed, `note-${uuid}`);
            break;
        }
        case 'valueLifeAtom': {
            const { value, valueAs, isRef, isNon } = nextValue as ValueLife;
            const changed = !theSameValue(nextValue as ValueLife, beforeEdit);
            //console.log('doFcePropChangesAtom', JSON.stringify({ name, changed, uuid, nextValue, current: selectedItem.fieldValue }, null, 2));

            selectedItem.fieldValue.value = value;
            selectedItem.fieldValue.valueAs = valueAs;
            selectedItem.fieldValue.isRef = isRef;
            selectedItem.fieldValue.isNon = isNon;
            setManiChanges(fceCtx.fceAtoms, changed, `life-${uuid}`);
            break;
        }
    }
}

const debouncedHandleFcePropChanges = debounce(handleFcePropChanges, 500);
