import { useAtomValue } from "jotai";
import { ManiAtoms, TabSectionProps } from "@/store/atoms/3-file-mani-atoms";
import { FormIdx, OptionsGroup } from "@/store/store-types";
import { Part1General, Part2ScreenDetection, Part3Authentication, Part4QL, Part5PasswordManagerIcon } from "../3-sections";
import { SectionHeader } from "../9-controls";

//TODO: Do we need to show fields: window caption and classname if they don't have sense for web, but created w/ IE?

function GroupHeader({ formAtoms }: TabSectionProps) {
    const optionsAtoms = formAtoms.optionsAtoms;
    return (<>
        <SectionHeader label="General" />
        <Part1General atoms={optionsAtoms} />
    </>);
}

function GroupLogin({ formAtoms }: TabSectionProps) {

    const optionsAtoms = formAtoms.optionsAtoms;
    const isWeb = useAtomValue(optionsAtoms.isWebAtom);

    return (<>
        <SectionHeader label="Screen detection" />
        <Part2ScreenDetection atoms={optionsAtoms} />

        <SectionHeader label="Authentication" />
        <Part3Authentication atoms={optionsAtoms} />

        <SectionHeader label="Quick link" />
        <Part4QL atoms={optionsAtoms} />

        {!isWeb && (<>
            <SectionHeader label="Password Manager Icon" />
            <Part5PasswordManagerIcon atoms={optionsAtoms} />
        </>)}
    </>);
}

function GroupCpass({ formAtoms }: TabSectionProps) {

    const optionsAtoms = formAtoms.optionsAtoms;
    const isWeb = useAtomValue(optionsAtoms.isWebAtom);

    return (<>
        <SectionHeader label="Screen detection" />
        <Part2ScreenDetection atoms={optionsAtoms} />

        <SectionHeader label="Authentication" />
        <Part3Authentication atoms={optionsAtoms} />

        <SectionHeader label="Quick link" />
        <Part4QL atoms={optionsAtoms} />

        {!isWeb && (<>
            <SectionHeader label="Password Manager Icon" />
            <Part5PasswordManagerIcon atoms={optionsAtoms} />
        </>)}
    </>);
}

function SectionTitle({ optionsGroup }: { optionsGroup: OptionsGroup; }) {
    const title =
        optionsGroup === OptionsGroup.header
            ? 'Manifest options'
            : optionsGroup === OptionsGroup.login
                ? 'Login form options'
                : 'Change password form options';
    return (
        <div className="mt-2 first:mt-0 text-sm font-semibold">
            {title}
        </div>
    );
}

const optionsAllGroupsClasses = "ml-1 mr-3 grid grid-cols-[auto_minmax(0,1fr)] gap-x-2 gap-y-1 select-none";

export function OptionsContent({ maniAtoms }: { maniAtoms: ManiAtoms; }) {
    const [login, cpass] = maniAtoms;
    return (
        <div className={optionsAllGroupsClasses}>
            {login && (<>
                <SectionTitle optionsGroup={OptionsGroup.header} />
                <GroupHeader maniAtoms={maniAtoms} formAtoms={login} formIdx={FormIdx.login} />

                <SectionTitle optionsGroup={OptionsGroup.login} />
                <GroupLogin maniAtoms={maniAtoms} formAtoms={login} formIdx={FormIdx.login} />
            </>)}

            {cpass && (<>
                <SectionTitle optionsGroup={OptionsGroup.header} />
                <GroupCpass maniAtoms={maniAtoms} formAtoms={cpass} formIdx={FormIdx.cpass} />
            </>)}
        </div>
    );
}
