import { type StepItem } from "../8-create-ui/1-steps/9-types";

export enum WizardPage {
    apps,
    fields,
    options,
    save,
}

export const wizardFirstPage = WizardPage.apps;
export const wizardLastPage = WizardPage.save;

// Data

export const stepInfo: [title: string, explanation: string][] = [
    ['Application window', 'Select the application window for training.'],
    ['Fields and submit', 'Set up new form fields and submission method.'],
    ['Options', 'Configure the new manifest settings.'],
    ['Save', 'Name the manifest and save the file.'],
];

const explanationClasses = "text-balance text-xs";

export const stepItems: StepItem[] = [
    {
        label: (
            <div className="flex flex-col gap-1">
                <div className="text-sm font-semibold"><span className="text-foreground/50">1. </span>{stepInfo[WizardPage.apps][0]}</div>
                <div className={explanationClasses}>{stepInfo[WizardPage.apps][1]}</div>
            </div>
        )
    }, {
        label: (
            <div className="flex flex-col gap-1">
                <div className="font-semibold"><span className="text-foreground/50">2. </span>{stepInfo[WizardPage.fields][0]}</div>
                <div className={explanationClasses}>{stepInfo[WizardPage.fields][1]}</div>
            </div>
        )
    }, {
        label: (
            <div className="flex flex-col gap-1">
                <div className="font-semibold"><span className="text-foreground/50">3. </span>{stepInfo[WizardPage.options][0]}</div>
                <div className={explanationClasses}>{stepInfo[WizardPage.options][1]}</div>
            </div>
        )
    }, {
        label: (
            <div className="flex flex-col gap-1">
                <div className="font-semibold"><span className="text-foreground/50">4. </span>{stepInfo[WizardPage.save][0]}</div>
                <div className={explanationClasses}>{stepInfo[WizardPage.save][1]}</div>
            </div>
        )
    },
];
