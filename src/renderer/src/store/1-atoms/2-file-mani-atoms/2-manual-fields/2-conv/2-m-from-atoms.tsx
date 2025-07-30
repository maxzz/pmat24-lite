import { type EditorDataForDly, type EditorDataForFld, type EditorDataForKbd, type EditorDataForPos, type EditorDataForOne, type EditorField } from "@/store/manifest";
import { type ManualFieldState } from "../9-types";
import { NormalFieldConv } from "../../1-normal-fields";
import { getKbdChunkValues, getPosChunkValues, getDlyChunkValues } from "./4-m-verify-state-access";

export function fromAtom(scriptItemCtx: ManualFieldState.Ctx, getset: GetOnly): EditorDataForOne {
    const { get } = getset;
    switch (scriptItemCtx.type) {
        case "kbd": {
            const { char, repeat, shift, ctrl, alt } = getKbdChunkValues(scriptItemCtx, get);
            const rv: EditorDataForKbd = {
                type: 'kbd',
                char: char.data,
                repeat: +repeat.data,
                shift: +shift.data,
                ctrl: +ctrl.data,
                alt: +alt.data,
            };
            return rv;
        }
        case "pos": {
            const { x, y, units, res } = getPosChunkValues(scriptItemCtx, get);
            const rv: EditorDataForPos = {
                type: 'pos',
                x: +x.data,
                y: +y.data,
                units: !!units.data,
                res: +res.data,
            };
            return rv;
        }
        case "dly": {
            const { n } = getDlyChunkValues(scriptItemCtx, get);
            const rv: EditorDataForDly = {
                type: 'dly',
                n: +n.data,
            };
            return rv;
        }
        case "fld": {
            const fromAtomValues: EditorField.ForAtoms = NormalFieldConv.fromAtoms(scriptItemCtx.rowCtx, getset);
            const rv: EditorDataForFld = {
                type: 'fld',
                field: scriptItemCtx.rowCtx.metaField,
                editField: fromAtomValues,
            };
            return rv;
        }
    }
}

export function fromAtoms(scriptItems: ManualFieldState.Ctx[], getset: GetSet): EditorDataForOne[] {
    const chunks = scriptItems.map((scriptItem) => fromAtom(scriptItem, getset));
    return chunks;
}
