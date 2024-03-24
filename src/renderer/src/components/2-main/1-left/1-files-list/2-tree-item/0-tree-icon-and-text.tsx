import { useAtomValue } from "jotai";
import { TreeIconAndTextProps, TreenIconType } from "@ui/shadcn/tree";
import { treeItemToFileUs } from "../1-files-tree";
import { FileIndexAttention } from "./2-file-index-attention";
import { FileUs } from "@/store/store-types";
import { isAnyWhy } from "@/store/store-utils";
import { CardTitleFileIndex } from "./1-file-index";
import { RealTooltip } from "./3-real-tooltip";
import { TooltipBody } from "./3-tooltip-body";

// export function FileNameAttention({ fileUs }: { fileUs: FileUs; }) {
//     const hasBailOut = isAnyWhy(fileUs);
//     const fileIndex = fileUs.idx + 1;
//     if (!hasBailOut) {
//         return <CardTitleFileIndex idx={fileIndex} />;
//     }
//     return (
//         <RealTooltip
//             trigger={
//                 <CardTitleFileIndex idx={fileIndex} errors={true} />
//             }
//             body={
//                 <TooltipBody fileUs={fileUs} fileIndex={fileIndex} />
//             }
//         />
//     );
// }

export function FileNameAttention({ IconToRender, name, fileUs, iconClasses }: { fileUs: FileUs; IconToRender: false | TreenIconType | undefined; name: string; iconClasses: string; }) {
    const hasBailOut = isAnyWhy(fileUs);
    const fileIndex = fileUs.idx + 1;

    const Body = (<>
        {IconToRender && <IconToRender className={iconClasses} aria-hidden="true" />}

        <span className="flex-grow truncate">
            {name}
        </span>
    </>);

    if (!hasBailOut) {
        return Body;
    }
    return (
        <RealTooltip
            trigger={
                Body
            }
            body={
                <TooltipBody fileUs={fileUs} fileIndex={fileIndex} />
            }
        />
    );
}

export function TreeIconAndText({ item, Icon, iconClasses, hideFolderIcon }: TreeIconAndTextProps) {
    const fileUsItem = treeItemToFileUs(item);
    const fileUs = useAtomValue(fileUsItem.fcnt);

    const IconToRender = item.icon || (!hideFolderIcon && Icon);
    return (<>
        <FileIndexAttention fileUs={fileUs} />

        <FileNameAttention fileUs={fileUs} IconToRender={IconToRender} name={item.name} iconClasses={iconClasses} />

        {/* {IconToRender && <IconToRender className={iconClasses} aria-hidden="true" />}

        <span className="flex-grow truncate">
            {item.name}
        </span> */}
    </>);
}
