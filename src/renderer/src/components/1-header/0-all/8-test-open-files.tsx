import { ButtonFilesPicker } from "@/components/2-main/0-all/2-welcome-page/2-button-files-picker";

export function TestOpenFiles() {
    return (<>
        <ButtonFilesPicker className="text-[.65rem]" />
        <ButtonFilesPicker className="text-[.65rem]" openAsFolder />
    </>);
}
