import { useState } from "react";
import { atom, useAtomValue } from "jotai";
import { OptionsState } from "@/store/atoms/3-file-mani-atoms/4-options";
import { RowInputAndButtonWLabel, RowInputWLabel, SlidersButton, UiAccordion } from "../9-controls";

export function Part1General({ atoms }: { atoms: OptionsState.Atoms; }) {
    const { nameAtom, descAtom, hintAtom, balloonAtom } = atoms.p1General;

    const openAtom = useState(() => atom(false))[0];
    const open = useAtomValue(openAtom);

    return (<>
        <RowInputAndButtonWLabel
            label="Managed login name"
            stateAtom={nameAtom}
            button={<SlidersButton openAtom={openAtom} />}
        />

        <UiAccordion open={open}>
            <RowInputWLabel stateAtom={descAtom} label="Description" />
            <RowInputWLabel stateAtom={hintAtom} label="User hint" />
            <RowInputWLabel stateAtom={balloonAtom} label="Show balloon" />
        </UiAccordion>
    </>);
}
