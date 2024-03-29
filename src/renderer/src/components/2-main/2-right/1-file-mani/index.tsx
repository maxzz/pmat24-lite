import { HTMLAttributes } from "react";
import useResizeObserver from "use-resize-observer";
import { ScrollArea, Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui";
import { classNames } from "@/utils";

export function FormsSwitch() {
    return (
        <Tabs defaultValue="switch1">
            <TabsList>
                <TabsTrigger value="switch1">Login</TabsTrigger>
                <TabsTrigger value="switch2">Password change</TabsTrigger>
            </TabsList>

            <TabsContent value="switch1">
                <div className="">Form1</div>
            </TabsContent>

            <TabsContent value="switch2">
                <div className="">Form2</div>
            </TabsContent>
        </Tabs>
    );
}

function MainEditor() {
    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex-1 h-0">
                <FormsSwitch />
                
                <div className="">
                    Mani
                </div>
            </div>
        </div>
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
