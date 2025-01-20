import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { appSettings } from "@/store";
import { type OFormContextProps } from "@/store/1-atoms/3-file-mani-atoms";
import { Part2ScreenDetection, Part3Authentication, Part4QL, Part5PasswordManagerIcon } from "../3-sections";
import { OptionsSubSectionTitle, UiAccordion } from "../9-controls";

export function OptionsDetection(ctx: OFormContextProps) {
    const name = "detection";
    const { formIdx } = ctx.oAllAtoms.options;
    const open = useSnapshot(appSettings).right.mani.openInOptions[formIdx][name];

    return (<>
        <OptionsSubSectionTitle label="Screen detection" formIdx={formIdx} name={name} />

        <UiAccordion open={open}>
            <Part2ScreenDetection ctx={ctx} />
        </UiAccordion>
    </>);
}

export function OptionsAuth(ctx: OFormContextProps) {
    const name = "auth";
    const { formIdx } = ctx.oAllAtoms.options;
    const open = useSnapshot(appSettings).right.mani.openInOptions[formIdx][name];

    return (<>
        <OptionsSubSectionTitle label="Authentication" formIdx={formIdx} name={name} />

        <UiAccordion open={open}>
            <Part3Authentication ctx={ctx} />
        </UiAccordion>
    </>);
}

export function OptionsQuicklink(ctx: OFormContextProps) {
    const name = "ql";
    const { formIdx } = ctx.oAllAtoms.options;
    const open = useSnapshot(appSettings).right.mani.openInOptions[formIdx][name];

    return (<>
        <OptionsSubSectionTitle label="Quick link" formIdx={formIdx} name={name} />

        <UiAccordion open={open}>
            <Part4QL atoms={ctx.oAllAtoms.options} />
        </UiAccordion>
    </>);
}

export function OptionsIcon(ctx: OFormContextProps) {
    const name = "icon";
    const { formIdx, isWebAtom } = ctx.oAllAtoms.options;
    const open = useSnapshot(appSettings).right.mani.openInOptions[formIdx][name];

    const isWeb = useAtomValue(isWebAtom);
    if (isWeb) {
        return null;
    }

    return (<>
        <OptionsSubSectionTitle label="Password Manager Icon" formIdx={formIdx} name={name} />

        <UiAccordion open={open}>
            <Part5PasswordManagerIcon atoms={ctx.oAllAtoms.options} />
        </UiAccordion>
    </>);
}
