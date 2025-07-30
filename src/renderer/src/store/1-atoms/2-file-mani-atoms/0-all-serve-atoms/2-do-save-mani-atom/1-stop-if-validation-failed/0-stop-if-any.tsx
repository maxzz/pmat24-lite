import { appSettings } from "@/store/9-ui-state";
import { toast } from "sonner";
import { FormIdx } from "@/store/manifest";
import { type ManiAtoms, type VerifyError } from "../../../9-types";
import { normalFormVerifyErrors } from "./1-normal-verify-errors";
import { manualFormVerifyErrors } from "./2-manual-verify-errors";
import { optionsFormVerifyErrors } from "./3-options-verify-errors";

export function stopIfInvalidAny(maniAtoms: ManiAtoms, getset: GetSet): boolean | undefined {
    const maniItself: VerifyError[] | undefined = maniAtoms[FormIdx.login]
        ? undefined
        : [{ error: 'Login form is missing', tab: 'options' }];

    const errors: VerifyError[] | undefined =
        maniItself ||
        getOptionsErrors(maniAtoms, getset) ||
        getLoginErrors(maniAtoms, getset) ||
        getCpassErrors(maniAtoms, getset);

    if (!errors?.length) {
        return false;
    }

    showValidationErrors({ fromTab: errors[0].tab, verifyErrors: errors }); // errors[0].tab or 'login'
    return true;
}

function getOptionsErrors(maniAtoms: ManiAtoms, getset: GetSet): VerifyError[] | undefined {
    const errors =
        optionsFormVerifyErrors(maniAtoms, FormIdx.login, getset) ||
        optionsFormVerifyErrors(maniAtoms, FormIdx.cpass, getset);
    return errors;
}

function getLoginErrors(maniAtoms: ManiAtoms, getset: GetSet): VerifyError[] | undefined {
    const errors =
        normalFormVerifyErrors(maniAtoms, FormIdx.login, getset) ||
        manualFormVerifyErrors(maniAtoms, FormIdx.login, getset);
    return errors;
}

function getCpassErrors(maniAtoms: ManiAtoms, getset: GetSet): VerifyError[] | undefined {
    const errors =
        normalFormVerifyErrors(maniAtoms, FormIdx.cpass, getset) ||
        manualFormVerifyErrors(maniAtoms, FormIdx.cpass, getset);
    return errors;
}

function showValidationErrors({ fromTab, verifyErrors }: { fromTab: string | undefined; verifyErrors: VerifyError[]; }): void {
    if (fromTab) {
        appSettings.right.mani.activeTab = fromTab;
    }

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

//TODO: manual validation: activate row
//TODO: manual validation: activate initial row
//TODO: options validation: activate row (balloon)
