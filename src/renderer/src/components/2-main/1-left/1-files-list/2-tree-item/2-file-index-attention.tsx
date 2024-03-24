import { FileUs } from "@/store/store-types";
import { isAnyWhy } from "@/store/store-utils";
import { CardTitleFileIndex } from "./1-file-index";
import { TooltipBody } from "./3-tooltip-body";
import { RealTooltip } from "./3-real-tooltip";

export function FileIndexAttention({ fileUs }: { fileUs: FileUs; }) {
    const hasBailOut = isAnyWhy(fileUs);
    const fileIndex = fileUs.idx + 1;
    if (!hasBailOut) {
        return <CardTitleFileIndex idx={fileIndex} />;
    }
    return (
        <RealTooltip
            trigger={
                <CardTitleFileIndex idx={fileIndex} errors={true} />
            }
            body={
                <TooltipBody fileUs={fileUs} fileIndex={fileIndex} />
            }
        />
    );
}
