import { notice } from "@/ui/local-ui/7-toaster";
import { appSettings } from "@/store/9-ui-state";
import { FormIdx } from "@/store/8-manifest";
import { type ManiAtoms, type ManiTabValue, type VerifyError } from "@/store/2-file-mani-atoms/9-types";
import { getVerifyErrors_OptionsFormTab, getVerifyErrors_OptionsMainTab } from "./1-verify-options";
import { getVerifyErrors_ManualForm, getVerifyErrors_NormalForm } from "./2-verify-form-any";

export function stopIfInvalidAny(maniAtoms: ManiAtoms, getset: GetSet): boolean | undefined {
    const checkOrder = new Map<ManiTabValue, ValidationFn>(defaultValidationOrder);
    const currentTab = appSettings.right.mani.activeTab;

    let errors: VerifyError[] | undefined = checkOrder.get(currentTab)?.(maniAtoms, getset); // Start validation from the current tab and then the rest.

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

    notice.warning(<div className="flex flex-col">{messages}</div>);
};

// Utilities

type ValidationFn = (maniAtoms: ManiAtoms, getset: GetSet) => VerifyError[] | undefined;

export function getErrorsFromForm(maniAtoms: ManiAtoms, formIdx: FormIdx, getset: GetSet): VerifyError[] | undefined {
    let errors =
        getVerifyErrors_NormalForm(maniAtoms, formIdx, getset) ||
        getVerifyErrors_ManualForm(maniAtoms, formIdx, getset);

    if (!errors?.length) {
        const optionsAtoms = maniAtoms[formIdx]?.options;
        errors = optionsAtoms && getVerifyErrors_OptionsFormTab(optionsAtoms, formIdx, getset);
    }

    return errors;
    //TODO: manual validation: activate row
    //TODO: manual validation: activate initial row
    //TODO: options validation: activate row (balloon)
}

// Validation orderfunctions

function getErrorsFromLogin(maniAtoms: ManiAtoms, getset: GetSet): VerifyError[] | undefined {
    return getErrorsFromForm(maniAtoms, FormIdx.login, getset);
}

function getErrorsFromCpass(maniAtoms: ManiAtoms, getset: GetSet): VerifyError[] | undefined {
    return getErrorsFromForm(maniAtoms, FormIdx.cpass, getset);
}

function getErrorsFromOptions(maniAtoms: ManiAtoms, getset: GetSet): VerifyError[] | undefined {
    const errors =
        getVerifyErrors_OptionsMainTab(maniAtoms, FormIdx.login, getset) ||
        getVerifyErrors_OptionsMainTab(maniAtoms, FormIdx.cpass, getset);
    return errors;
}

const defaultValidationOrder: Array<[ManiTabValue, ValidationFn]> = [
    ['login', getErrorsFromLogin],
    ['cpass', getErrorsFromCpass],
    ['options', getErrorsFromOptions],
];
