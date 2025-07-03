import { type Atom, atom } from "jotai";
import { FormIdx } from "@/store/manifest";
import { type FileUs, type FileUsAtom } from "@/store/store-types";
import { type MFormCnt, type NFormCnt, type FileUsCtx, type AnyFormCtx, type ManiAtoms, type FieldRowCtx, safeByContext, lFieldsIdx, cFieldsIdx } from "../../9-types";
import { NormalModeState } from "../../1-normal-fields";
import { ManualFieldsState } from "../../2-manual-fields";
import { OptionsState } from "../../4-options";

/**
 * @param embeddTo - if defined then new atoms will be added to existing ManiAtoms. This is used when we create new manifest and use it for cpass.
 * @returns 
 */
export function createManiAtoms({ fileUs, fileUsAtom, embeddTo }: { fileUs: FileUs; fileUsAtom: FileUsAtom; embeddTo?: ManiAtoms | undefined | null; }): ManiAtoms {
    if (!embeddTo) {
        const rv: any = [];
        const maniAtoms = rv as ManiAtoms;

        const loginFormCtx = createFormCtx({ fileUs, fileUsAtom, formIdx: FormIdx.login }, maniAtoms);
        const cpassFormCtx = createFormCtx({ fileUs, fileUsAtom, formIdx: FormIdx.cpass }, maniAtoms);

        rv.push(loginFormCtx);
        rv.push(cpassFormCtx);
        rv.push(loginFormCtx?.fieldsAtom || atom([]));
        rv.push(cpassFormCtx?.fieldsAtom || atom([]));

        //printCreateManiAtoms(fileUsAtom, fileUs, maniAtoms);
        return rv;
    } else {
        const rv: any = embeddTo;
        const maniAtoms = rv as ManiAtoms;

        const cpassScope: FileUsCtx = { fileUs, fileUsAtom, formIdx: FormIdx.login };

        const loginFormCtx: AnyFormCtx = safeByContext(maniAtoms[FormIdx.login]);
        const cpassFormCtx: AnyFormCtx = safeByContext(createFormCtx(cpassScope, embeddTo));

        cpassScope.fileUs = loginFormCtx.fileUsCtx.fileUs;
        cpassScope.fileUsAtom = loginFormCtx.fileUsCtx.fileUsAtom;
        cpassScope.formIdx = FormIdx.cpass;

        rv[FormIdx.login] = loginFormCtx;
        rv[FormIdx.cpass] = cpassFormCtx;
        rv[lFieldsIdx] = loginFormCtx.fieldsAtom || atom([]);
        rv[cFieldsIdx] = cpassFormCtx.fieldsAtom || atom([]);

        //printCreateManiAtoms(fileUsAtom, fileUs, maniAtoms);
        return [...embeddTo];
    }
}

function createFormCtx(fileUsCtx: FileUsCtx, maniAtoms: ManiAtoms): AnyFormCtx | undefined {

    const { fileUs, formIdx } = fileUsCtx;
    const metaForm = fileUs.parsedSrc.meta?.[formIdx]; // This is parent's umbrella, so we can safely use ! enywhere under it
    if (!metaForm) {
        return;
    }

    let normal: NFormCnt | undefined;
    let manual: MFormCnt | undefined;

    if (metaForm.disp.isScript) {
        manual = ManualFieldsState.createManualFormCnt(fileUsCtx, maniAtoms);
    } else {
        normal = NormalModeState.createNormalFormCnt(fileUsCtx, maniAtoms);
    }
    //console.log(`%c🥑 createFormFieldsAtom ${formIdx ? 'cpass' : 'login'} normal:%o manual:%o`, 'color: magenta', normal, manual);

    const rv: AnyFormCtx = {
        normal,
        manual,
        fieldsAtom: createFormFieldsAtom(normal, manual),
        options: OptionsState.createAtoms(fileUsCtx, maniAtoms),
        fileUsCtx: fileUsCtx,
    };

    return rv;
}

function createFormFieldsAtom(normal: NFormCnt | undefined, manual: MFormCnt | undefined): Atom<FieldRowCtx[]> {
    const rv = atom<FieldRowCtx[]>(
        (get) => {
            let fields: FieldRowCtx[] | undefined;
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
