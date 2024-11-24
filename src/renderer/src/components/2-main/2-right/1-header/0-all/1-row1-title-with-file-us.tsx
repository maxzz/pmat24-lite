import { useAtomValue } from "jotai";
import { type FileUs } from "@/store/store-types";

export function Row1ChooseName({ fileUs }: { fileUs: FileUs; }) {

    let chooseName = useAtomValue(fileUs.parsedSrc.stats.loginFormChooseNameAtom);

    if (fileUs.parsedSrc.stats.isFCat) {
        const isMaster = fileUs.fceAtoms?.viewFceCtx?.isMaster;
        chooseName = `${isMaster ? 'Primary' : 'Secondary'} Field Catalog`;
    }

    return (
        <div className="pl-1 text-sm font-semibold" title="Name from manifest file">
            {chooseName}
        </div>
    );
}
