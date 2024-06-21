import { useAtomValue } from "jotai";
import { TabSectionProps } from "@/store/atoms/3-file-mani-atoms";
import { Part1General, Part2ScreenDetection, Part3Authentication, Part4QL, Part5PasswordManagerIcon } from "../3-sections";
import { Section } from "../4-controls";
import { FormIdx, OptionsGroup } from "@/store/store-types";

const optionsAllGroupsClasses = "grid grid-cols-[auto_minmax(0,1fr)] gap-x-2 gap-y-1 select-none";

export function GroupHeader({ formAtoms, formIdx, optionsGroup }: TabSectionProps & { optionsGroup: OptionsGroup; }) {

    const optionsAtoms = formAtoms.optionsAtoms;
    const isWeb = useAtomValue(optionsAtoms.isWebAtom);

    return (<>
        <Section label="General" />
        <Part1General atoms={optionsAtoms} />
    </>);
}


export function OptionsAllGroups(props: TabSectionProps & { optionsGroup: OptionsGroup; }) {

    const { formAtoms, formIdx, optionsGroup } = props;

    const optionsAtoms = formAtoms.optionsAtoms;
    const isWeb = useAtomValue(optionsAtoms.isWebAtom);
    const isLogin = formIdx === FormIdx.login;

    // if (optionsGroup === OptionsGroup.header) {
    //     return <GroupHeader {...props} />;
    // }

    return (
        <div className={optionsAllGroupsClasses}>

            {optionsGroup === OptionsGroup.header && (<>
                <GroupHeader {...props} />
            </>)}

            {isLogin && (<>
                <Section label="General" />
                <Part1General atoms={optionsAtoms} />
            </>)}

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
        </div>
    );
}

//TODO: Do we need to show fields: window caption and classname if they don't have sense for web, but created w/ IE?
