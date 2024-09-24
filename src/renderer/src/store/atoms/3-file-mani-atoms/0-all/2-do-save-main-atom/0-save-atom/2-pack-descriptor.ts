import { createGuid, Mani, TimeUtils } from "@/store/manifest";
import { PackManifestDataParams } from "../2-pack";

export function packDescriptor(packParams: PackManifestDataParams) {
    const { newMani } = packParams;

    const { fileUs } = packParams;

    let descriptor = fileUs.mani?.descriptor;

    descriptor = descriptor
        ? { ...descriptor, }
        : { id: `{${createGuid()}}`, created: TimeUtils.timeNowAsDpTime(), } as Mani.Descriptor;

    descriptor.modified = TimeUtils.timeNowAsDpTime();
    descriptor.version = '2.4.5';

    newMani.descriptor = descriptor;

    fileUs.mani?.options && (newMani.options = fileUs.mani.options);
}
