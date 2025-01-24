import { type StepItem } from "./9-types";

export enum WizardPage {
    apps,
    fields,
    options,
    save,
}

export const wizardFirstPage = WizardPage.apps;
export const wizardLastPage = WizardPage.save;

const explanationClasses = "text-balance text-xs";

export const stepItems: StepItem[] = [
    {
        label: (
            <div className="flex flex-col gap-1">
                <div className="text-sm font-semibold">Pick application</div>
                <div className={explanationClasses}>Select application to train</div>
            </div>
        )
    }, {
        label: (
            <div className="flex flex-col gap-1">
                <div className="font-semibold">Fields and submit</div>
                <div className={explanationClasses}>Configure new manifest fields and submission method.</div>
            </div>
        )
    }, {
        label: (
            <div className="flex flex-col gap-1">
                <div className="font-semibold">Options</div>
                <div className={explanationClasses}>Configure the new manifest settings.</div>
            </div>
        )
    }, {
        label: (
            <div className="flex flex-col gap-1">
                <div className="font-semibold">Save</div>
                <div className={explanationClasses}>Name the manifest and save the file.</div>
            </div>
        )
    },
];
