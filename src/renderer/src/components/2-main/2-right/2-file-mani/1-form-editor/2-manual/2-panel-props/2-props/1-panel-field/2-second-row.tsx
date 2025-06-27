import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { appSettings } from "@/store";
import { FieldTyp, FormIdx } from "@/store/manifest";
import { type FileUsCtx, type ManualFieldState } from "@/store/1-atoms/2-file-mani-atoms";
import { InputLabel } from "../8-props-ui";
import { Case_LinkToLoginForm, Case_ManualFieldPolicyBtn } from "./6-col-policy-or-link";
import { Col_ManualFieldValue } from "./5-col-value";
import { Col_FiledCatalog } from "./7-col-field-catalog";

export function SecondRow({ rowCtx, fileUsCtx }: { rowCtx: ManualFieldState.CtxFld; fileUsCtx: FileUsCtx; }) {
    const { fcAllowed } = useSnapshot(appSettings.files.shownManis);
    const isFieldPsw = useAtomValue(rowCtx.rowCtx.typeAtom) === FieldTyp.psw;

    const containerClasses =
        fcAllowed
            ? isFieldPsw
                ? "grid-cols-[1fr,1fr,auto]"
                : "grid-cols-[1fr,auto]"
            : isFieldPsw
                ? "grid-cols-[1fr,auto]"
                : "grid-cols-[auto]";

    return (
        <div className={classNames("grid gap-2", containerClasses)}>

            <InputLabel label="Value">
                <Col_ManualFieldValue item={rowCtx} fileUsCtx={fileUsCtx} />
            </InputLabel>

            <Col_FiledCatalog item={rowCtx} fileUsCtx={fileUsCtx} />

            {isFieldPsw && (
                <Col_PolicyOrLink rowCtx={rowCtx} fileUsCtx={fileUsCtx} />
            )}
        </div>
    );
}

function Col_PolicyOrLink({ rowCtx, fileUsCtx }: { rowCtx: ManualFieldState.CtxFld; fileUsCtx: FileUsCtx; }) {
    return (<>
        {fileUsCtx.formIdx === FormIdx.login
            ? (
                <InputLabel label="Policy">
                    <Case_ManualFieldPolicyBtn item={rowCtx} />
                </InputLabel>
            )
            : (
                <InputLabel label="Link to login form" className="min-w-32">
                    <Case_LinkToLoginForm item={rowCtx} fileUsCtx={fileUsCtx} />
                </InputLabel>
            )
        }
    </>);
}
