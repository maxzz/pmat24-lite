import { type Atom, atom } from "jotai";
import { FormIdx } from "@/store/manifest";
import { type FileUs, type FileUsAtom } from "@/store/store-types";
import { type MFormCnt, type NFormCnt, type FileUsCtx, type AnyFormCtx, type ManiAtoms, type FieldRowCtx, safeByContext, cFieldsIdx, lFieldsIdx } from "../../9-types";
import { NormalModeState } from "../../1-normal-fields";
import { ManualFieldsState } from "../../2-manual-fields";
import { OptionsState } from "../../4-options";

/**
 * @param embeddTo - If defined then new atoms will be added to existing ManiAtoms. This is used when we create new manifest and use it for cpass.
 * NOTE: (*1) 
 *          We need to create login form context here because we need to get login form fields from fileUs.
 *          You can see that in ManualFieldsState.onChangeWithScope when active login the maniAtoms param has only one login form.
 *       (*2)
 *          We have reactive changes inside callback or when we use atoms. If we use atoms maniAtoms can be invalid 
 *          (maniAtomsAtom deleted on savebut render function will use old mFormProps. We call from updateManiAtomsAfterSaveOrReset() createManiAtoms and disposeFileUsManiAtoms).
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
        const rv: any = [...embeddTo]; // make result immutable to trigger rerender; ref to array should be defined ahead of time

        const cpassScope: FileUsCtx = { fileUs, fileUsAtom, formIdx: FormIdx.login };

        const loginFormCtx: AnyFormCtx = safeByContext(embeddTo[FormIdx.login]); // see note (*1)
        const cpassFormCtx: AnyFormCtx = safeByContext(createFormCtx(cpassScope, rv));

        cpassScope.fileUs = loginFormCtx.fileUsCtx.fileUs;
        cpassScope.fileUsAtom = loginFormCtx.fileUsCtx.fileUsAtom;
        cpassScope.formIdx = FormIdx.cpass;

        rv[FormIdx.login] = loginFormCtx;
        rv[FormIdx.cpass] = cpassFormCtx;
        rv[lFieldsIdx] = loginFormCtx.fieldsAtom || atom([]);
        rv[cFieldsIdx] = cpassFormCtx.fieldsAtom || atom([]);

        //printCreateManiAtoms(fileUsAtom, fileUs, maniAtoms);
        return rv;
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
        fieldsAtom: createFormFieldsAtom(normal, manual, formIdx),
        options: OptionsState.createAtoms(fileUsCtx, maniAtoms),
        fileUsCtx: fileUsCtx,
    };

    return rv;
}

function createFormFieldsAtom(normal: NFormCnt | undefined, manual: MFormCnt | undefined, formIdx: FormIdx): Atom<FieldRowCtx[]> {
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
                                printFormField(formIdx, get(chunk.rowCtx.labelAtom), chunk.rowCtx.metaField.uuid);
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

function printFormField(formIdx: FormIdx, label: string, uuid: number) {
    console.log(`👀 FormField: ${!formIdx ? 'login' : 'cpass'}.'${label}' uuid:${uuid}`);
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
