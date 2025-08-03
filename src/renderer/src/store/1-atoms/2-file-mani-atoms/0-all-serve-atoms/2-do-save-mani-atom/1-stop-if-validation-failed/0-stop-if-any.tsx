import { appSettings } from "@/store/9-ui-state";
import { toast } from "sonner";
import { type ManiAtoms, type ManiTabValue, type VerifyError } from "../../../9-types";
import { getErrorsFromOptions } from "./1-options-verify-errors";
import { getErrorsFromCpass, getErrorsFromLogin } from "./2-form-verify-errors";

export function stopIfInvalidAny(maniAtoms: ManiAtoms, getset: GetSet): boolean | undefined {
    const order = new Map<ManiTabValue, ValidationFn>(defaultValidationOrder);
    const currentTab = appSettings.right.mani.activeTab;

    let errors: VerifyError[] | undefined = order[currentTab]?.(maniAtoms, getset); // Start validation from the current tab and then the rest.
    if (!errors?.length) {
        order.delete(currentTab);

        for (const [tab, fn] of order) {
            errors = fn(maniAtoms, getset);
            if (errors?.length) {
                break;
            }
        }
    }

    if (errors?.length) {
        showValidationErrors({ fromTab: errors[0].tab, verifyErrors: errors });
        return true;
    }
}

type ValidationFn = (maniAtoms: ManiAtoms, getset: GetSet) => VerifyError[] | undefined;

const defaultValidationOrder: Array<[ManiTabValue, ValidationFn]> = [
    ['login', getErrorsFromLogin],
    ['cpass', getErrorsFromCpass],
    ['options', getErrorsFromOptions],
];

function showValidationErrors({ fromTab, verifyErrors }: { fromTab: ManiTabValue | undefined; verifyErrors: VerifyError[]; }): void {
    if (fromTab) {
        appSettings.right.mani.activeTab = fromTab;
        //TODO: navigate to field where error is: open options group or select manual mode row
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
