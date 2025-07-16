import { debounce } from "@/utils";
import { type FileUsCtx, type OnChangeProps, fileUsChanges, safeByContext, safeManiAtomsFromFileUsCtx } from "../../9-types";
import { type SubmitFieldTypes, SubmitConv } from "../2-conv-submit";

export namespace NormalSubmitState {

    export function createSubmitCnt(fileUsCtx: FileUsCtx): SubmitFieldTypes.Ctx {
        const { fileUs, formIdx } = fileUsCtx;
        const metaForm = safeByContext(fileUs?.parsedSrc?.meta)[formIdx] || []; // We are under createFormAtoms umbrella
        const forAtoms = SubmitConv.forAtoms(metaForm);

        const debouncedOnChangeWithScope = debounce(onChangeWithScope);

        const onChange = ({ get, set }) => {
            debouncedOnChangeWithScope({ fileUsCtx, get, set });
        };

        const rv: SubmitFieldTypes.Ctx = {
            ...SubmitConv.createAtoms(forAtoms, onChange),
            isWeb: !!metaForm?.mani.detection.web_ourl,
            metaForm,
            fromFile: forAtoms,
        };

        return rv;
    }

} //namespace NormalSubmitState

// Callback

function onChangeWithScope({ fileUsCtx, get, set }: OnChangeProps) {
    const nFormCtx = safeManiAtomsFromFileUsCtx(fileUsCtx, get)[fileUsCtx?.formIdx]?.normal;
    if (!nFormCtx) {
        return;
    }

    const atoms: SubmitFieldTypes.Ctx = nFormCtx.submitCtx;
    const fromUi = SubmitConv.fromAtoms(atoms, get, set);
    const changed = !SubmitConv.areTheSame(fromUi, atoms.fromFile);

    fileUsChanges.set(fileUsCtx, changed, `${fileUsCtx.formIdx ? 'c' : 'l'}-submit`);
}

