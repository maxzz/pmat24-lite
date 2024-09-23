import { createGuid } from "@/store/manifest";
import { PackManifestDataParams } from "../2-pack";

export function packDescriptor(packParams: PackManifestDataParams) {
    const { newMani } = packParams;

    const { fileUs } = packParams;

    const createdDate = fileUs.mani?.descriptor?.created || new Date().getTime();
    const modifiedDate = new Date().getTime();

    // let oldDescriptor = fileUs.mani?.descriptor;
    // if (!oldDescriptor) {
    //     oldDescriptor = {
    //         id: createGuid(),
    //         created: new Date().getTime(),
    //         modified: new Date().getTime(),
    //         version: '2.4.5', // Old PMAT created files with version 2.4.3
    //     };
    // }

    const newDescriptor = {
        ...fileUs.mani?.descriptor,
    };

}

// function makeGuid(): string {
//     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//         const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
//         return v.toString(16);
//     });
// }
