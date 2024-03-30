import { HTMLAttributes } from "react";
import { useAtomValue } from "jotai";
import useResizeObserver from "use-resize-observer";
import { ScrollArea, Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui";
import { rightPanelSelectedContentAtom } from "@/store";
import { FileUs } from "@/store/store-types";
import { classNames } from "@/utils";
import { LongPanel } from "../9-nun/LongPanel";

export function FormBody_nun({ fileUs, formIdx }: { fileUs: FileUs; formIdx: number; }) {
    const title = formIdx === 0 ? 'Login' : 'Password change';
    return (
        <div className="">
            Form {title}
            {/* {fileUs.meta?.[formIdx]?.disp} */}
        </div>
    );
}

export function FormBody({ fileUs, formIdx }: { fileUs: FileUs; formIdx: number; }) {
    const { ref, width, height } = useResizeObserver();
    const title = formIdx === 0 ? 'Login' : 'Password change';
    return (
        <div className={classNames("h-full w-full")} ref={ref}>
            <ScrollArea style={{ width, height }} horizontal>
                Form {title}
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
        <Tabs defaultValue="switch1" className="mt-2 h-full">
            <TabsList>
                <TabsTrigger value="switch1" className="text-xs">Login</TabsTrigger>
                <TabsTrigger value="switch2" className="text-xs">Password change</TabsTrigger>
            </TabsList>

            <TabsContent value="switch1" className="h-full bg-red-500">
                <FormBody fileUs={fileUs} formIdx={0} />
            </TabsContent>

            <TabsContent value="switch2" className="h-full bg-green-500/40">
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
            <FormsSwitch />
        </div>
    </>);
}

// export function Body_Mani_nun({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
//     const { ref, width, height } = useResizeObserver();
//     return (<>
//         <div className={classNames("h-full w-full", className)} ref={ref} {...rest}>
//             <ScrollArea style={{ width, height }} horizontal>
//                 <MainEditor />
//             </ScrollArea>
//         </div>
//     </>);
// }
