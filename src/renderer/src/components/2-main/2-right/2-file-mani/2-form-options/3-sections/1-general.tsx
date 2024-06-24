import { useState } from "react";
import { PrimitiveAtom, atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { OptionsState } from "@/store/atoms/3-file-mani-atoms/4-options";
import { Button } from "@/ui";
import { IconSliders } from "@/ui/icons";
import { RowInputAndButtonWLabel, RowInputWLabel, UiAccordion } from "../9-controls";

/*
export function Part1General0({ atoms }: { atoms: OptionsState.Atoms; }) {
    const { nameAtom, descAtom, hintAtom, balloonAtom } = atoms.p1General;
    return (<>
        <RowInputWLabel stateAtom={nameAtom} label="Managed login name" />
        <RowInputWLabel stateAtom={descAtom} label="Description" />
        <RowInputWLabel stateAtom={hintAtom} label="User hint" />
        <RowInputWLabel stateAtom={balloonAtom} label="Show balloon" />
    </>);
}

export function Part1General1({ atoms }: { atoms: OptionsState.Atoms; }) {
    const { nameAtom, descAtom, hintAtom, balloonAtom } = atoms.p1General;
    return (
        <div className={SubSubGridClasses}>
            <RowInputWLabel stateAtom={nameAtom} label="Managed login name" />
            <RowInputWLabel stateAtom={descAtom} label="Description" />
            <RowInputWLabel stateAtom={hintAtom} label="User hint" />
            <RowInputWLabel stateAtom={balloonAtom} label="Show balloon" />
        </div>
    );
}

export function Part1General2({ atoms }: { atoms: OptionsState.Atoms; }) {
    const { nameAtom, descAtom, hintAtom, balloonAtom } = atoms.p1General;
    return (
        <UiAccordion open={true}>
            <RowInputWLabel stateAtom={nameAtom} label="Managed login name" />
            <RowInputWLabel stateAtom={descAtom} label="Description" />
            <RowInputWLabel stateAtom={hintAtom} label="User hint" />
            <RowInputWLabel stateAtom={balloonAtom} label="Show balloon" />
        </UiAccordion>
    );
}
*/

function SlidersButton({ openAtom }: { openAtom: PrimitiveAtom<boolean>; }) {
    const setOpen = useSetAtom(openAtom);
    return (
        <Button className="mr-0.5 col-start-2 place-self-end" onClick={() => setOpen(v => !v)}>
            <IconSliders className="size-4 text-muted-foreground" />
        </Button>
    );
}

export function Part1General({ atoms }: { atoms: OptionsState.Atoms; }) {
    const { nameAtom, descAtom, hintAtom, balloonAtom } = atoms.p1General;

    const openAtom = useState(() => atom(false))[0];
    const open = useAtomValue(openAtom);

    return (<>
        <RowInputAndButtonWLabel stateAtom={nameAtom} label="Managed login name" button={<SlidersButton openAtom={openAtom} />} />

        <UiAccordion open={open}>
            <RowInputWLabel stateAtom={descAtom} label="Description" />
            <RowInputWLabel stateAtom={hintAtom} label="User hint" />
            <RowInputWLabel stateAtom={balloonAtom} label="Show balloon" />
        </UiAccordion>
    </>);
}

//TODO: add validation
