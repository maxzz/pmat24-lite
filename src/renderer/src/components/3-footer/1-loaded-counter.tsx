import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { appSettings, filesAtom, rootDir, searchFilterData, totalManis } from "@/store";

export function LoadedCounter() {

    const files = useAtomValue(filesAtom);
    const dir = useSnapshot(rootDir);
    const filterText = useAtomValue(searchFilterData.textAtom);
    const { normal, manual, empty, fc } = useSnapshot(totalManis);

    const { fcAllowed } = useSnapshot(appSettings.files.shownManis);

    if (!files?.length) {
        return (
            <div className="text-[.65rem]">
                {dir.fpath
                    ? 'There are no files in the folder'
                    : 'No open folder'
                }
            </div>
        );
    }

    const total = plural('Loaded:', files.length, true);
    const fieldCat = fcAllowed ? `, ${plural('field catalog:', fc)}` : '';
    const subs = ` (${plural('normal:', normal)}, ${plural('manual:', manual)}, ${plural('empty:', empty)}${fieldCat})`;
    const filter = filterText ? ` Filter: "${filterText}"` : '';
    const final = `${total}${subs}${filter}`;

    return (
        <div className="text-[.65rem] leading-5 text-muted-foreground flex items-center gap-1 select-none">
            {final}
        </div>
    );
}

function plural(label: string, counter: number, doSuffix: boolean = false): string {
    return `${label} ${counter} ${doSuffix ? `file${counter > 1 ? 's' : ''}` : ''}`;
}
