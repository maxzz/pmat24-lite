import { useAtomValue } from "jotai";
import { InputWTooltip } from "@/components/2-main/2-right/2-file-mani/2-form-options/9-controls";
import { newManiDispNameAtom } from "@/store";

export function ManiLoginName() {
    
    const nameAtom = useAtomValue(newManiDispNameAtom);
    if (!nameAtom) {
        return null;
    }

    return (
        <div className="px-3 pb-2 text-xs flex flex-col gap-1">
            <div className="font-semibold">
                Login name
            </div>
            <InputWTooltip stateAtom={nameAtom} />
        </div>
    );
}
