import { useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { Button } from "@/ui";
import { type FileUs, type FileUsAtom } from "@/store/store-types";
import { doResetOrDiscardOneAtom, doSaveOneAtom } from "@/store/0-serve-atoms";

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
