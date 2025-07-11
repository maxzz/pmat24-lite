import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { FieldTyp, FormIdx } from "@/store/manifest";
import { appSettings, type FceItem } from "@/store";
import { type FileUsCtx, type ManualFieldState } from "@/store/1-atoms/2-file-mani-atoms";
import { InputLabel } from "../8-props-ui";
import { Column5_Catalog } from "../../../../1-normal/1-fields";
import { Case_LinkToLoginForm, Case_ManualFieldPolicyBtn } from "./6-row-2-col-2-policy-or-link";
import { Col_ManualFieldValue } from "./5-row-2-col-1-value";

export function SecondRow({ item, fileUsCtx }: { item: ManualFieldState.CtxFld; fileUsCtx: FileUsCtx; }) {
    const { fcAllowed } = useSnapshot(appSettings.files.shownManis);
    
    const isPsw = useAtomValue(item.rowCtx.typeAtom) === FieldTyp.psw;
    //item.rowCtx.isCpassForm && isPsw && console.log(`SecondRow: formIdx:${fileUsCtx.formIdx} isCpassForm:${item.rowCtx.isCpassForm}`);

    const containerClasses =
        fcAllowed
            ? isPsw
                ? "grid-cols-[1fr,1fr,auto]"
                : "grid-cols-[1fr,auto]"
            : isPsw
                ? "grid-cols-[1fr,auto]"
                : "grid-cols-[auto]";

    return (
        <div className={classNames("grid", containerClasses)}>
            <InputLabel label="Value">
                <Col_ManualFieldValue item={item} fileUsCtx={fileUsCtx} />
            </InputLabel>

            {fcAllowed && (
                <InputLabel label="Catalog" className="ml-2">
                    <Column5_Catalog
                        rowCtx={item.rowCtx}
                        fileUsCtx={fileUsCtx}
                        onSelectCatItem={function onSelectCatItem(item: FceItem | undefined) { /*TODO:*/ }}
                    />
                </InputLabel>
            )}

            {isPsw && (
                fileUsCtx.formIdx === FormIdx.login
                    ? (
                        <InputLabel label="Policy" className="ml-2">
                            <Case_ManualFieldPolicyBtn rowCtx={item.rowCtx} />
                        </InputLabel>
                    )
                    : (
                        <InputLabel label="Link to login form" className="ml-2 min-w-32">
                            <Case_LinkToLoginForm rowCtx={item.rowCtx} fileUsCtx={fileUsCtx} />
                        </InputLabel>
                    )
            )}
        </div>
    );
}
