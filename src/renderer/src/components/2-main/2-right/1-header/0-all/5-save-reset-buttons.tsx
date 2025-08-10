import { useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { doResetOrDiscardOneAtom, doSaveOneAtom } from "@/store/1-atoms/2-file-mani-atoms/0-all-serve-atoms";
import { Button } from "@/ui";
import { FileUs, FileUsAtom } from "@/store/store-types";

export function SaveResetButtons({ fileUs, fileUsAtom }: { fileUs: FileUs; fileUsAtom: FileUsAtom; }) {
    const doSaveOne = useSetAtom(doSaveOneAtom);
    const doReset = useSetAtom(doResetOrDiscardOneAtom);

    const hasChanges = !!useSnapshot(fileUs.fileCnt.changesSet).size;
    if (!hasChanges) {
        return null;
    }

    const isNewFile = fileUs.fileCnt.newFile;

    return (<>
        <Button className="active:scale-[.97]" title="Reset file changes" onClick={() => doReset(fileUsAtom)}>
            {isNewFile ? 'Discard' : 'Reset'}
        </Button>

        <Button className={saveButtonClasses} title="Save file changes" onClick={() => doSaveOne({ fileUsAtom })}>
            Save
        </Button>
    </>);
}

const saveButtonClasses = "text-background bg-orange-600 dark:bg-orange-400 hover:bg-orange-500 active:scale-[.97]";
