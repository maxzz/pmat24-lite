import { atom } from "jotai";
import { FormIdx } from "@/store/manifest";
import { type FileUs, type FileUsAtom } from "@/store/store-types";
import { type MFormCnt, type NFormCnt, type FileUsCtx, type AnyFormCtx, type ManiAtoms, safeByContext, lFieldsIdx, cFieldsIdx } from "../../9-types";
import { NormalModeState } from "../../1-normal-fields";
import { ManualFieldsState } from "../../2-manual-fields";
import { createFormFieldsAtom } from "../../4-cpass-to-login-links";
import { OptionsState } from "../../3-options";

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

        const loginFormCtx = createFormCtx({ fileUs, fileUsAtom, formIdx: FormIdx.login });
        const cpassFormCtx = createFormCtx({ fileUs, fileUsAtom, formIdx: FormIdx.cpass });

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
        const cpassFormCtx: AnyFormCtx = safeByContext(createFormCtx(cpassScope));

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

function createFormCtx(fileUsCtx: FileUsCtx): AnyFormCtx | undefined {

    const { fileUs, formIdx } = fileUsCtx;
    const metaForm = fileUs.parsedSrc.meta?.[formIdx]; // This is parent's umbrella, so we can safely use ! enywhere under it
    if (!metaForm) {
        return;
    }

    let normal: NFormCnt | undefined;
    let manual: MFormCnt | undefined;

    if (metaForm.disp.isScript) {
        manual = ManualFieldsState.createManualFormCnt(fileUsCtx);
    } else {
        normal = NormalModeState.createNormalFormCnt(fileUsCtx);
    }
    //console.log(`%c🥑 createFormFieldsAtom ${formIdx ? 'cpass' : 'login'} normal:%o manual:%o`, 'color: magenta', normal, manual);

    const rv: AnyFormCtx = {
        normal,
        manual,
        fieldsAtom: createFormFieldsAtom(normal, manual, formIdx),
        options: OptionsState.createAtoms(fileUsCtx),
        fileUsCtx: fileUsCtx,
    };

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
