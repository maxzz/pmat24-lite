import { OptionsState } from "@/store/atoms/3-file-mani-atoms/4-options";
import { RowInputWLabel } from "../9-controls";
import { UiAccordion } from "../9-controls/ui-accordion";
import { Button } from "@/ui";
import { useState } from "react";
import { atom, useAtom } from "jotai";
import { IconSliders } from "@/ui/icons";

export function Part1General0({ atoms }: { atoms: OptionsState.Atoms; }) {
    const { nameAtom, descAtom, hintAtom, balloonAtom } = atoms.p1General;
    return (<>
        <RowInputWLabel stateAtom={nameAtom} label="Managed login name" />
        <RowInputWLabel stateAtom={descAtom} label="Description" />
        <RowInputWLabel stateAtom={hintAtom} label="User hint" />
        <RowInputWLabel stateAtom={balloonAtom} label="Show balloon" />
    </>);
}

export const SubSubGridClasses = "col-span-2 grid grid-cols-subgrid 1gap-x-2 1gap-y-px";

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

export function Part1General({ atoms }: { atoms: OptionsState.Atoms; }) {
    const { nameAtom, descAtom, hintAtom, balloonAtom } = atoms.p1General;

    const openAtom = useState(() => atom(false))[0];
    const [open, setOpen] = useAtom(openAtom);

    return (<>
        <RowInputWLabel stateAtom={nameAtom} label="Managed login name" />

        <Button className="mr-0.5 col-start-2 place-self-end" onClick={() => setOpen(v => !v)}>
            <IconSliders className="size-4 text-muted-foreground" />
        </Button>

        <UiAccordion open={open}>
            <RowInputWLabel stateAtom={descAtom} label="Description" />
            <RowInputWLabel stateAtom={hintAtom} label="User hint" />
            <RowInputWLabel stateAtom={balloonAtom} label="Show balloon" />
        </UiAccordion>
    </>);
}

//TODO: add validation
