import { type Atom, atom, type Getter, type Setter } from "jotai";
import { FormIdx } from "@/store/manifest";
import { type FileUs, type FileUsAtom } from "@/store/store-types";
import { type MFormCnt, type NFormCnt, type FileUsCtx, type AnyFormCtx, type ManiAtoms, type FieldRowCtx } from "../../9-types";
import { NormalModeState } from "../../1-normal-fields";
import { ManualFieldsState } from "../../2-manual-fields";
import { OptionsState } from "../../4-options";

/**
 * @param embeddTo - if defined then new atoms will be added to existing ManiAtoms. This is used when we create new manifest and use it for cpass.
 * @returns 
 */
export function createManiAtoms({ fileUs, fileUsAtom, embeddTo, get, set }: { fileUs: FileUs; fileUsAtom: FileUsAtom; embeddTo?: ManiAtoms | undefined | null; get?: Getter; set?: Setter; }): ManiAtoms {
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
        if (!get || !set) {
            throw new Error('no.jotai');
        }
        const rv: any = embeddTo;
        const maniAtoms = rv as ManiAtoms;

        const initialFileUsCtx: FileUsCtx = { fileUs, fileUsAtom, formIdx: FormIdx.login };

        const loginFormCtx: AnyFormCtx | undefined = maniAtoms[FormIdx.login];
        if (!loginFormCtx) {
            throw new Error('no.loginFormCtx');
        }
        const cpassFormCtx: AnyFormCtx | undefined = createFormCtx(initialFileUsCtx, embeddTo);

        initialFileUsCtx.fileUs = loginFormCtx.fileUsCtx.fileUs;
        initialFileUsCtx.fileUsAtom = loginFormCtx.fileUsCtx.fileUsAtom;
        initialFileUsCtx.formIdx = FormIdx.cpass;

        rv[FormIdx.login] = loginFormCtx;
        rv[FormIdx.cpass] = cpassFormCtx;
        rv[FormIdx.login + 2] = loginFormCtx?.fieldsAtom || atom([]);
        rv[FormIdx.cpass + 2] = cpassFormCtx?.fieldsAtom || atom([]);

        printCreateManiAtoms(fileUsAtom, fileUs, maniAtoms);

        return embeddTo;
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
