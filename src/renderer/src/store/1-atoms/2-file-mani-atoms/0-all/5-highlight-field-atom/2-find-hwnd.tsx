import { atom } from "jotai";
import { errorToString } from "@/utils";
import { FormIdx } from "@/store/manifest";
import { hasMain, invokeMainTyped } from "@/xternal-to-main";
import { type FileUs } from "@/store/store-types";
import { type TlwInfo } from "@shared/ipc-types";
import { asyncGetTlwInfos } from "@/store/7-napi-atoms";

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

        const rv = await findHwnd({ caption, classname });
        return rv;
    }
);

async function findHwnd({ caption, classname }: { caption: string; classname: string; }): Promise<TlwInfo | undefined> {
    const rv = (await asyncGetTlwInfos()).find((item) => item.caption === caption && item.classname === classname);
    return rv;
}

async function findHwndHandle({ hwnd }: { hwnd: string; }): Promise<TlwInfo | undefined> {
    const rv = (await asyncGetTlwInfos()).find((item) => item.hwnd === hwnd);
    return rv;
}

//TODO: maybe use process name in addition to caption and classname
