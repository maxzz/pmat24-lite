import { useState } from "react";
import { PrimitiveAtom, atom, useAtomValue } from "jotai";
import { OptionsState, TabSectionProps } from "@/store/atoms/3-file-mani-atoms";
import { RowInputAndButtonWLabel, SlidersButton, SubSectionTitle0, UiAccordion } from "../9-controls";
import { Part1General } from "../3-sections";

function Part1GeneralTrigger({ atoms, openAtom }: { atoms: OptionsState.Atoms; openAtom: PrimitiveAtom<boolean>; }) {
    const { nameAtom } = atoms.p1General;
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
    const { optionsAtoms } = formAtoms;
    const { formIdx } = optionsAtoms;

    const openAtom = useState(() => atom(false))[0];
    return (<>
        {/* <SubSectionTitle0 label="General" /> */}
        {/* <Part1GeneralTrigger atoms={optionsAtoms} openAtom={openAtom} /> */}
    </>);
}
