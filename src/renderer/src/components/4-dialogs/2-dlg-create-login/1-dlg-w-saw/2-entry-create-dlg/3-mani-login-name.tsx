import { useAtomValue } from "jotai";
import { type RowInputStateAtom, InputOrCheckWithErrorMsg } from "@/ui/local-ui";
import { newManiDispNameAtom } from "@/store/1-atoms/2-file-mani-atoms/0-all-serve-atoms";

export function ManiLoginNameGuarded() {
    const nameAtom = useAtomValue(newManiDispNameAtom);
    if (!nameAtom) {
        return null;
    }
    return (
        <ManiLoginName nameAtom={nameAtom} />
    );
}

function ManiLoginName({ nameAtom }: { nameAtom: RowInputStateAtom; }) {
    return (
        <div className="px-3 pb-2 text-xs flex flex-col gap-1">
            <div className="font-semibold">
                Login name
            </div>
            <InputOrCheckWithErrorMsg stateAtom={nameAtom} />
        </div>
    );
}
