import { HTMLAttributes, ReactNode } from "react";
import { useSnapshot } from "valtio";
import { UiAccordion } from "./1-accordion";
import { UiArrow } from "@/ui";
import { ManiOpenSectionKey, maniOpenSections } from "./0-open-section-types";

export function SubSectionAccordion({ label, children, openKey }: { label: ReactNode; openKey: ManiOpenSectionKey; } & HTMLAttributes<HTMLDivElement>) {
    const open = useSnapshot(maniOpenSections)[openKey];
    const setOpen = (v: boolean) => maniOpenSections[openKey] = v;
    return (<>
        <div className="pb-1 text-base flex items-center select-none cursor-pointer text-mani_section-foreground/70" onClick={() => setOpen(!open)}>
            <UiArrow className="w-4 h-4 pt-1" open={open} />
            {label}
        </div>

        <UiAccordion open={open}>
            <div className="ml-4 pt-2 pb-4">
                {children}
            </div>
        </UiAccordion>
    </>);
}
