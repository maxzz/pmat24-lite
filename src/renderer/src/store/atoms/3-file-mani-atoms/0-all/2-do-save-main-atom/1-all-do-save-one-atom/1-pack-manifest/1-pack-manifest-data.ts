import { type PackManifestDataParams } from "../../0-pack/9-types";
import { packNormalFields, packOptions } from "../../0-pack";

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
