import { useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { notice } from "@/ui/local-ui/7-toaster";
import { AnimatePresence, motion } from "motion/react";
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

            <AnimatePresence mode="wait" initial={false}>
                {lockEnabled ? (
                    <motion.div
                        key="switch"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.15 }}
                        className="flex items-center"
                    >
                        <OptionAsSwitch stateAtom={lockAtom} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="warning"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.15 }}
                        className="opacity-50"
                    >
                        can't be applied as "Submit Form Data" is not selected.
                    </motion.div>
                )}
            </AnimatePresence>
        </label>
    );
}
