import { useAtomValue } from "jotai";
import { ManiAtoms, TabSectionProps } from "@/store/atoms/3-file-mani-atoms";
import { FormIdx } from "@/store/store-types";
import { Part1General, Part2ScreenDetection, Part3Authentication, Part4QL, Part5PasswordManagerIcon } from "../3-sections";
import { SectionTitle, SubSectionTitle } from "../9-controls";

//TODO: Do we need to show fields: window caption and classname if they don't have sense for web, but created w/ IE?

function GroupGeneral({ formAtoms }: TabSectionProps) {
    const optionsAtoms = formAtoms.optionsAtoms;
    return (<>
        <SubSectionTitle label="General" />
        <Part1General atoms={optionsAtoms} />
    </>);
}

function GroupLogin({ formAtoms }: TabSectionProps) {

    const optionsAtoms = formAtoms.optionsAtoms;
    const isWeb = useAtomValue(optionsAtoms.isWebAtom);

    return (<>
        <SubSectionTitle label="Screen detection" />
        <Part2ScreenDetection atoms={optionsAtoms} />

        <SubSectionTitle label="Authentication" />
        <Part3Authentication atoms={optionsAtoms} />

        <SubSectionTitle label="Quick link" />
        <Part4QL atoms={optionsAtoms} />

        {!isWeb && (<>
            <SubSectionTitle label="Password Manager Icon" />
            <Part5PasswordManagerIcon atoms={optionsAtoms} />
        </>)}
    </>);
}

function GroupCpass({ formAtoms }: TabSectionProps) {

    const optionsAtoms = formAtoms.optionsAtoms;
    const isWeb = useAtomValue(optionsAtoms.isWebAtom);

    return (<>
        <SubSectionTitle label="Screen detection" />
        <Part2ScreenDetection atoms={optionsAtoms} />

        <SubSectionTitle label="Authentication" />
        <Part3Authentication atoms={optionsAtoms} />

        <SubSectionTitle label="Quick link" />
        <Part4QL atoms={optionsAtoms} />

        {!isWeb && (<>
            <SubSectionTitle label="Password Manager Icon" />
            <Part5PasswordManagerIcon atoms={optionsAtoms} />
        </>)}
    </>);
}

const optionsAllGroupsClasses = "ml-1 mr-3 grid grid-cols-[auto_minmax(0,1fr)] gap-x-2 gap-y-1 select-none";

export function OptionsContent({ maniAtoms }: { maniAtoms: ManiAtoms; }) {
    const [login, cpass] = maniAtoms;
    return (
        <div className={optionsAllGroupsClasses}>
            {login && (<>
                <SectionTitle label="Manifest options" />
                <GroupGeneral maniAtoms={maniAtoms} formAtoms={login} formIdx={FormIdx.login} />

                <SectionTitle label="Login form options" />
                <GroupLogin maniAtoms={maniAtoms} formAtoms={login} formIdx={FormIdx.login} />
            </>)}

            {cpass && (<>
                <SectionTitle label="Change password form options" />
                <GroupCpass maniAtoms={maniAtoms} formAtoms={cpass} formIdx={FormIdx.cpass} />
            </>)}
        </div>
    );
}
