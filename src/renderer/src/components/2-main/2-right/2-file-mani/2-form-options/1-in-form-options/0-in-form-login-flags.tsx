import { useAtomValue } from "jotai";
import { FormIdx } from "@/store/8-manifest";
import { type OFormProps, type MFormProps, type NFormProps } from "@/store/2-file-mani-atoms";
import { InputWithTitle2Cols } from "@/ui/local-ui";

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

    const oFormProps: OFormProps = { maniAtoms: anyFormProps.maniAtoms, oAllAtoms };
    const isWeb = useAtomValue(oFormProps.oAllAtoms.options.isWebAtom);

    return (<>
        <LoginFlags_Normal oFormProps={oFormProps} />
        <LoginFlags_Manual oFormProps={oFormProps} />
    </>);
}

function LoginFlags_Normal({ oFormProps }: { oFormProps: OFormProps; }) {
    const { aimAtom, lockAtom } = oFormProps.oAllAtoms.options.p3Auth;
    return (<>
        <InputWithTitle2Cols stateAtom={aimAtom} label="Authenticate immediately" asCheckbox />
        <InputWithTitle2Cols stateAtom={lockAtom} label="Lock out login fields" asCheckbox />
    </>);
}

function LoginFlags_Manual({ oFormProps }: { oFormProps: OFormProps; }) {
    const { aimAtom } = oFormProps.oAllAtoms.options.p3Auth;
    return (<>
        <InputWithTitle2Cols stateAtom={aimAtom} label="Authenticate immediately" asCheckbox />
    </>);
}
