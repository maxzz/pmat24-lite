import { useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { notice } from "@/ui/local-ui/7-toaster";
import { OptionAsCheckbox, OptionAsSwitch, TitleTooltip } from "@/ui/local-ui";
import { optionsTooltips } from "../../../2-form-options/8-tooltips";
import { type NFormProps, type FormOptionsState } from "@/store/2-file-mani-atoms";

export function LoginLockFieldsFlag({ nFormProps }: { nFormProps: NFormProps; }) {
    const formIdx = nFormProps.nFormCtx.fileUsCtx.formIdx; // The old PMAT allows to lock fields for any normal form

    const oAllAtoms = nFormProps.maniAtoms?.[formIdx];
    if (!oAllAtoms) {
        return null;
    }

    return (
        <div className="ml-2 mr-3 mb-4 grid grid-cols-[auto_minmax(0,1fr)] gap-x-2 gap-y-0.5 select-none">
            <LoginLock_Guarded options={oAllAtoms.options} />
        </div>
    );
}

function LoginLock_Guarded({ options }: { options: FormOptionsState.AllAtoms; }) {
    const { lockEnabledAtom, p3Auth: { lockAtom } } = options;
    const lockEnabled = useAtomValue(lockEnabledAtom);

    function onLockFieldsClick() {
        !lockEnabled && notice.info('This option cannot be enabled unless the "Submit Form Data" option is selected.');
    }

    return (
        <label className="h-6 flex items-center gap-1.5" onClick={onLockFieldsClick}>
            <span className={classNames("cursor-pointer inline-flex items-center gap-1", lockEnabled ? "" : "opacity-50 cursor-default")}>
                Lock form input fields
                <TitleTooltip content={optionsTooltips.lockoutFields} />
            </span>

            {lockEnabled
                ? <OptionAsSwitch stateAtom={lockAtom} />
                : <div className="opacity-50">
                    can't be applied as "Submit Form Data" is not selected.
                </div>
            }
        </label>
    );
}
