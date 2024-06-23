import { useAtomValue } from "jotai";
import { FileUs } from "@/store/store-types";
import { OptionsContent } from "./1-tab-all-options";

export function TabFormOptions({ fileUs }: { fileUs: FileUs; }) {

    const maniAtoms = useAtomValue(fileUs.maniAtomsAtom);
    if (!maniAtoms) {
        return null;
    }

    return (
        <div className="flex flex-col gap-1">
            <OptionsContent maniAtoms={maniAtoms} />
        </div>
    );
}
