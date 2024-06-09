import { useAtom } from "jotai";
import { Poli } from "@/store/manifest";
import { PolicyDlgConv } from "../0-all";
import { Radio } from "../9-constrols";

export function SectionGenerationBy({ dlgUiAtoms }: { dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms; }) {
    const [useAs, setUseUs] = useAtom(dlgUiAtoms.useAsAtom);
    return (
        <div className="mt-2 grid space-y-2">
            <Radio name="gen-type" checked={useAs === `${Poli.UseAs.verify}`} onChange={() => setUseUs(`${Poli.UseAs.verify}`)}>
                The user will enter a password
            </Radio>

            <Radio name="gen-type" checked={useAs === `${Poli.UseAs.generate}`} onChange={() => setUseUs(`${Poli.UseAs.generate}`)}>
                The password manager will generate a password
            </Radio>
        </div>
    );
}
