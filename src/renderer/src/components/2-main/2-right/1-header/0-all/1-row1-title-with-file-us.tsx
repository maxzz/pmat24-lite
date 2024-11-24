import { useAtomValue } from "jotai";
import { FileUs } from "@/store/store-types";
import { Row2AppIcons } from "./2-row2-1-file-icons";
import { Row2Explanation } from "./2-row2-2-file-explanation";
import { Row3FnameParts } from "./2-row3-filename-parts";

export function TitleWithFileUs({ fileUs }: { fileUs: FileUs; }) {
    return (
        <div className="py-1 text-muted-foreground space-y-1.5 cursor-default">

            <Row1ChooseName fileUs={fileUs} />

            <div className="flex items-center gap-1.5">
                <Row2AppIcons fileUs={fileUs} />
                <Row2Explanation fileUs={fileUs} />
            </div>

            <Row3FnameParts fname={fileUs.fileCnt.fname} />
        </div>
    );
}

function Row1ChooseName({ fileUs }: { fileUs: FileUs; }) {
    const chooseName = useAtomValue(fileUs.parsedSrc.stats.loginFormChooseNameAtom)
    return (
        <div className="pl-1 text-sm font-semibold" title="Name from manifest file">
            {chooseName}
        </div>
    );
}
