import { useAtomValue, useSetAtom } from "jotai";
import { FormIdx } from "@/store/8-manifest";
import { type OFormProps, type MFormProps, type NFormProps } from "@/store/2-file-mani-atoms";
import { ChildrenWithLabel2Cols, InputWithTitle2Cols, OptionAsCheckbox } from "@/ui/local-ui";
import { AuthImmSelect } from "../../../2-form-options/9-controls/5-select-controls";
import { notice } from "@/ui/local-ui/7-toaster";
import { SymbolLockClosed } from "@/ui/icons";
import { classNames } from "@/utils";

export function LoginLockFieldsFlag({ nFormProps }: { nFormProps: NFormProps; }) {
    const formIdx = nFormProps.nFormCtx.fileUsCtx.formIdx; // Only login form has lock fields, but old PMAT allows to lock fields for all forms

    //const submitCtx = nFormProps.nFormCtx.normal?.submitCtx;

    const oAllAtoms = nFormProps.maniAtoms?.[formIdx];
    if (!oAllAtoms) {
        return null;
    }

    const oFormProps: OFormProps = { maniAtoms: nFormProps.maniAtoms, oAllAtoms };

    return (
        <div className="ml-2 mr-3 mb-4 grid grid-cols-[auto_minmax(0,1fr)] gap-x-2 gap-y-0.5 select-none">
            <LoginLock_Guarded oFormProps={oFormProps} />
        </div>
    );
}

function LoginLock_Guarded({ oFormProps }: { oFormProps: OFormProps; }) {
    const { lockEnabledAtom, p3Auth } = oFormProps.oAllAtoms.options;
    const lockEnabled = useAtomValue(lockEnabledAtom);

    function onLockFieldsClick() {
        if (!lockEnabled) {
            notice.info('The "Lock form input fields" option cannot be enabled unless the "Submit Form Data" option is selected.');
        }
    }

    return (
        <label className="flex items-center gap-2" onClick={onLockFieldsClick}>
            {lockEnabled
                ? <OptionAsCheckbox stateAtom={p3Auth.lockAtom} />
                : (
                    <div className="flex items-center gap-1">
                        <div className="size-4 dark-checkbox"></div>
                        {/* unavailable */}
                        {/* (allowed only if form submission data has been selected) */}
                    </div>
                )
            }

            <span className={classNames("cursor-pointer", lockEnabled ? "" : "opacity-30 cursor-default")}>Lock form input fields</span>
        </label>
    );
}

//TODO: lock fields if applicable; show warning if not applicable (e.g. not submit form or manual mode)
//TODO: optimize content for normal, manual, web
//TODO: add quick link section
