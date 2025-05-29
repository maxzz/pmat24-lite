import { atom } from "jotai";
import { type FileUs } from "@/store/store-types";
import { FormIdx } from "@/store/manifest";
import { type GetTargetWindowResult, type TlwInfo } from "@shared/ipc-types";
import { invokeMainTyped } from "@/xternal-to-main";

export async function findHwnd({caption, classname}: { caption: string; classname: string; }): Promise<TlwInfo | undefined> {
    // 1. get all tlw infos
    const infosStr = await invokeMainTyped({ type: 'r2mi:get-tlw-infos' });
    const infos = JSON.parse(infosStr || '[]') as TlwInfo[];

    console.log(`Infos`, JSON.stringify(infos, null, 2));

    const rv = infos.find((item) => item.caption === caption && item.classname === classname);
    return rv;
}

export const doFindHwndAtom = atom(
    null,
    async (get, set, { fileUs, formIdx }: { fileUs: FileUs; formIdx: FormIdx; }): Promise<void> => {
        const formAtoms = fileUs.maniAtomsAtom[formIdx];
        const options = formAtoms?.options;
        if (!options) {
            console.log('no options');
            return;
        }

        const isWeb = get(options.isWebAtom);
        if (isWeb) {
            return;
        }

        const caption = get(options.captionAtom);
        if (!caption) {
            console.log('no caption');
            return;
        }

        const classname = get(options.classnameAtom);
        if (!classname) {
            console.log('no classname');
            return;
        }

        // const hwnd: TlwInfo = ;

        // const hwnd: GetTargetWindowResult = { hwnd: '000000000014103E', caption, classname, isBrowser: false };


        //const options 
        // // const rv = await findHwnd(hwnd);
        // console.log('findHwnd', rv);
    }
);
