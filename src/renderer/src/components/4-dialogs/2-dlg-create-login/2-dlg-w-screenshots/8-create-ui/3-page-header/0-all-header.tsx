import { WizardPage, stepInfo } from "../../0-new-mani-ctx";
import { ButtonSourceCode } from "./1-btn-source-code";

export function WizardPageHeader({ page }: { page: WizardPage; }) {
    const [title, explanation] = stepInfo[page];
    return (
        <div className="px-3 py-3 text-sm bg-muted/30 flex items-center justify-between gap-0.5">

            <div className="flex flex-col gap-0.5">
                <div className="text-xs font-semibold">{title}</div>
                <div className="text-xs text-foreground/50">{explanation}</div>
            </div>

            {page === WizardPage.fields && (
                <ButtonSourceCode />
            )}
        </div>
    );
}
