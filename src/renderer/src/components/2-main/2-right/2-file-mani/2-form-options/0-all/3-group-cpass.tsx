import { OFormContextProps } from "@/store/atoms/3-file-mani-atoms";
import { OptionsDetection, OptionsAuth, OptionsQuicklink, OptionsIcon } from "./4-options-common-parts";

export function GroupCpass(props: OFormContextProps) {
    return (<>
        <OptionsDetection {...props} />
        <OptionsAuth {...props} />
        <OptionsQuicklink {...props} />
        <OptionsIcon {...props} />
    </>);
}
