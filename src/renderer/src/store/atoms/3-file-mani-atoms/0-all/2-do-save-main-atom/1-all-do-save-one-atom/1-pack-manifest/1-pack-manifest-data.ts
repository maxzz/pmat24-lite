import { type PackManifestDataParams } from "./9-types";
import { packNormalFields } from "./11-pack-normal-fields";
import { packOptions } from "./33-pack-options";

export function packManifestData(packParams: PackManifestDataParams) {
    const { maniAtoms } = packParams;

    const [loginFormAtoms, cpassFormAtoms] = maniAtoms;

    if (loginFormAtoms) {
        if (loginFormAtoms.normal) {
            packNormalFields(loginFormAtoms.normal, packParams);
        }
        packOptions(loginFormAtoms.options, packParams);
    }

    if (cpassFormAtoms) {
        if (cpassFormAtoms.normal) {
            packNormalFields(cpassFormAtoms.normal, packParams);
        }
        packOptions(cpassFormAtoms.options, packParams);
    }

    // 4. The rest
}
