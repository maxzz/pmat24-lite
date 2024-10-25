import { treeFilesAtom } from "@/store";
import { useAtomValue } from "jotai";

export function LoadedCounter() {
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

function SubSection({label, counter}: {label: string; counter: number}) {

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
