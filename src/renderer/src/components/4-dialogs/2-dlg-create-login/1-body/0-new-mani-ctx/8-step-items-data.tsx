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
    { label: OneStep(WizardPage.apps), },
    { label: OneStep(WizardPage.fields), },
    { label: OneStep(WizardPage.options), },
    { label: OneStep(WizardPage.save), },
];

function OneStep(wizardPage: WizardPage) {
    const [title, explanation] = stepInfo[wizardPage];
    return (
        <div className="flex flex-col gap-1">
            <div className={titleClasses}>
                {/* <span className="text-foreground/50">
                    {wizardPage + 1}.{' '}
                </span> */}
                {title}
            </div>
            <div className={explanationClasses}>{explanation}</div>
        </div>
    );
}
