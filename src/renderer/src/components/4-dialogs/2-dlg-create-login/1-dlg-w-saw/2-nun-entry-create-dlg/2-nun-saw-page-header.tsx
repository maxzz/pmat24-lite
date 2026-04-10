import { ButtonSourceCode } from "../../x-1-nun-dlg-w-screenshots/8-create-ui";

export function SawPageHeader() {
    const [title, explanation] = ['New manifest', 'Sellect the fields you want to use for the new manifest, submit method and other options.'];
    return (
        <div className="px-3 py-3 text-sm bg-muted/30 flex items-center justify-between gap-0.5">

            <div className="flex flex-col gap-0.5">
                <div className="text-xs font-semibold">{title}</div>
                <div className="text-xs text-foreground/50">{explanation}</div>
            </div>

            <ButtonSourceCode />
        </div>
    );
}
