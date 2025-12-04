import { atom } from "jotai";
import { FormIdx } from "@/store/8-manifest";
import { hasMain } from "@/xternal-to-main";
import { type FileUs } from "@/store/store-types";
import { type TlwInfo } from "@shared/ipc-types";
import { asyncFindWindowByCaption } from "@/store/7-napi-atoms";

export const doFindHwndAtom = atom(
    null,
    async (get, set, { fileUs, formIdx }: { fileUs: FileUs; formIdx: FormIdx; }): Promise<TlwInfo | undefined> => {
        if (!hasMain()) {
            console.log('no.main');
            return;
        }

        const formAtoms = fileUs.maniAtomsAtom && get(fileUs.maniAtomsAtom)?.[formIdx];
        const options = formAtoms?.options;
        if (!options) {
            console.log('no.form');
            return;
        }

        const isWeb = get(options.isWebAtom);
        if (isWeb) {
            return;
        }

        const caption = get(options.p2Detect.captionAtom)?.data;
        if (!caption) {
            console.log('no caption');
            return;
        }

        const classname = get(options.p2Detect.dlg_classAtom)?.data;
        if (!classname) {
            console.log('no classname');
            return;
        }

        const rv = await asyncFindWindowByCaption({ caption, classname });
        return rv;
    }
);

//TODO: maybe use process name in addition to caption and classname
