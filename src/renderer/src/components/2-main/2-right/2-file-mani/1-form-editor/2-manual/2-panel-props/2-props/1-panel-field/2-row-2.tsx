import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { FieldTyp, FormIdx } from "@/store/8-manifest";
import { appSettings } from "@/store/9-ui-state";
import { type FileUsCtx, type ManualFieldState } from "@/store/2-file-mani-atoms";
import { type FieldRowCtx, useIsLinkedToLogin } from "@/store/2-file-mani-atoms";
import { type FceItem } from "@/store/3-field-catalog-atoms";
import { InputLabel } from "../8-props-ui";
import { Case_LinkToLoginForm, Column6_Policy, Case_ValueForLinked, Column4_Value, Column5_Catalog } from "../../../../1-normal/1-fields";

export function SecondRow({ item, fileUsCtx }: { item: ManualFieldState.CtxFld; fileUsCtx: FileUsCtx; }) {
    const { rowCtx } = item;
    const { fcAllowed } = useSnapshot(appSettings.files.shownManis);
    const isFieldPassword = useAtomValue(rowCtx.typeAtom) === FieldTyp.psw;

    const containerClasses =
        fcAllowed
            ? isFieldPassword
                ? "grid-cols-[1fr_1fr_auto]"
                : "grid-cols-[1fr_auto]"
            : isFieldPassword
                ? "grid-cols-[1fr_auto]"
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
                            <Column6_Policy rowCtx={rowCtx} />
                        </InputLabel>
                    )
                    : (
                        <InputLabel label="Link to login" className="ml-2 min-w-32">
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
                <Case_ValueForLinked rowCtx={rowCtx} />
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
