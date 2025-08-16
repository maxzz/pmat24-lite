import { useAtom, useAtomValue } from "jotai";
import { type FormIdx, type Meta } from "@/store/manifest";
import { type NFormProps, type NFormCnt } from "@/store/2-file-mani-atoms";
import { RadioGroup } from "./3-nun-radio-group-for";

export function TabSubmitOld({ nFormCtx, formIdx }: NFormProps & { formIdx: FormIdx; }) {
    const metaForm = nFormCtx.fileUsCtx.fileUs.parsedSrc.meta?.[formIdx]!; // We are under FormEditor umbrella, so we can safely use ! here
    return (
        <div className="px-1">
            <ManiSection2_Submit nFormCnt={nFormCtx.normal} metaForm={metaForm} />
        </div>
    );
}

function ManiSection2_Submit({ nFormCnt, metaForm }: { nFormCnt: NFormCnt; metaForm: Meta.Form; }) {

    const buttonNameItems = useAtomValue(nFormCnt.submitCtx.buttonNameItemsAtom);
    const buttonNameStrings = buttonNameItems.map(({ name }) => name);
    const [selected, setSelected] = useAtom(nFormCnt.submitCtx.selectedAtom);

    return (
        <RadioGroup
            items={buttonNameStrings}
            groupName={`submit-form-${metaForm?.type}`}
            selected={selected}
            setSelected={setSelected}
        />
    );
}
