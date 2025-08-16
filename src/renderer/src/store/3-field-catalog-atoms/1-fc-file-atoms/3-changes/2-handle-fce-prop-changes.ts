import { type ValueLife, sameValueLife, valueAs2Str } from "@/store/manifest";
import { ConsoleStyles } from "@/utils";
import { type FceItem } from "../../9-types";
import { type FcePropChangesProps } from "./1-prop-changes-atom";
import { fileUsChanges } from "@/store/2-file-mani-atoms";

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
        // case 'valueLifeAtom': { // this not part of fc anymore
        //     changePrefix = 'life';
        //     const valueLife = nextValue as ValueLife;
        //     changed = !sameValueLife(valueLife, beforeEdit);

        //     const { value, valueAs, isRef, fType, isNon } = valueLife;
        //     selectedItem.fieldValue.value = value;
        //     selectedItem.fieldValue.valueAs = valueAs;
        //     selectedItem.fieldValue.isRef = isRef;
        //     selectedItem.fieldValue.fType = fType;
        //     selectedItem.fieldValue.isNon = isNon;
        //     break;
        // }
    }

    if (changePrefix) {
        fileUsChanges.set(fceCtx.fceAtoms, changed, `${changePrefix}-${uuid}`);
        printItemChanges(selectedItem, ctx, changed, changePrefix, uuid);
    }
}

function printItemChanges(selectedItem: FceItem, ctx: FcePropChangesProps, changed: boolean, changePrefix: string, uuid: number) {
    const { fceCtx/*, name, nextValue*/ } = ctx;

    if (!fceCtx.fceAtoms.fileUs.parsedSrc.stats.isFCatRoot) {
        return;
    }

    const curr = selectedItem.fieldValue;
    // const next = nextValue as ValueLife;

    const fmt = new ConsoleStyles();

    fmt.add({ name: 'fceItem.change:', value: `'${changePrefix}'`, cValue: 'color: #ea900a' });
    fmt.add({ name: ', changed:', value: changed ? 'true, ' : 'false,', cValue: changed ? 'color: #00a000' : 'color: #ababab' });
    // valueLife2Styles(curr, fmt); // this not part of fc anymore
    fmt.add({ name: ' dbid:', value: `'${curr.dbname}'` });
    fmt.add({ name: ', disp:', value: `'${curr.displayname}'`, cValue: 'color: #8eacf8' });

    console.log(...fmt.toFormated(''));
}

function valueLife2Styles(valueLife: ValueLife, out: ConsoleStyles = new ConsoleStyles()): ConsoleStyles {
    const { value, valueAs, isRef, isNon } = valueLife;
    out.add({ name: ' valueAs:',  /**/ value: valueAs2Str(valueAs),      /**/ cValue: 'color: #8eacf8' });
    out.add({ name: ', value:',    /**/ value: `'${value}'`,              /**/ cValue: 'color: #8eacf8' });
    out.add({ name: ', isRef:',    /**/ value: isRef ? 'true ' : 'false', /**/ cValue: isRef ? 'color: #00a000' : 'color: #ababab' });
    out.add({ name: ', isNon:',    /**/ value: isNon ? 'true ' : 'false', /**/ cValue: isNon ? 'color: #00a000' : 'color: #ababab' });
    return out;
}
