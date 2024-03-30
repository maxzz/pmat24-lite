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
        <div className="h-full w-full overflow-hidden" ref={ref}>
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
        <Tabs defaultValue="switch1" className="p-1 h-full flex flex-col">
            <TabsList className="self-center">
                <TabsTrigger value="switch1" className="text-xs">Login</TabsTrigger>
                <TabsTrigger value="switch2" className="text-xs">Password change</TabsTrigger>
            </TabsList>

            <TabsContent value="switch1" className="flex-1 min-h-0 mt-1 p-2 pr-1 bg-muted rounded border-muted-foreground/50 border">
                <FormBody fileUs={fileUs} formIdx={0} />
            </TabsContent>

            <TabsContent value="switch2" className="flex-1 min-h-0 mt-1 p-2 pr-1 bg-muted rounded border-muted-foreground/50 border">
                <FormBody fileUs={fileUs} formIdx={1} />
            </TabsContent>
        </Tabs>
    );
}

export function Body_Mani({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames("w-full h-full", className)} {...rest}>
            <FormsSwitch />
        </div>
    );
}
