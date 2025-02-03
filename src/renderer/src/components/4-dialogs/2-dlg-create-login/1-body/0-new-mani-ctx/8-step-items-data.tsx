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

export const stepInfo: { [key in WizardPage]: [title: string, explanation: string] } = {
    [WizardPage.apps]: ['Application window', 'Select the application window for training.'],
    [WizardPage.fields]: ['Fields and submit', 'Set up new form fields and submission method.'],
    [WizardPage.options]: ['Options', 'Configure the new manifest settings.'],
    [WizardPage.save]: ['Save', 'Name the manifest and save the file.'],
};

const titleClasses = "text-xs font-semibold";
const explanationClasses = "text-xs text-balance";

export const stepItems: StepItem[] = [
    {
        label: (
            <div className="flex flex-col gap-1">
                <div className={titleClasses}><span className="text-foreground/50">1.{' '}</span>{stepInfo[WizardPage.apps][0]}</div>
                <div className={explanationClasses}>{stepInfo[WizardPage.apps][1]}</div>
            </div>
        )
    }, {
        label: (
            <div className="flex flex-col gap-1">
                <div className={titleClasses}><span className="text-foreground/50">2.{' '}</span>{stepInfo[WizardPage.fields][0]}</div>
                <div className={explanationClasses}>{stepInfo[WizardPage.fields][1]}</div>
            </div>
        )
    }, {
        label: (
            <div className="flex flex-col gap-1">
                <div className={titleClasses}><span className="text-foreground/50">3.{' '}</span>{stepInfo[WizardPage.options][0]}</div>
                <div className={explanationClasses}>{stepInfo[WizardPage.options][1]}</div>
            </div>
        )
    }, {
        label: (
            <div className="flex flex-col gap-1">
                <div className={titleClasses}><span className="text-foreground/50">4.{' '}</span>{stepInfo[WizardPage.save][0]}</div>
                <div className={explanationClasses}>{stepInfo[WizardPage.save][1]}</div>
            </div>
        )
    },
];

function OneStep(wizardPage: WizardPage) {
    return (
        <div className="flex flex-col gap-1">
            <div className={titleClasses}><span className="text-foreground/50">{wizardPage + 1}.{' '}</span>{stepInfo[wizardPage][0]}</div>
            <div className={explanationClasses}>{stepInfo[wizardPage][1]}</div>
        </div>
    );
}
