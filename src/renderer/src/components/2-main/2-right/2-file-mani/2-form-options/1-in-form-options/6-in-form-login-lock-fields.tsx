import { useAtomValue, useSetAtom } from "jotai";
import { FormIdx } from "@/store/8-manifest";
import { type OFormProps, type MFormProps, type NFormProps } from "@/store/2-file-mani-atoms";
import { ChildrenWithLabel2Cols, InputWithTitle2Cols } from "@/ui/local-ui";
import { AuthImmSelect } from "../9-controls/5-select-controls";
import { notice } from "@/ui/local-ui/7-toaster";
import { SymbolLockClosed } from "@/ui/icons";

export function LoginLockFieldsFlag({ nFormProps }: { nFormProps: NFormProps; }) {
    const formIdx = nFormProps.nFormCtx.fileUsCtx.formIdx; // Only login form has lock fields, but old PMAT allows to lock fields for all forms

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
        <div className="contents">
            {lockEnabled ? (<>
                <InputWithTitle2Cols
                    className={!lockEnabled ? "opacity-25 cursor-default" : ""}
                    stateAtom={p3Auth.lockAtom}
                    label="Lock out login fields"
                    asCheckbox
                    checkboxTrail={<span className="pl-2 font-light">{lockEnabled ? "(allowed only if form submission data has been selected)" : "(not allowed in manual mode)"}</span>}
                />
            </>) : (
                <div className="cursor-default"
                    onClick={(event: React.MouseEvent<HTMLInputElement>) => {
                        if (lockEnabled) {
                            return;
                        }
                        event.preventDefault();
                        event.stopPropagation();
                        //setLock((prev) => ({ ...prev, data: '1', initialData: '1' })); // The onChange handler will invert it to '0' to avoid dirty flag
                        notice.info("This input is locked by default. Only change it if you understand what you're doing.");
                    }}
                    title={lockEnabled ? "(allowed only if form submission data has been selected)" : "(not allowed in manual mode)"}
                >
                    <div className="size-4 dark-checkbox"></div>
                    If the submit form data option is not selected, the lock form fields is unavailable.
                </div>
            )}
        </div>
    );
}

const optionsAllGroupsClasses = "ml-1 mr-3 mb-1 grid grid-cols-[auto_minmax(0,1fr)] gap-x-2 gap-y-0.5 select-none";

//TODO: lock fields if applicable; show warning if not applicable (e.g. not submit form or manual mode)
//TODO: optimize content for normal, manual, web
//TODO: add quick link section
