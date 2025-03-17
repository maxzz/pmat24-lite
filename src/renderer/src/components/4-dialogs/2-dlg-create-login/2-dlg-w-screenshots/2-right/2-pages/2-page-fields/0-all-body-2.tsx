import { WizardPage } from "../../../0-new-mani-ctx";
import { WizardPageHeader } from "../../../8-create-ui";
import { ContentEditorSelector } from "@/components/4-dialogs/2-dlg-create-login/7-mani-content-editor";

export function Page2FieldsBody() {
    return (
        <div className="size-full text-xs 1bg-sky-300 grid grid-rows-[auto,1fr,auto]">
            <WizardPageHeader page={WizardPage.fields} />

            <ContentEditorSelector />
        </div>
    );
}
