import { TabSectionProps } from "@/store/atoms/3-file-mani-atoms";
import { Section } from "../4-controls";
import { Part1General, Part2ScreenDetection, Part3Authentication, Part4QL, Part5PasswordManagerIcon } from "../3-sections";

export function TabOptions({ formAtoms, formIdx }: TabSectionProps) {

    //const fileUs = useAtomValue(formAtoms.params.fileUsAtom);
    //const isWeb = fileUs.stats.isWeb; // TODO: why this is not per form?

    const metaForm = formAtoms.fileUsParams.fileUs.meta?.[formIdx]!; // We are under createFormAtoms umbrella, so we can safely use ! here

    const atoms = formAtoms.optionsAtoms;
    const isWeb = !!metaForm?.mani.detection.web_ourl;

    return (
        <div className="mr-1 mb-4 font-light text-mani-foreground select-none grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-2 space-y-1">
            <Section label="General" />
            <Part1General atoms={atoms} />

            <Section label="Screen detection" />
            <Part2ScreenDetection atoms={atoms} />

            <Section label="Authentication" />
            <Part3Authentication atoms={atoms} />

            <Section label="Quick link" />
            <Part4QL atoms={atoms} />

            {!isWeb && (
                <>
                    <Section label="Password Manager Icon" />
                    <Part5PasswordManagerIcon atoms={atoms} />
                </>
            )}
        </div>
    );
}

//TODO: Do we need to show fields: window caption and classname if they don't have sense for web, but created w/ IE?
