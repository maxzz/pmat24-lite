import { useAtomValue } from "jotai";
import { type FileUs } from "@/store/store-types";

export function Row1ChooseName({ fileUs }: { fileUs: FileUs; }) {
    return (<>
        {fileUs.parsedSrc.stats.isFCat
            ? <FcName fileUs={fileUs} />
            : <ManiName fileUs={fileUs} />}
    </>);
}

function ManiName({ fileUs }: { fileUs: FileUs; }) {
    const chooseName = useAtomValue(fileUs.parsedSrc.stats.loginFormChooseNameAtom);
    return (
        <div className="pl-1 text-sm font-semibold" title="Name from manifest file">
            {chooseName}
        </div>
    );
}

function FcName({ fileUs }: { fileUs: FileUs; }) {
    const isMaster = fileUs.fceAtoms?.viewFceCtx?.isMaster;
    const hint = isMaster ? '' : 'The active field catalog is located at the root of the open folder \nand has the file name "field_catalog.dpn".';
    return (
        <div className="text-sm font-semibold" title="Name from manifest file">
            Field Catalog
            {' '}
            <span className="text-xs font-normal text-orange-500 dark:text-yellow-500" title={hint}>
                {isMaster ? '' : '(inactive)'}
            </span>
        </div>
    );
}