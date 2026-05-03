import { useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { notice } from "@/ui/local-ui/7-toaster";
import { OptionAsCheckbox } from "@/ui/local-ui";
import { type OFormProps, type NFormProps } from "@/store/2-file-mani-atoms";

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
            notice.info('This option cannot be enabled unless the "Submit Form Data" option is selected.');
        }
    }

    return (
        <label className="flex items-center gap-2" onClick={onLockFieldsClick}>
            {lockEnabled
                ? <OptionAsCheckbox stateAtom={p3Auth.lockAtom} />
                : <div className="size-4 dark-checkbox"></div>
            }

            <span className={classNames("cursor-pointer", lockEnabled ? "" : "opacity-30 cursor-default")}>Lock form input fields</span>
        </label>
    );
}

//TODO: add quick link section
