import { useAtomValue } from "jotai";
import { type FileUs } from "@/store/store-types";

export function Row1ChooseName({ fileUs }: { fileUs: FileUs; }) {
    const chooseName = useAtomValue(fileUs.parsedSrc.stats.loginFormChooseNameAtom)
    return (
        <div className="pl-1 text-sm font-semibold" title="Name from manifest file">
            {chooseName}
        </div>
    );
}
