import { type Getter, type Setter } from "jotai";
import { type ValueLife, sameValueLife, valueAs2Str } from "@/store/manifest";
import { type FceItem } from "../../9-types";
import { type FcePropChangesProps } from "./1-prop-changes-atom";
import { setFileUsChangeFlag, hasFileUsAnyChanges } from "@/store/atoms/3-file-mani-atoms";
import { ConsoleStyles } from "@/utils";

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

        // 1.
        // const fileChanged = hasFileUsAnyChanges(fceCtx.fceAtoms);
        // let s = JSON.stringify({ name, changed, fileChanged, uuid }, null, 2);
        // s += JSON.stringify({ current: selectedItem.fieldValue, nextValue }, null, 2);
        // console.log('FcePropChanges', s);

        // 2.
        const curr = selectedItem.fieldValue;
        const next = nextValue as ValueLife;

        // console.log(...valueLife2Styles(curr).toFormated('curr'));
        // console.log(...valueLife2Styles(next).toFormated('next'));

        // OK
        // const stylesCurr = valueLife2Styles(curr);
        // const stylesNext = valueLife2Styles(next);

        // const final = [
        //     `${stylesCurr.toFormat()}${stylesNext.toFormat()}`,
        //     ...stylesCurr.toStyles(),
        //     ...stylesNext.toStyles(),
        //     `displayname: ${selectedItem.fieldValue.displayname}, dbname: ${selectedItem.fieldValue.dbname}`
        // ];
        // console.log(...final);

        // OK
        // const final = [
        //     ...valueLife2Styles(curr).toFormated('curr'),
        //     '\n',
        //     ...valueLife2Styles(next).toFormated('next'),
        //     `displayname: ${selectedItem.fieldValue.displayname}, dbname: ${selectedItem.fieldValue.dbname}`
        // ];
        // console.log(...final);

        // OK
        // console.table({ current: curr, nextValue: next }, ['displayname', 'dbname', 'valueAs' ]);

        // OK
        console.log(`FcePropChanges: displayname: ${curr.displayname}, dbname: ${curr.dbname}`, {next});
        console.log(...valueLife2Styles(curr).toFormated('    curr'), `${curr.displayname}, dbname: ${curr.dbname}`);
      //console.log(...valueLife2Styles(next).toFormated('    next'), `${next.displayname}, dbname: ${next.dbname}`);
    }
}

function valueLife2Styles(valueLife: ValueLife): ConsoleStyles {
    const { value, valueAs, isRef, isNon } = valueLife;
    const out: ConsoleStyles = new ConsoleStyles();
    out.add({ name: ' valueAs: ',  /**/ value: valueAs2Str(valueAs),     /**/ colorValue: 'color: #8eacf8' });
    out.add({ name: ' value: ',    /**/ value: `'${value}'`,             /**/ colorValue: 'color: #8eacf8' });
    out.add({ name: ' isRef: ',    /**/ value: isRef ? 'true ' : 'false', /**/ colorValue: isRef ? 'color: #00a000' : 'color: #ababab' });
    out.add({ name: ' isNon: ',    /**/ value: isNon ? 'true ' : 'false', /**/ colorValue: isNon ? 'color: #00a000' : 'color: #ababab' });
    return out;
}
