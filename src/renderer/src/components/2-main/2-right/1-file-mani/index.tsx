import { HTMLAttributes, ReactNode, useState } from "react";
import { PrimitiveAtom, useAtom, useAtomValue } from "jotai";
import useResizeObserver from "use-resize-observer";
import { ScrollArea, Tabs, TabsContent, TabsList, TabsTrigger, UiArrow } from "@/ui";
import { rightPanelSelectedContentAtom } from "@/store";
import { FileUs } from "@/store/store-types";
import { classNames, disableHiddenChildren } from "@/utils";
import { LongPanel } from "../9-nun/LongPanel";
import { useMeasure } from "react-use";
import { a, useSpring } from "@react-spring/web";

export function UiAccordion({ open, children }: { open: boolean, children: ReactNode; }) {
    const [refFn, { height, top }] = useMeasure<HTMLDivElement>();
    const [refEl, setEl] = useState<HTMLDivElement>();
    const [firstRun, setFirstRun] = useState(true);
    const animation = useSpring({
        height: open ? height + top : 0,
        ena: disableHiddenChildren(open, refEl),
        config: firstRun ? { duration: 0 } : { mass: 0.2, tension: 492, clamp: true },
        onRest: () => firstRun && setFirstRun(false),
    });
    return (
        <a.div style={animation} className="overflow-y-hidden smallscroll">
            <div ref={(el) => { el && (setEl(el), refFn(el)); }}>
                {children}
            </div>
        </a.div>
    );
}

function SubSectionAccordion({ label, openAtom, children }: { label: ReactNode; openAtom: PrimitiveAtom<boolean>; } & HTMLAttributes<HTMLDivElement>) {
    const [open, setOpen] = useAtom(openAtom);
    return (<>
        <div className="inline-block">
            <div className="pb-1 text-base flex items-center select-none cursor-pointer text-[#32ffdaa0]" onClick={() => setOpen(v => !v)}>
                <UiArrow className="w-4 h-4 pt-1" open={open} />
                {label}
            </div>
        </div>

        <UiAccordion open={open}>
            <div className="ml-4 pt-2 pb-4">
                {children}
            </div>
        </UiAccordion>
    </>);
}

export type ManiOpenSections = {
    form: boolean;
    fields: boolean;
    submit: boolean;
    policy: boolean;
    options: boolean;
};

function FormEditor({ fileUs, formIdx }: { fileUs: FileUs; formIdx: number; }) {
    const title = formIdx === 0 ? 'Login' : 'Password change';
    const formMeta = fileUs.meta?.[formIdx];
    return (
        <div className="">
            Form {title}
            <div className="text-mani_section-foreground/70">
                {formMeta?.disp?.domain}
                {/* <SubSectionAccordion label="Form" openAtom={formMeta?.openAtom}>
                    <div className="text-mani_section-foreground/70">
                        111
                    </div>
                </SubSectionAccordion> */}
            </div>
        </div>
    );
}

export function FormBody({ fileUs, formIdx }: { fileUs: FileUs; formIdx: number; }) {
    const { ref, width, height } = useResizeObserver();
    return (
        <div className={classNames("h-full w-full")} ref={ref}>
            <ScrollArea style={{ width, height }} horizontal>
                <FormEditor fileUs={fileUs} formIdx={formIdx} />
                <LongPanel />
            </ScrollArea>
        </div>
    );
}

export function FormsSwitch() {
    const fileUs = useAtomValue(rightPanelSelectedContentAtom);
    if (!fileUs) {
        return null;
    }
    return (
        <Tabs defaultValue="switch1" className="px-2 mt-2 h-full">
            <TabsList>
                <TabsTrigger value="switch1" className="text-xs">Login</TabsTrigger>
                <TabsTrigger value="switch2" className="text-xs">Password change</TabsTrigger>
            </TabsList>

            <TabsContent value="switch1" className="p-2 pr-1 h-full bg-muted rounded border-muted-foreground/50 border">
                <FormBody fileUs={fileUs} formIdx={0} />
            </TabsContent>

            <TabsContent value="switch2" className="p-2 pr-1 h-full bg-muted rounded border-muted-foreground/50 border">
                <FormBody fileUs={fileUs} formIdx={1} />
            </TabsContent>
        </Tabs>
    );
}

export function Body_Mani({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames("h-full w-full", className)} {...rest}>
            <FormsSwitch />
        </div>
    );
}
