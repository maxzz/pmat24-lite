import { toast } from "sonner";
import { appSettings } from "@/store/9-ui-state";
import { FormIdx } from "@/store/manifest";
import { type ManiAtoms, type ManiTabValue, type VerifyError } from "@/store/2-file-mani-atoms/9-types";
import { optionsFormVerifyErrors } from "./3-0-options-verify-errors";
import { getErrorsFromForm } from "./2-0-form-verify-errors";

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

// Utilities

type ValidationFn = (maniAtoms: ManiAtoms, getset: GetSet) => VerifyError[] | undefined;

function getErrorsFromLogin(maniAtoms: ManiAtoms, getset: GetSet): VerifyError[] | undefined {
    return getErrorsFromForm(maniAtoms, FormIdx.login, getset);
}

function getErrorsFromCpass(maniAtoms: ManiAtoms, getset: GetSet): VerifyError[] | undefined {
    return getErrorsFromForm(maniAtoms, FormIdx.cpass, getset);
}

function getErrorsFromOptions(maniAtoms: ManiAtoms, getset: GetSet): VerifyError[] | undefined {
    const errors =
        optionsFormVerifyErrors(maniAtoms, FormIdx.login, getset) ||
        optionsFormVerifyErrors(maniAtoms, FormIdx.cpass, getset);
    return errors;
}

const defaultValidationOrder: Array<[ManiTabValue, ValidationFn]> = [
    ['login', getErrorsFromLogin],
    ['cpass', getErrorsFromCpass],
    ['options', getErrorsFromOptions],
];
