import { atom, type Getter, type Setter } from "jotai";
import type { FileUs } from "@/store/store-types";

export const doSaveFileUsToFsAtom = atom(null,
    (get, set, fileUs: FileUs) => {
        try {
            saveFileUsToFs(fileUs, get, set);
        } catch (error) {
            console.error(error);
        }
    }
);

function saveFileUsToFs(fileUs: FileUs, get: Getter, set: Setter) {
    const { fileCnt } = fileUs;
    
    const filePath = `${fileCnt.fpath}/${fileCnt.fname}`;

    const cnt = fileCnt.raw; //TODO: get content from fileUs

    console.log('saveFileToFs', filePath, cnt);

    // const filePath = path.join(fpath, fname);
    // fs.writeFile(filePath, raw, (err) => {
    //     if (err) {
    //         console.error(err);
    //     }
    // });
}
