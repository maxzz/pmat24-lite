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

        // let s = JSON.stringify({ name, changed, fileChanged, uuid }, null, 2);
        // s += JSON.stringify({ current: selectedItem.fieldValue, nextValue }, null, 2);
        // console.log('FcePropChanges', s);

        // valueLife2Str('curr', selectedItem.fieldValue);
        // valueLife2Str('next', nextValue as ValueLife);

        console.log(...valueLife2Styles('curr: ', selectedItem.fieldValue).toFormated('curr'));
        console.log(...valueLife2Styles('next: ', nextValue as ValueLife).toFormated('next'));

/* 
        const curr: any = { ...selectedItem.fieldValue };
        const next: any = {...nextValue as ValueLife};

        curr.valueAs = valueAs2Str(curr.valueAs);
        next.valueAs = valueAs2Str(next.valueAs);

        console.table({ current: curr, nextValue: next }, ['displayname', 'dbname', 'valueAs' ]);
 */
    }
}

function valueLife2Str(label: string, valueLife: ValueLife) {
    const { value, valueAs, isRef, isNon } = valueLife;
    const s = `valueAs: ${valueAs2Str(valueAs)} value: '${value}' isRef: ${isRef} isNon: ${isNon}`;
    console.log(`${label}: ${s}`);
}

function valueLife2Str2(label: string, valueLife: ValueLife) {
    const colors: string[] = [];
    const items: string[] = [];

//     fields.forEach(
//         (field, idx) => {
//             if (!field.newMani) {
//                 return;
//             }
//             const m = field.newMani;

//             items.push('   ');
//             add({ name: ' type: ',  /**/ value: `${m.type.padEnd(6, ' ')}`,         /**/ colorValue: m.type === 'button' ? 'color: #8eacf8' : 'color: #888888' });
//             add({ name: ' useIt: ', /**/ value: m.useit ? 'true' : '    ',          /**/ colorValue: m.useit ? 'color: #00a000' : 'color: #ababab' });
//             add({ name: ' uuid: ',  /**/ value: `${field.meta.uuid}`,               /**/ colorValue: 'color: #ababab; font-size: 0.5rem' });
//             add({ name: ' name: ',  /**/ value: `${m.displayname || '???no name'}`, /**/ colorValue: 'color: var(--console-color-yellow); font-size: 0.6rem' });
//             add({ name: '',         /**/ value: '',                                 /**/ colorValue: 'color: black' }); // the last dummy item to fix font-size
//             idx !== fields.length - 1 && items.push('\n');
//         }
//     );

    console.log(`${label}\n${items.join('')}`, ...colors);

    function add({ name, value, colorValue, colorName }: { name: string; value: string; colorValue?: string; colorName?: string; }) {
        items.push(`%c${name}%c${value}`);
        colors.push(colorName || 'color: gray');
        colors.push(colorValue || 'color: #d58e00');
    }
}

class ConsoleStyles {
    colors: string[] = [];
    items: string[] = [];

    defaultColorName = 'color: gray';
    defaultColorValue = 'color: #d58e00';

    toFormated(label: string): string[] {
        return [`${label}${this.items.join('')}`, ...this.colors];
    }

    toFormat(): string {
        return this.items.join('');
    }

    toStyles(): string[] {
        return this.colors;
    }

    add({ name, value, colorValue, colorName }: { name: string; value: string; colorValue?: string; colorName?: string; }) {
        this.items.push(`%c${name}%c${value}`);
        this.colors.push(colorName || this.defaultColorName);
        this.colors.push(colorValue || this.defaultColorValue);
    }
}

function valueLife2Styles(label: string, valueLife: ValueLife): ConsoleStyles {
    const { value, valueAs, isRef, isNon } = valueLife;
    const out: ConsoleStyles = new ConsoleStyles();
    out.add({ name: ' valueAs: ',  /**/ value: valueAs2Str(valueAs),     /**/ colorValue: 'color: #8eacf8' });
    out.add({ name: ' value: ',    /**/ value: `'${value}'`,             /**/ colorValue: 'color: #8eacf8' });
    out.add({ name: ' isRef: ',    /**/ value: isRef ? 'true' : 'false', /**/ colorValue: isRef ? 'color: #00a000' : 'color: #ababab' });
    out.add({ name: ' isNon: ',    /**/ value: isNon ? 'true' : 'false', /**/ colorValue: isNon ? 'color: #00a000' : 'color: #ababab' });
    return out;
}
