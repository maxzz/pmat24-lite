import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { totalManis, treeFilesAtom } from "@/store";

export function LoadedCounter() {
    const treeFiles = useAtomValue(treeFilesAtom);
    const { normal, manual, empty, fc } = useSnapshot(totalManis);

    if (!treeFiles?.length) {
        return <div className="text-[.65rem]">No files loaded</div>;
    }

    const total = cunter('Loaded:', treeFiles.length, true);
    const subs = ` ( ${cunter('normal:', normal)}, ${cunter('manual:', manual)}, ${cunter('empty:', empty)}, ${cunter('field catalog:', fc)})`;
    const all = `${total}${subs}`;

    return (
        <div className="text-[.65rem] leading-5 text-muted-foreground flex items-center gap-1 select-none">
            {all}
        </div>
    );
}

function cunter(label: string, counter: number, doSuffix: boolean = false): string {
    return `${label} ${counter} ${doSuffix ? `file${counter > 1 ? 's' : ''}` : ''}`;
}
