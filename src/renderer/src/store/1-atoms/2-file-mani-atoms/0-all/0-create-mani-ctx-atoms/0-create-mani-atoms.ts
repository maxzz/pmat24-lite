import { type Atom, atom } from "jotai";
import { FormIdx } from "@/store/manifest";
import { type FileUs, type FileUsAtom } from "@/store/store-types";
import { type MFormCnt, type NFormCnt, type FileUsCtx, type AnyFormAtoms, type ManiAtoms, type FormFields } from "../../9-types";
import { NormalModeState } from "../../1-normal-fields";
import { ManualFieldsState } from "../../2-manual-fields";
import { OptionsState } from "../../4-options";

export function createManiAtoms({ fileUs, fileUsAtom }: { fileUs: FileUs; fileUsAtom: FileUsAtom; }): ManiAtoms {
    const rv: any = [];
    const maniAtoms = rv as ManiAtoms;

    const loginFormCtx = createFormCtx({ fileUs, fileUsAtom, formIdx: FormIdx.login }, maniAtoms);
    const cpassFormCtx = createFormCtx({ fileUs, fileUsAtom, formIdx: FormIdx.cpass }, maniAtoms);

    rv.push(loginFormCtx);
    rv.push(cpassFormCtx);
    rv.push(loginFormCtx?.formFieldsAtom || atom([]));
    rv.push(cpassFormCtx?.formFieldsAtom || atom([]));

    //printCreateManiAtoms(fileUsAtom, fileUs, maniAtoms);
    return rv;
}

function createFormCtx(fileUsCtx: FileUsCtx, maniAtoms: ManiAtoms): AnyFormAtoms | undefined {

    const { fileUs, formIdx } = fileUsCtx;
    const metaForm = fileUs.parsedSrc.meta?.[formIdx]; // This is parent's umbrella, so we can safely use ! enywhere under it
    if (!metaForm) {
        return;
    }

    let normal: NFormCnt | undefined;
    let manual: MFormCnt | undefined;

    if (metaForm.disp.isScript) {
        manual = ManualFieldsState.createFormCtx(fileUsCtx, maniAtoms);
    } else {
        normal = NormalModeState.createNormalCnt(fileUsCtx, maniAtoms);
    }

    //console.log(`%c🥑 createFormFieldsAtom ${formIdx ? 'cpass' : 'login'} normal:%o manual:%o`, 'color: magenta', normal, manual);

    const rv: AnyFormAtoms = {
        normal,
        manual,
        formFieldsAtom: createFormFieldsAtom(normal, manual),
        options: OptionsState.createAtoms(fileUsCtx, maniAtoms),
        fileUsCtx: fileUsCtx,
    };

    return rv;
}

function createFormFieldsAtom(normal: NFormCnt | undefined, manual: MFormCnt | undefined): Atom<FormFields> {
    const rv = atom<FormFields>(
        (get) => {
            let fields: FormFields | undefined;
            if (normal) {
                fields = normal.rowCtxs;
            }
            if (manual) {
                fields = get(manual.chunksAtom)
                    .map(
                        (chunk) => {
                            if (chunk.type === 'fld') {
                                console.log('    accessing fld', chunk.rowCtx.fromFile.dbname);
                                return chunk.rowCtx;
                            }
                        }
                    )
                    .filter(Boolean);
            }
            return fields || [];
        }
    );
    return rv;
}

function printCreateManiAtoms(fileUsAtom: FileUsAtom, fileUs: FileUs, maniAtoms: ManiAtoms) {
    console.groupCollapsed(
        `%c⛓ createManiAtoms: fileUsAtom:%c${fileUsAtom.toString()} %cuuid:${fileUs.fileCnt.unid}`,
        'font-weight: normal; color: gray',
        'font-weight: normal; color: magenta',
        'font-weight: normal; color: gray',
        { fileUs, maniAtoms }
    );
    console.trace();
    console.groupEnd();
}
