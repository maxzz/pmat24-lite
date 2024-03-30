import { HTMLAttributes } from "react";
import useResizeObserver from "use-resize-observer";
import { FileUs } from "@/store/store-types";
import { ScrollArea, Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui";
import { classNames } from "@/utils";
import { useAtomValue } from "jotai";
import { rightPanelSelectedContentAtom } from "@/store";
import { LongPanel } from "../9-nun/LongPanel";

export function FormBody({ fileUs, formIdx }: { fileUs: FileUs; formIdx: number; }) {
    const title = formIdx === 0 ? 'Login' : 'Password change';
    return (
        <div className="">
            Form {title}
            {/* {fileUs.meta?.[formIdx]?.disp} */}
        </div>
    );
}

export function FormsSwitch() {
    const fileUs = useAtomValue(rightPanelSelectedContentAtom);
    if (!fileUs) {
        return null;
    }
    return (
        <Tabs defaultValue="switch1" className="mt-2 h-full">
            <TabsList>
                <TabsTrigger value="switch1">Login</TabsTrigger>
                <TabsTrigger value="switch2">Password change</TabsTrigger>
            </TabsList>

            <TabsContent value="switch1" className="h-full bg-red-500">
                <FormBody fileUs={fileUs} formIdx={0} />
                <LongPanel />
            </TabsContent>

            <TabsContent value="switch2">
                <FormBody fileUs={fileUs} formIdx={1} />
            </TabsContent>
        </Tabs>
    );
}

function MainEditor() {
    return (
        <FormsSwitch />
    );
}

export function Body_Mani({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const { ref, width, height } = useResizeObserver();
    return (<>
        <div className={classNames("h-full w-full", className)} ref={ref} {...rest}>
            <ScrollArea style={{ width, height }} horizontal>
                <MainEditor />
            </ScrollArea>
        </div>
    </>);
}
