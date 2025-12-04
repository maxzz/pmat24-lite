import { useAtom } from "jotai";
import { Poli } from "@/store/8-manifest";
import { type PolicyDlgTypes } from "../0-all";
import { Radio } from "../9-constrols";

export function SectionGenerationBy({ dlgUiCtx }: { dlgUiCtx: PolicyDlgTypes.PolicyUiCtx; }) {
    const [useAs, setUseUs] = useAtom(dlgUiCtx.useAsAtom);
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
