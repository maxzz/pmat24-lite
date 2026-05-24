import { type EditorDataForDly, type EditorDataForFld, type EditorDataForKbd, type EditorDataForPos, type EditorDataForOne, type EditorField } from "@/store/8-manifest";
import { type ManualFieldState } from "../9-types";
import { type RowInputState } from "@/ui/local-ui/1-input-validate";
import { NormalFieldConv } from "../../1-normal-fields";

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

// Get raw input states for validation

export type RowInputStateUuid =
    & RowInputState
    & {
        uuid: number;
        rowIdx: number; // to report validation error
        chunk: ManualFieldState.Ctx;
    };

export function getChunkRawInputStatesForValidate(chunk: ManualFieldState.Ctx, rowIdx: number, get: Getter): RowInputStateUuid[] {
    const rv: RowInputState[] = [];
    switch (chunk.type) {
        case "kbd": {
            const { char, repeat, shift, ctrl, alt } = getKbdChunkValues(chunk, get);
            rv.push(char, repeat, shift, ctrl, alt);
            break;
        }
        case "pos": {
            const { x, y, units, res } = getPosChunkValues(chunk, get);
            rv.push(x, y, units, res);
            break;
        }
        case "dly": {
            const { n } = getDlyChunkValues(chunk, get);
            rv.push(n);
            break;
        }
        case "fld": {
            break;
        }
    }
    return rv.map((item) => ({ ...item, uuid: chunk.uid5, rowIdx, chunk }));
}

// Per chunk access

type EditorValues<T> = {
    [key in keyof T]: RowInputState;
};

function getKbdChunkValues(atoms: ManualFieldState.CtxKbd, get: Getter): EditorValues<Omit<EditorDataForKbd, 'type'>> {
    const rv = {
        char: get(atoms.charAtom),
        repeat: get(atoms.repeatAtom),
        shift: get(atoms.shiftAtom),
        ctrl: get(atoms.ctrlAtom),
        alt: get(atoms.altAtom),
    };
    return rv;
}

function getPosChunkValues(atoms: ManualFieldState.CtxPos, get: Getter): EditorValues<Omit<EditorDataForPos, 'type'>> {
    const rv = {
        x: get(atoms.xAtom),
        y: get(atoms.yAtom),
        units: get(atoms.unitsAtom),
        res: get(atoms.resAtom),
    };
    return rv;
}

function getDlyChunkValues(atoms: ManualFieldState.CtxDly, get: Getter): EditorValues<Omit<EditorDataForDly, 'type'>> {
    const rv = {
        n: get(atoms.nAtom),
    };
    return rv;
}
