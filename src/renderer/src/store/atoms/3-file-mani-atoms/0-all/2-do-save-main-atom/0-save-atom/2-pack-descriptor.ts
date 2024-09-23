import { createGuid} from "@/store/manifest";
import { PackManifestDataParams } from "../2-pack";
import { TimeUtils } from "./temp";

export function packDescriptor(packParams: PackManifestDataParams) {
    const { newMani } = packParams;

    const { fileUs } = packParams;

    // const createdDate = Date.now();
    // const createdDate = fileUs.mani?.descriptor?.created || Date.now();
    // const createdDate = fileUs.mani?.descriptor?.created || "1d43331 1aaabb19";

    const now = TimeUtils.dateToFileTime(new Date());
    const hex = now.toString(16);
    const str = hex.slice(0, 7) + ' ' + hex.slice(7);
    console.log(`now: ${now}, hex: ${hex}, str: ${str} ui: "${TimeUtils.dpTimeToShow(str)}"`); // now: 133716029940500000, hex: 1db0e0551610620, str: 1db0e05 51610620 ui: "09.23.2024 03:09:54 PM"

    console.log(`date 1: "${TimeUtils.dpTimeToShow("1d43331 1aaabb19")}"`);                    // "08.13.2018 11:11:49 AM"
    console.log(`date 2: "${TimeUtils.dpTimeToShow(TimeUtils.dateToFileTime(new Date()))}"`);  // "09.23.2024 02:33:31 PM"
    console.log(`date 3: "${TimeUtils.fileTimeToDate("1d43331 1aaabb19")}"`);                  // "Mon Aug 13 2018 11:11:49 GMT-0700 (Pacific Daylight Time)"
    console.log(`date 4: "${TimeUtils.fileTimeToDate()}"`);                                    // "Mon Sep 23 2024 14:33:31 GMT-0700 (Pacific Daylight Time)"

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
