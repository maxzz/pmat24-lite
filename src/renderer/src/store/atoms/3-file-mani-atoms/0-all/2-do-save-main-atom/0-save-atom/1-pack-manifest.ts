import { type PackManifestDataParams, packManualFields, packNormalFieldsAndsubmit, packOptions } from "../2-pack";

export function packManifest(packParams: PackManifestDataParams) {
    
    const { maniAtoms } = packParams;
    const [loginFormAtoms, cpassFormAtoms] = maniAtoms;

    if (loginFormAtoms) {
        if (loginFormAtoms.normal) {
            packNormalFieldsAndsubmit(loginFormAtoms.normal, packParams);
        }
        if (loginFormAtoms.manual) {
            packManualFields(loginFormAtoms.manual, packParams);
        }
        packOptions(loginFormAtoms.options, packParams);
    }

    if (cpassFormAtoms) {
        if (cpassFormAtoms.normal) {
            packNormalFieldsAndsubmit(cpassFormAtoms.normal, packParams);
        }
        if (cpassFormAtoms.manual) {
            packManualFields(cpassFormAtoms.manual, packParams);
        }
        packOptions(cpassFormAtoms.options, packParams);
    }
}
