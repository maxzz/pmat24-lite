import { useAtomValue, useSetAtom } from "jotai";
import { FieldTyp, FormIdx } from "@/store/manifest";
import { type FieldRowCtx, type FileUsCtx } from "@/store/1-atoms/2-file-mani-atoms";
import { Case_LinkToLoginForm } from "../../../2-manual/2-panel-props/2-props/1-panel-field/7-col-link-to-cpass";
import { Column6_Policy } from "./1-trigger";
//import { Case_ManualFieldPolicyBtn } from "../../../2-manual/2-panel-props/2-props/1-panel-field/6-row-2-col-2-policy-or-link";

export function Column6_PolicySelector({ rowCtx, fileUsCtx }: { rowCtx: FieldRowCtx; fileUsCtx: FileUsCtx; }) {
    const isPsw = useAtomValue(rowCtx.typeAtom) === FieldTyp.psw;
    return (<>
        {isPsw
            ? (
                fileUsCtx.formIdx === FormIdx.login
                    ? (
                        <Case_ManualFieldPolicyBtn rowCtx={rowCtx} />
                    )
                    : (
                        <Case_LinkToLoginForm rowCtx={rowCtx} fileUsCtx={fileUsCtx} />
                    )
            )
            : (
                <div className="text-center" />
            )
        }
    </>);
}

const Column6_PolicyClasses = "\
px-2 py-3 h-7 text-[.65rem] \
\
text-mani-foreground bg-mani-background \
\
border-mani-border-muted border \
\
ring-mani-ring \
focus:ring-1 \
focus:ring-offset-1 \
focus:ring-offset-mani-background \
focus:ring-mani-ring-activated \
\
rounded outline-none \
flex items-center justify-center gap-0.5";

//TODO: add default text 'Give me a name' or 'No name, give me one';

export function Case_ManualFieldPolicyBtn({ rowCtx }: { rowCtx: FieldRowCtx; }) {
    const { useItAtom, typeAtom, policiesAtom } = rowCtx;

    const setUseIt = useSetAtom(useItAtom);
    const enableRow = () => setUseIt(true);

    return (
        <Column6_Policy
            useItAtom={useItAtom}
            typeAtom={typeAtom}
            policiesAtom={policiesAtom}
            onClick={enableRow}
        />
    );
}
