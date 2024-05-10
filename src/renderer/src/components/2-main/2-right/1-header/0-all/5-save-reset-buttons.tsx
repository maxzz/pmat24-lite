import { useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { doResetOneAtom, doSaveOneAtom } from "@/store/atoms/3-file-mani-atoms";
import { Button } from "@/ui";
import { FileUs, FileUsAtom } from "@/store/store-types";

const saveButtonClasses = "text-background bg-orange-400 hover:bg-orange-500 active:scale-[.97]";

export function SaveResetButtons({ fileUs, fileUsAtom }: { fileUs: FileUs; fileUsAtom: FileUsAtom }) {
    const doSaveOne = useSetAtom(doSaveOneAtom);
    const doReset = useSetAtom(doResetOneAtom);

    const changes = useSnapshot(fileUs.changesSet);

    const hasChanges = !!changes.size;
    if (!hasChanges) {
        return null;
    }

    return (<>
        <Button className="active:scale-[.97]" title="Reset file changes" onClick={() => doReset(fileUsAtom)}>
            Reset
        </Button>

        <Button className={saveButtonClasses} title="Save file changes" onClick={() => doSaveOne(fileUsAtom)}>
            Save
        </Button>
    </>);
}
