import { type StepItem } from "./9-types";

export enum WizardPage {
    apps,
    fields,
    options,
    save,
}

export const wizardFirstPage = WizardPage.apps;
export const wizardLastPage = WizardPage.save;

export const stepItems: StepItem[] = [
    {
        label: (
            <div className="flex flex-col gap-1">
                <div className="text-sm font-semibold">Pick application</div>
                <div className="text-xs">Select application to train</div>
            </div>
        )
    }, {
        label: (
            <div className="flex flex-col gap-1">
                <div className="font-semibold">Fields and submit</div>
                <div className="text-xs">Select fields and submit</div>
            </div>
        )
    }, {
        label: (
            <div className="flex flex-col gap-1">
                <div className="font-semibold">Options</div>
                <div className="text-xs">Customize options of the new manifest</div>
            </div>
        )
    }, {
        label: (
            <div className="flex flex-col gap-1">
                <div className="font-semibold">Save</div>
                <div className="text-xs">Name manifest and save</div>
            </div>
        )
    },
];
