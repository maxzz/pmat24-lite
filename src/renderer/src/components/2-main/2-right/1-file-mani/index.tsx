import { HTMLAttributes } from "react";
import { useAtomValue } from "jotai";
import useResizeObserver from "use-resize-observer";
import { ScrollArea, Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui";
import { rightPanelSelectedContentAtom } from "@/store";
import { FileUs } from "@/store/store-types";
import { classNames } from "@/utils";
import { LongPanel } from "../9-nun/LongPanel";

function FormEditor({ fileUs, formIdx }: { fileUs: FileUs; formIdx: number; }) {
    const title = formIdx === 0 ? 'Login' : 'Password change';
    const formMeta = fileUs.meta?.[formIdx];
    return (
        <div className="">
            Form {title}
            <div className="text-mani_section-foreground/70">
                {formMeta?.disp?.domain}
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
