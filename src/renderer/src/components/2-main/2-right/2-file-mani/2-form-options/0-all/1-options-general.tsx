import { OptionsState, TabSectionProps } from "@/store/atoms/3-file-mani-atoms";
import { RowInputAndButtonWLabel, RowInputWLabel, SlidersButton, SubSectionTitle, SubSectionTitle0, UiAccordion } from "../9-controls";
import { atom, useAtomValue } from "jotai";
import { useState } from "react";
import { Part1General } from "../3-sections";

export function Part1GeneralTrigger({ atoms }: { atoms: OptionsState.Atoms; }) {
    const { nameAtom } = atoms.p1General;

    const openAtom = useState(() => atom(false))[0];
    const open = useAtomValue(openAtom);

    return (<>
        <RowInputAndButtonWLabel
            label="Managed login name"
            stateAtom={nameAtom}
            button={<SlidersButton openAtom={openAtom} />}
        />

        <UiAccordion open={open}>
            <Part1General atoms={atoms} />
        </UiAccordion>
    </>);
}

export function GroupGeneral({ formAtoms }: TabSectionProps) {
    const optionsAtoms = formAtoms.optionsAtoms;
    return (<>
        <SubSectionTitle0 label="General" />
        <Part1GeneralTrigger atoms={optionsAtoms} />
    </>);
}
