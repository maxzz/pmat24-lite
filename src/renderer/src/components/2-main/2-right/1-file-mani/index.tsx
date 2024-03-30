import { HTMLAttributes } from "react";
import { PrimitiveAtom, useAtom, useAtomValue } from "jotai";
import useResizeObserver from "use-resize-observer";
import { ScrollArea, Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui";
import { rightPanelSelectedContentAtom } from "@/store";
import { FileUs } from "@/store/store-types";
import { classNames } from "@/utils";
import { LongPanel } from "../9-nun/LongPanel";
import { SubSectionAccordion } from "./1-sub-section-accordion";

function FormEditor({ fileUs, formIdx }: { fileUs: FileUs; formIdx: number; }) {
    const title = formIdx === 0 ? 'Login' : 'Password change';
    const formMeta = fileUs.meta?.[formIdx];
    return (
        <div className="flex flex-col">
            Form {title}

            <div>
                {formMeta?.disp?.domain}

                <SubSectionAccordion label="Form" openKey="fields">
                    <div>
                        111
                    </div>
                </SubSectionAccordion>
            </div>

            <LongPanel />
        </div>
    );
}

export function FormBody({ fileUs, formIdx }: { fileUs: FileUs; formIdx: number; }) {
    const { ref, width, height } = useResizeObserver();
    return (
        <div className={classNames("h-full w-full")} ref={ref}>
            <ScrollArea style={{ width, height }} horizontal>
                <FormEditor fileUs={fileUs} formIdx={formIdx} />
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
        <Tabs defaultValue="switch1" className="px-2 py-2 h-full flex flex-col">
            <TabsList className="1mt-2">
                <TabsTrigger value="switch1" className="text-xs">Login</TabsTrigger>
                <TabsTrigger value="switch2" className="text-xs">Password change</TabsTrigger>
            </TabsList>

            <TabsContent value="switch1" className="p-2 pr-1 flex-1 1h-full min-h-0 bg-muted rounded border-muted-foreground/50 border">
                <FormBody fileUs={fileUs} formIdx={0} />
            </TabsContent>

            <TabsContent value="switch2" className="1p-2 pr-1 h-full bg-muted rounded border-muted-foreground/50 border">
                {/* <FormBody fileUs={fileUs} formIdx={1} /> */}
            </TabsContent>
        </Tabs>
    );
}

export function Body_Mani({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames("1my-8 w-full h-full", className)} {...rest}>
            <FormsSwitch />
        </div>
    );
}
