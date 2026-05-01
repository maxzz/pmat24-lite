import { useAtomValue, useSetAtom } from "jotai";
import { FormIdx } from "@/store/8-manifest";
import { type OFormProps, type MFormProps, type NFormProps } from "@/store/2-file-mani-atoms";
import { ChildrenWithLabel2Cols, InputWithTitle2Cols } from "@/ui/local-ui";
import { AuthImmSelect } from "../9-controls/5-select-controls";
import { notice } from "@/ui/local-ui/7-toaster";

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
            <LoginFlags_Guarded oFormProps={oFormProps} isNormal={isNormal} />
        </div>
    );
}

function LoginFlags_Guarded({ oFormProps, isNormal }: { oFormProps: OFormProps; isNormal: boolean; }) {
    const { aimAtom, lockAtom, lockEnabledAtom } = oFormProps.oAllAtoms.options.p3Auth;
    const data = useAtomValue(lockEnabledAtom);
    const lockEnabled = data.data === '1';
    const setLock = useSetAtom(lockAtom);
    return (<>
        {isNormal && (
            <div className="contents" onMouseUp={(event: React.MouseEvent<HTMLInputElement>) => {
                if (lockEnabled) {
                    return;
                }
                event.preventDefault();
                event.stopPropagation();
                //setLock((prev) => ({ ...prev, data: '1', initialData: '1' })); // The onChange handler will invert it to '0' to avoid dirty flag
                notice.info("This input is locked by default. Only change it if you understand what you're doing.");
            }}>
            <InputWithTitle2Cols
                className={!lockEnabled ? 'opacity-25 cursor-default' : ''}
                // onClick={(event: React.MouseEvent<HTMLInputElement>) => {
                //     if (lockEnabled) {
                //         return;
                //     }
                //     event.preventDefault();
                //     event.stopPropagation();
                //     //setLock((prev) => ({ ...prev, data: '1', initialData: '1' })); // The onChange handler will invert it to '0' to avoid dirty flag
                //     notice.info("This input is locked by default. Only change it if you understand what you're doing.");
                // }}
                stateAtom={lockAtom}
                disabled={!lockEnabled}
                label="Lock out login fields"
                asCheckbox
                checkboxTrail={<span className="pl-2 font-light">{lockEnabled ? "(allowed only if form submission data has been selected)" : "(not allowed in manual mode)"}</span>}
            />
            </div>
        )}

        <ChildrenWithLabel2Cols label="Authenticate immediately">
            <AuthImmSelect stateAtom={aimAtom} className="w-max" />
        </ChildrenWithLabel2Cols>
    </>);
}

const optionsAllGroupsClasses = "ml-1 mr-3 mb-1 grid grid-cols-[auto_minmax(0,1fr)] gap-x-2 gap-y-0.5 select-none";

//TODO: lock fields if applicable; show warning if not applicable (e.g. not submit form or manual mode)
//TODO: optimize content for normal, manual, web
//TODO: add quick link section
