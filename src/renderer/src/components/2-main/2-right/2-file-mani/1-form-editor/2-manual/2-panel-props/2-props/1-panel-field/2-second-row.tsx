import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { appSettings } from "@/store";
import { FieldTyp, FormIdx } from "@/store/manifest";
import { type FileUsCtx, type ManualFieldState } from "@/store/1-atoms/2-file-mani-atoms";
import { InputLabel } from "../8-props-ui";
import { Case_LinkToLoginForm, Case_ManualFieldPolicyBtn } from "./6-col-policy-or-link";
import { Col_ManualFieldValue } from "./5-col-value";
import { Col_FiledCatalog } from "./7-col-field-catalog";

export function SecondRow({ item, fileUsCtx }: { item: ManualFieldState.CtxFld; fileUsCtx: FileUsCtx; }) {
    const { fcAllowed } = useSnapshot(appSettings.files.shownManis);
    return (
        <div className={fcAllowed ? "grid grid-cols-[1fr,1fr,auto] gap-2" : "grid grid-cols-[1fr,auto] gap-2"}>
            <InputLabel label="Value">
                <Col_ManualFieldValue item={item} fileUsCtx={fileUsCtx} />
            </InputLabel>

            <Col_FiledCatalog item={item} fileUsCtx={fileUsCtx} />

            <Col_PolicyOrLink item={item} fileUsCtx={fileUsCtx} />
        </div>
    );
}

export function Col_PolicyOrLink({ item, fileUsCtx }: { item: ManualFieldState.CtxFld; fileUsCtx: FileUsCtx; }) {
    const isFieldPsw = useAtomValue(item.rowCtx.typeAtom) === FieldTyp.psw;
    if (!isFieldPsw) {
        return null;
    }

    return (<>
        {fileUsCtx.formIdx === FormIdx.login
            ? (
                <InputLabel label="Policy">
                    <Case_ManualFieldPolicyBtn item={item} />
                </InputLabel>
            )
            : (
                <InputLabel label="Link to login form" labelClasses="pb-0.5" className="min-w-32">
                    <Case_LinkToLoginForm item={item} fileUsCtx={fileUsCtx} />
                </InputLabel>
            )
        }
    </>);
}
