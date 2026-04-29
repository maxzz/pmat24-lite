import { useAtomValue } from "jotai";
import { FormIdx } from "@/store/8-manifest";
import { type OFormProps, type MFormProps, type NFormProps } from "@/store/2-file-mani-atoms";
import { ChildrenWithLabel2Cols, InputWithTitle2Cols } from "@/ui/local-ui";
import { AuthImmSelect } from "../9-controls/5-select-controls";

export function InFormBlockLoginFlags({ anyFormProps }: { anyFormProps: NFormProps | MFormProps; }) {
    const anyFormCtx = (anyFormProps as NFormProps).nFormCtx || (anyFormProps as MFormProps).mFormCtx;
    const formIdx = anyFormCtx?.fileUsCtx.formIdx;

    if (formIdx !== FormIdx.login) { // only login form has login flags
        return null;
    }

    const oAllAtoms = anyFormProps.maniAtoms?.[formIdx];
    if (!oAllAtoms) {
        return null;
    }

    const isNormal = !!(anyFormProps as NFormProps).nFormCtx;

    const oFormProps: OFormProps = { maniAtoms: anyFormProps.maniAtoms, oAllAtoms };
    const isWeb = useAtomValue(oFormProps.oAllAtoms.options.isWebAtom);

    return (
        <div className={optionsAllGroupsClasses}>
            {isNormal
                ? <LoginFlags_Normal oFormProps={oFormProps} />
                : <LoginFlags_Manual oFormProps={oFormProps} />
            }
        </div>
    );
}

function LoginFlags_Normal({ oFormProps }: { oFormProps: OFormProps; }) {
    const { aimAtom, lockAtom } = oFormProps.oAllAtoms.options.p3Auth;
    return (<>
        <ChildrenWithLabel2Cols label="Authenticate immediately">
            <AuthImmSelect stateAtom={aimAtom} className="w-max" />
        </ChildrenWithLabel2Cols>

        <InputWithTitle2Cols stateAtom={lockAtom} label="Lock out login fields" asCheckbox />
    </>);
}

function LoginFlags_Manual({ oFormProps }: { oFormProps: OFormProps; }) {
    const { aimAtom } = oFormProps.oAllAtoms.options.p3Auth;
    return (<>
        <ChildrenWithLabel2Cols label="Authenticate immediately">
            <AuthImmSelect stateAtom={aimAtom} className="w-max" />
        </ChildrenWithLabel2Cols>
    </>);
}

const optionsAllGroupsClasses = "ml-1 mr-3 mb-1 grid grid-cols-[auto_minmax(0,1fr)] gap-x-2 gap-y-0.5 select-none";

//TODO: lock fields if applicable; show warning if not applicable (e.g. not submit form or manual mode)
//TODO: optimize content for normal, manual, web
//TODO: add quick link section
