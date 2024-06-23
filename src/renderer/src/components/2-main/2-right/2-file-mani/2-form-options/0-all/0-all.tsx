import { useAtomValue } from "jotai";
import { FileUs } from "@/store/store-types";
import { OptionsContent } from "./1-tab-all-options";

export function TabFormOptions({ fileUs }: { fileUs: FileUs; }) {

    const maniAtoms = useAtomValue(fileUs.maniAtomsAtom);
    if (!maniAtoms) {
        return null;
    }

    const [login, cpass] = maniAtoms;

    if (!login && !cpass) {
        return (
            <div>
                No forms. It can be a manifest to exclude website support (It has to be no fields not forms).
            </div>
        );
    }

    return (
        <OptionsContent maniAtoms={maniAtoms} />
    );
}
