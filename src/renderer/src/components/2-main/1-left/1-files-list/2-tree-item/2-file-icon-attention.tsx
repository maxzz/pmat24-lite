import { FileUs } from "@/store/store-types";
import { TreenIconType } from "@ui/shadcn/tree";
import { isAnyWhy } from "@/store/store-utils";
import { RealTooltip } from "./3-real-tooltip";
import { TooltipBody } from "./4-tooltip-body";

type FileIconAttentionProps = {
    fileUs: FileUs;
    IconToRender: false | TreenIconType | undefined;
    name: string;
    iconClasses: string;
};

export function FileIconAttention({ IconToRender, name, fileUs, iconClasses }: FileIconAttentionProps) {
    const hasBailOut = isAnyWhy(fileUs);
    const fileIndex = fileUs.idx + 1;

    const Body = (<>
        {IconToRender && (
            <IconToRender className={iconClasses} aria-hidden="true" />
        )}
    </>);

    if (!hasBailOut) {
        return Body;
    }

    return (
        <RealTooltip
            trigger={Body}
            body={<TooltipBody fileUs={fileUs} fileIndex={fileIndex} />}
        />
    );
}
