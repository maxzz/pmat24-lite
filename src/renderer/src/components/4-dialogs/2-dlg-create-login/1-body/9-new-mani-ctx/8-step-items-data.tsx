import { type StepItem } from "../8-create-ui/1-steps/9-types";

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
                <div className="text-sm font-semibold"><span className="text-foreground/50">1.</span> Application window</div>
                <div className={explanationClasses}>Select the application window for training.</div>
            </div>
        )
    }, {
        label: (
            <div className="flex flex-col gap-1">
                <div className="font-semibold"><span className="text-foreground/50">2.</span> Fields and submit</div>
                <div className={explanationClasses}>Set up new form fields and submission method.</div>
            </div>
        )
    }, {
        label: (
            <div className="flex flex-col gap-1">
                <div className="font-semibold"><span className="text-foreground/50">3.</span> Options</div>
                <div className={explanationClasses}>Configure the new manifest settings.</div>
            </div>
        )
    }, {
        label: (
            <div className="flex flex-col gap-1">
                <div className="font-semibold"><span className="text-foreground/50">4.</span> Save</div>
                <div className={explanationClasses}>Name the manifest and save the file.</div>
            </div>
        )
    },
];
