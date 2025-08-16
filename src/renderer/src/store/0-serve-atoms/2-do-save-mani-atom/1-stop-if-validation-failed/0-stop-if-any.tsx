import { toast } from "sonner";
import { appSettings } from "@/store/9-ui-state";
import { type ManiAtoms, type ManiTabValue, type VerifyError } from "@/store/2-file-mani-atoms/9-types";
import { getErrorsFromOptions } from "./1-options-verify-errors";
import { getErrorsFromCpass, getErrorsFromLogin } from "./2-form-verify-errors";

export function stopIfInvalidAny(maniAtoms: ManiAtoms, getset: GetSet): boolean | undefined {
    const checkOrder = new Map<ManiTabValue, ValidationFn>(defaultValidationOrder);
    const currentTab = appSettings.right.mani.activeTab;

    let errors: VerifyError[] | undefined = checkOrder[currentTab]?.(maniAtoms, getset); // Start validation from the current tab and then the rest.

    if (!errors?.length) {
        checkOrder.delete(currentTab);

        for (const [tab, fn] of checkOrder) {
            errors = fn(maniAtoms, getset);
            if (errors?.length) {
                break;
            }
        }
    }

    if (errors?.length) {
        showValidationErrors(errors);
        return true;
    }
}

type ValidationFn = (maniAtoms: ManiAtoms, getset: GetSet) => VerifyError[] | undefined;

const defaultValidationOrder: Array<[ManiTabValue, ValidationFn]> = [
    ['login', getErrorsFromLogin],
    ['cpass', getErrorsFromCpass],
    ['options', getErrorsFromOptions],
];

// Show validation errors

function showValidationErrors(verifyErrors: VerifyError[]): void {

    const firstError = verifyErrors[0];
    const { tab, groupName, atomName, rowIdx, actionUuid } = firstError;

    if (tab) {
        appSettings.right.mani.activeTab = tab;
        console.log('showValidationErrors: firstError', firstError);

        //TODO: navigate to field where error is: open options group or select manual mode row
    }

    // 2. Prepare toastmessages

    const messages = verifyErrors.map(
        (err, idx) => {
            return (
                <div key={idx}>
                    {err.error}
                </div>
            );
        }
    );

    toast.error(<div className="flex flex-col">{messages}</div>);
};
