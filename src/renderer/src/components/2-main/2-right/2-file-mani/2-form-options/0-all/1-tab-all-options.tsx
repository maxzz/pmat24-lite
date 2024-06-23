import { useAtomValue } from "jotai";
import { TabSectionProps } from "@/store/atoms/3-file-mani-atoms";
import { Part1General, Part2ScreenDetection, Part3Authentication, Part4QL, Part5PasswordManagerIcon } from "../3-sections";
import { Section } from "../9-controls";
import { FormIdx, OptionsGroup } from "@/store/store-types";

const optionsAllGroupsClasses = "grid grid-cols-[auto_minmax(0,1fr)] gap-x-2 gap-y-1 select-none";

export function GroupHeader({ formAtoms, formIdx, optionsGroup }: TabSectionProps & { optionsGroup: OptionsGroup; }) {
    const optionsAtoms = formAtoms.optionsAtoms;
    return (<>
        <Section label="General" />
        <Part1General atoms={optionsAtoms} />
    </>);
}

export function GroupOther({ formAtoms, formIdx, optionsGroup }: TabSectionProps & { optionsGroup: OptionsGroup; }) {

    const optionsAtoms = formAtoms.optionsAtoms;
    const isWeb = useAtomValue(optionsAtoms.isWebAtom);
    const isLogin = formIdx === FormIdx.login;

    return (<>
        {/* {isLogin && (<>
            <Section label="General" />
            <Part1General atoms={optionsAtoms} />
        </>)} */}

        <Section label="Screen detection" />
        <Part2ScreenDetection atoms={optionsAtoms} />

        <Section label="Authentication" />
        <Part3Authentication atoms={optionsAtoms} />

        <Section label="Quick link" />
        <Part4QL atoms={optionsAtoms} />

        {!isWeb && (<>
            <Section label="Password Manager Icon" />
            <Part5PasswordManagerIcon atoms={optionsAtoms} />
        </>)}
    </>);
}

export function OptionsAllGroups(props: TabSectionProps & { optionsGroup: OptionsGroup; }) {
    const isHeader = props.optionsGroup === OptionsGroup.header;
    return (
        <div className={optionsAllGroupsClasses}>

            {isHeader
                ? (<>
                    <GroupHeader {...props} />
                </>)
                : (<>
                    <GroupOther {...props} />
                </>)
            }

        </div>
    );
}

//TODO: Do we need to show fields: window caption and classname if they don't have sense for web, but created w/ IE?
