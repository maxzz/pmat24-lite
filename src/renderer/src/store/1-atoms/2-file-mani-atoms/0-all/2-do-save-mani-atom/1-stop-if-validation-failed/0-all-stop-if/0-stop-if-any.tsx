import { type GetSet } from "@/utils";
import { toast } from "sonner";
import { appSettings } from "@/store/9-ui-state";
import { FormIdx } from "@/store/manifest";
import { type ManiAtoms, type VerifyError } from "../../../../9-types";
import { normalFormsVerifyErrors } from "./1-normal-verify-errors";
import { manualFormsVerifyErrors } from "./2-manual-verify-errors";
import { optionsVerifyErrors } from "./3-options-verify-errors";

export function stopIfInvalidAny(maniAtoms: ManiAtoms, getset: GetSet): boolean | undefined {
    const maniItself: VerifyError[] | undefined = maniAtoms[FormIdx.login]
        ? undefined
        : [{ error: 'Login form is missing', tab: 'options' }];

    const errors: VerifyError[] | undefined =
        maniItself ||
        optionsVerifyErrors(maniAtoms, getset) ||
        normalFormsVerifyErrors(maniAtoms, getset) ||
        manualFormsVerifyErrors(maniAtoms, getset);

    if (!errors?.length) {
        return false;
    }

    showValidationErrors({ fromTab: errors[0].tab, verifyErrors: errors }); // errors[0].tab or 'login'
    return true;
}

function showValidationErrors({ fromTab, verifyErrors }: { fromTab: string | undefined; verifyErrors: VerifyError[]; }): void {
    if (fromTab) {
        appSettings.right.mani.activeTab = fromTab;
    }

    const messages = verifyErrors.map(
        (err, idx) => {
            return <div key={idx}>{err.error}</div>;
        }
    );

    toast.error(<div className="flex flex-col">{messages}</div>);
}

//TODO: manual validation: activate row
//TODO: manual validation: activate initial row
//TODO: options validation: activate row (balloon)
