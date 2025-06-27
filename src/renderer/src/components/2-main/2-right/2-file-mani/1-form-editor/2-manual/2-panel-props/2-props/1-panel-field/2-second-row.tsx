import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { FieldTyp, FormIdx } from "@/store/manifest";
import { appSettings, type FceItem } from "@/store";
import { type FileUsCtx, type ManualFieldState } from "@/store/1-atoms/2-file-mani-atoms";
import { InputLabel } from "../8-props-ui";
import { Column5_Catalog } from "../../../../1-normal/1-fields";
import { Case_LinkToLoginForm, Case_ManualFieldPolicyBtn } from "./6-col-policy-or-link";
import { Col_ManualFieldValue } from "./5-col-value";

export function SecondRow({ item, fileUsCtx }: { item: ManualFieldState.CtxFld; fileUsCtx: FileUsCtx; }) {
    const { fcAllowed } = useSnapshot(appSettings.files.shownManis);
    const isFieldPsw = useAtomValue(item.rowCtx.typeAtom) === FieldTyp.psw;

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
                <Col_ManualFieldValue item={item} fileUsCtx={fileUsCtx} />
            </InputLabel>

            {fcAllowed && (
                <InputLabel label="Catalog">
                    <Column5_Catalog
                        rowCtx={item.rowCtx}
                        fileUsCtx={fileUsCtx}
                        onSelectCatItem={function onSelectCatItem(item: FceItem | undefined) {/*TODO:*/ }}
                    />
                </InputLabel>
            )}

            {isFieldPsw && (
                fileUsCtx.formIdx === FormIdx.login
                    ? (
                        <InputLabel label="Policy">
                            <Case_ManualFieldPolicyBtn item={item} />
                        </InputLabel>
                    )
                    : (
                        <InputLabel label="Link to login form" className="min-w-32">
                            <Case_LinkToLoginForm item={item} fileUsCtx={fileUsCtx} />
                        </InputLabel>
                    )
            )}
        </div>
    );
}
