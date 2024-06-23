import { useAtomValue } from "jotai";
import { FormAtoms, ManiAtoms, TabSectionProps } from "@/store/atoms/3-file-mani-atoms";
import { Part1General, Part2ScreenDetection, Part3Authentication, Part4QL, Part5PasswordManagerIcon } from "../3-sections";
import { SectionHeader } from "../9-controls";
import { FormIdx, OptionsGroup } from "@/store/store-types";

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

//TODO: Do we need to show fields: window caption and classname if they don't have sense for web, but created w/ IE?

const optionsAllGroupsClasses = "grid grid-cols-[auto_minmax(0,1fr)] gap-x-2 gap-y-1 select-none";

export function GroupHeader({ formAtoms, formIdx, optionsGroup }: TabSectionProps & { optionsGroup: OptionsGroup; }) {
    const optionsAtoms = formAtoms.optionsAtoms;
    return (<>
        <SectionHeader label="General" />
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

function OptionsAllGroups(props: TabSectionProps & { optionsGroup: OptionsGroup; }) {
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

type FormOptionsProps = {
    maniAtoms: ManiAtoms;
    formAtoms: FormAtoms;
    formIdx: FormIdx;
    optionsGroup: OptionsGroup;
};

function FormOptions({ maniAtoms, formAtoms, formIdx, optionsGroup }: FormOptionsProps) {
    return (
        <>
            <SectionTitle optionsGroup={optionsGroup} />
            <OptionsAllGroups maniAtoms={maniAtoms} formAtoms={formAtoms} formIdx={formIdx} optionsGroup={optionsGroup} />
        </>
    );
}

export function OptionsContent({ maniAtoms }: { maniAtoms: ManiAtoms; }) {
    const [login, cpass] = maniAtoms;
    return (
        <div className="ml-1 mr-3 flex flex-col gap-1">
            {login && (<>
                <SectionTitle optionsGroup={OptionsGroup.header} />
                <GroupHeader maniAtoms={maniAtoms} formAtoms={login} formIdx={FormIdx.login} optionsGroup={OptionsGroup.header} />

                <SectionTitle optionsGroup={OptionsGroup.login} />
                <GroupOther maniAtoms={maniAtoms} formAtoms={login} formIdx={FormIdx.login} optionsGroup={OptionsGroup.login} />
            </>)}

            {cpass && (<>
                <SectionTitle optionsGroup={OptionsGroup.header} />
                <GroupHeader maniAtoms={maniAtoms} formAtoms={cpass} formIdx={FormIdx.cpass} optionsGroup={OptionsGroup.header} />
            </>
            )}

            {/* {login && <FormOptions maniAtoms={maniAtoms} formAtoms={login} formIdx={FormIdx.login} optionsGroup={OptionsGroup.header} />}
            {login && <FormOptions maniAtoms={maniAtoms} formAtoms={login} formIdx={FormIdx.login} optionsGroup={OptionsGroup.login} />}
            {cpass && <FormOptions maniAtoms={maniAtoms} formAtoms={cpass} formIdx={FormIdx.cpass} optionsGroup={OptionsGroup.cpass} />} */}
        </div>
    );
}

