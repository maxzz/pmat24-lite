import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { rootDir, totalManis, treeFilesAtom } from "@/store";

export function LoadedCounter() {
    const treeFiles = useAtomValue(treeFilesAtom);
    const dir = useSnapshot(rootDir);
    const { normal, manual, empty, fc } = useSnapshot(totalManis);

    if (!treeFiles?.length) {
        return (
            <div className="text-[.65rem]">
                {dir.fpath
                    ? 'There are no files in the folder'
                    : 'No open folder'
                }
            </div>
        );
    }

    const total = plural('Loaded:', treeFiles.length, true);
    const subs = ` ( ${plural('normal:', normal)}, ${plural('manual:', manual)}, ${plural('empty:', empty)}, ${plural('field catalog:', fc)})`;
    const final = `${total}${subs}`;

    return (
        <div className="text-[.65rem] leading-5 text-muted-foreground flex items-center gap-1 select-none">
            {final}
        </div>
    );
}

function plural(label: string, counter: number, doSuffix: boolean = false): string {
    return `${label} ${counter} ${doSuffix ? `file${counter > 1 ? 's' : ''}` : ''}`;
}
