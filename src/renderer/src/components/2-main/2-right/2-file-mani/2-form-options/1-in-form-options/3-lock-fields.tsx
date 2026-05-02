import { useAtomValue, useSetAtom } from "jotai";
import { FormIdx } from "@/store/8-manifest";
import { type OFormProps, type MFormProps, type NFormProps } from "@/store/2-file-mani-atoms";
import { ChildrenWithLabel2Cols, InputWithTitle2Cols, OptionAsCheckbox } from "@/ui/local-ui";
import { AuthImmSelect } from "../9-controls/5-select-controls";
import { notice } from "@/ui/local-ui/7-toaster";
import { SymbolLockClosed } from "@/ui/icons";

export function LoginLockFieldsFlag({ nFormProps }: { nFormProps: NFormProps; }) {
    const formIdx = nFormProps.nFormCtx.fileUsCtx.formIdx; // Only login form has lock fields, but old PMAT allows to lock fields for all forms

    //const submitCtx = nFormProps.nFormCtx.normal?.submitCtx;

    const oAllAtoms = nFormProps.maniAtoms?.[formIdx];
    if (!oAllAtoms) {
        return null;
    }

    const oFormProps: OFormProps = { maniAtoms: nFormProps.maniAtoms, oAllAtoms };

    return (
        <div className={optionsAllGroupsClasses}>
            <LoginLock_Guarded oFormProps={oFormProps} />
        </div>
    );
}

function LoginLock_Guarded({ oFormProps }: { oFormProps: OFormProps; }) {
    const isWeb = useAtomValue(oFormProps.oAllAtoms.options.isWebAtom);

    const { lockEnabledAtom, p3Auth } = oFormProps.oAllAtoms.options;
    const lockEnabled = useAtomValue(lockEnabledAtom);

    return (
        <div className="flex items-center gap-1">
            Lock out login fields
            {lockEnabled
                ? <OptionAsCheckbox stateAtom={p3Auth.lockAtom} />
                : (<>
                <div className="size-4 dark-checkbox"></div>
                (allowed only if form submission data has been selected)
                </>)
            }
        </div>
    );
}

const optionsAllGroupsClasses = "ml-1 mr-3 mb-1 grid grid-cols-[auto_minmax(0,1fr)] gap-x-2 gap-y-0.5 select-none";

//TODO: lock fields if applicable; show warning if not applicable (e.g. not submit form or manual mode)
//TODO: optimize content for normal, manual, web
//TODO: add quick link section
