import { type PrimitiveAtom, useAtomValue } from "jotai";
import { type RowInputState } from "@/ui";
import { InputOrCheckWithTooltip } from "@/components/2-main/2-right/2-file-mani/2-form-options/9-controls";
import { newManiDispNameAtom } from "@/store";

export function ManiLoginNameGuarded() {
    const nameAtom = useAtomValue(newManiDispNameAtom);
    if (!nameAtom) {
        return null;
    }
    return (
        <ManiLoginName nameAtom={nameAtom} />
    );
}

function ManiLoginName({ nameAtom }: { nameAtom: PrimitiveAtom<RowInputState>; }) {
    return (
        <div className="px-3 pb-2 text-xs flex flex-col gap-1">
            <div className="font-semibold">
                Login name
            </div>
            <InputOrCheckWithTooltip stateAtom={nameAtom} />
        </div>
    );
}
