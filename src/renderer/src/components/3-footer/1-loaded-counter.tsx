import { treeFilesAtom } from "@/store";
import { useAtomValue } from "jotai";

export function LoadedCounter() {
    const treeFiles = useAtomValue(treeFilesAtom);
    if (!treeFiles?.length) {
        return <div></div>;
    }

    const suffix = ` file${treeFiles.length > 1 ? 's' : ''}`;
    return (
        <div className="text-[.65rem] leading-5 text-muted-foreground">
            loaded{' '}

            <span className="text-text/60">
                {treeFiles.length}
            </span>

            {suffix}
        </div>
    );
}
