import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { FieldTyp, FormIdx } from "@/store/manifest";
import { type FileUsCtx, type ManualFieldState } from "@/store/1-atoms/2-file-mani-atoms";
import { type FieldRowCtx, type FceItem, useIsLinkedToLogin, appSettings } from "@/store";
import { InputLabel } from "../8-props-ui";
import { Case_LinkToLoginForm, Case_PswFieldPolicyBtn, Case_ValueForCpassPsw, Column4_Value, Column5_Catalog } from "../../../../1-normal/1-fields";

export function SecondRow({ item, fileUsCtx }: { item: ManualFieldState.CtxFld; fileUsCtx: FileUsCtx; }) {
    const { rowCtx } = item;
    const { fcAllowed } = useSnapshot(appSettings.files.shownManis);
    const isFieldPassword = useAtomValue(rowCtx.typeAtom) === FieldTyp.psw;

    const containerClasses =
        fcAllowed
            ? isFieldPassword
                ? "grid-cols-[1fr,1fr,auto]"
                : "grid-cols-[1fr,auto]"
            : isFieldPassword
                ? "grid-cols-[1fr,auto]"
                : "grid-cols-[auto]";

    return (
        <div className={classNames("grid", containerClasses)}>
            <InputLabel label="Value">
                <Col_ManualFieldValue rowCtx={rowCtx} fileUsCtx={fileUsCtx} />
            </InputLabel>

            {fcAllowed && (
                <InputLabel label="Catalog" className="ml-2">
                    <Column5_Catalog
                        rowCtx={rowCtx}
                        fileUsCtx={fileUsCtx}
                        onSelectCatItem={function onSelectCatItem(item: FceItem | undefined) { /*TODO:*/ }}
                    />
                </InputLabel>
            )}

            {isFieldPassword && (
                fileUsCtx.formIdx === FormIdx.login
                    ? (
                        <InputLabel label="Policy" className="ml-2">
                            <Case_PswFieldPolicyBtn rowCtx={rowCtx} />
                        </InputLabel>
                    )
                    : (
                        <InputLabel label="Link to login form" className="ml-2 min-w-32">
                            <Case_LinkToLoginForm rowCtx={rowCtx} fileUsCtx={fileUsCtx} />
                        </InputLabel>
                    )
            )}
        </div>
    );
}

function Col_ManualFieldValue({ rowCtx, fileUsCtx }: { rowCtx: FieldRowCtx; fileUsCtx: FileUsCtx; }) {
    const { useItAtom, valueLifeAtom } = rowCtx;
    const isLinked = useIsLinkedToLogin(rowCtx, fileUsCtx);
    return (<>
        {isLinked
            ? (
                <Case_ValueForCpassPsw rowCtx={rowCtx} />
            )
            : (
                <Column4_Value
                    useItAtom={useItAtom}
                    valueLifeAtom={valueLifeAtom}
                    choosevalue=""
                />
            )
        }
    </>);
}
