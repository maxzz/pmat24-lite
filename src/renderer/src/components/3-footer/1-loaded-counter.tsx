import { totalManis, treeFilesAtom } from "@/store";
import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";

export function LoadedCounterNun() {
    const treeFiles = useAtomValue(treeFilesAtom);

    if (!treeFiles?.length) {
        return <div className="text-[.65rem]">No files loaded</div>;
    }

    const suffix = ` file${treeFiles.length > 1 ? 's' : ''}`;
    return (
        <div className="text-[.65rem] leading-5 text-muted-foreground">
            Loaded{' '}

            <span className="text-text/60">
                {treeFiles.length}
            </span>

            {suffix}
        </div>
    );
}

export function LoadedCounter() {
    const treeFiles = useAtomValue(treeFilesAtom);

    if (!treeFiles?.length) {
        return <div className="text-[.65rem]">No files loaded</div>;
    }

    const { normal, manual, empty } = useSnapshot(totalManis);

    const suffix = ` file${treeFiles.length > 1 ? 's' : ''}`;
    return (
        <div className="text-[.65rem] leading-5 text-muted-foreground flex items-center gap-1">
            Loaded{' '}

            <span className="text-text/60">
                {treeFiles.length}
            </span>

            {suffix}

            {' ('}
            {subCounter('normal:', normal)}
            {', '}
            {subCounter('manual:', manual)}
            {', '}
            {subCounter('empty:', empty)}
            {')'}
            {/* <SubSection label="normal" counter={normal} />
            <SubSection label="manual" counter={manual} />
            <SubSection label="empty" counter={empty} /> */}
            {')'}
        </div>
    );
}

function subCounter(label: string, counter: number, doSuffix: boolean = false): string {
    return `${label} ${counter} ${doSuffix ? `file${counter > 1 ? 's' : ''}`:''}`;
}


function SubSection({ label, counter }: { label: string; counter: number; }) {

    const suffix = ` file${counter > 1 ? 's' : ''}`;
    return (
        <div className="text-[.65rem] leading-5 text-muted-foreground">
            {label}{' '}

            <span className="text-text/60">
                {counter}
            </span>

            {suffix}
        </div>
    );
}
