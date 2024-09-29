import { useState } from "react";
import { PrimitiveAtom, atom, useAtomValue } from "jotai";
import { OFormContextProps } from "@/store/atoms/3-file-mani-atoms";
import { RowInputAndButtonWTitle, ButtonSliders, UiAccordion } from "../9-controls";
import { Part1General } from "../3-sections";

function Part1GeneralTrigger({ ctx, openAtom }: { ctx: OFormContextProps; openAtom: PrimitiveAtom<boolean>; }) {
    const { nameAtom } = ctx.formAtoms.options.p1General;
    const open = useAtomValue(openAtom);
    return (<>
        <RowInputAndButtonWTitle
            label="Managed login name"
            stateAtom={nameAtom}
            button={<ButtonSliders openAtom={openAtom} />}
        />

        <UiAccordion open={open}>
            <Part1General ctx={ctx} />
        </UiAccordion>
    </>);
}

export function GroupGeneral({ ctx }: { ctx: OFormContextProps; }) {

    const openAtom = useState(() => atom(false))[0];
    return (<>
        {/* <SubSectionTitle0 label="General" /> */}
        <Part1GeneralTrigger ctx={ctx} openAtom={openAtom} />
    </>);
}
