import { totalManis, treeFilesAtom } from "@/store";
import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";

export function LoadedCounter() {
    const treeFiles = useAtomValue(treeFilesAtom);

    const { normal, manual, empty, fc } = useSnapshot(totalManis);

    if (!treeFiles?.length) {
        return <div className="text-[.65rem]">No files loaded</div>;
    }

    const suffix = ` file${treeFiles.length > 1 ? 's' : ''}`;
    return (
        <div className="text-[.65rem] leading-5 text-muted-foreground flex items-center gap-1">
            Loaded{' '}

            <span className="text-text/60">
                {treeFiles.length}
            </span>

            {suffix}

            {' ( '}
            {subCounter('normal:', normal)}
            {', '}
            {subCounter('manual:', manual)}
            {', '}
            {subCounter('empty:', empty)}
            {', '}
            {subCounter('field catalog:', fc)}
            {')'}
        </div>
    );
}

function subCounter(label: string, counter: number, doSuffix: boolean = false): string {
    return `${label} ${counter} ${doSuffix ? `file${counter > 1 ? 's' : ''}`:''}`;
}
