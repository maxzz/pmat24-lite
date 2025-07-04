import { ComponentProps, HTMLAttributes, RefObject } from "react";
import * as R from "react-resizable-panels";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import { classNames, cn } from "@/utils";

/**
 * https://github.com/bvaughn/react-resizable-panels
 */
export const ResizablePanelGroup = ({ className, ...rest }: React.ComponentProps<typeof R.PanelGroup>) => (
    <R.PanelGroup
        className={cn("w-full h-full flex data-[panel-group-direction=vertical]:flex-col", className)}
        {...rest}
    />
);

export const ResizablePanel = R.Panel;

const ResizableHandleClasses = "\
relative group w-px \
\
bg-border \
hover:bg-sky-600 transition-colors delay-[.15s] \
\
after:absolute \
after:left-1/2 \
after:-translate-x-1/2 \
after:w-1 \
after:inset-y-0 \
\
focus-visible:outline-none \
focus-visible:ring-1 \
focus-visible:ring-ring \
focus-visible:ring-offset-1 \
\
data-[panel-group-direction=vertical]:w-full \
data-[panel-group-direction=vertical]:h-px \
data-[panel-group-direction=vertical]:after:left-0 \
data-[panel-group-direction=vertical]:after:translate-x-0 \
data-[panel-group-direction=vertical]:after:-translate-y-1/2 \
data-[panel-group-direction=vertical]:after:w-full \
data-[panel-group-direction=vertical]:after:h-1 \
[&[data-panel-group-direction=vertical]>div]:rotate-90 \
\
flex items-center justify-center";

export function ResizableHandle({ className, children, ...rest }: ComponentProps<typeof R.PanelResizeHandle>) {
    return (
        <R.PanelResizeHandle className={cn(ResizableHandleClasses, className)} {...rest}>
            {children}
        </R.PanelResizeHandle>
    );
}

export function togglePanel(panel: R.ImperativePanelHandle | null) {
    panel?.[panel.isCollapsed() ? 'expand' : 'collapse']();
}

export function togglePanels(refA: RefObject<R.ImperativePanelHandle | null>, refB: RefObject<R.ImperativePanelHandle | null>, isA: boolean) {
    const a = refA?.current;
    const b = refB?.current;
    if (a && b) {
        togglePanel((!a.isCollapsed() && !b.isCollapsed() ? isA : !isA) ? a : b);
    }
};

export const toysMiddleClasses = "invisible group-hover:visible transition-all delay-150";
export const toysArrowClasses = "\
p-px size-4 \
invisible group-hover:visible transition-all delay-150 \
bg-border \
outline outline-1 outline-muted-foreground/30 \
rounded-sm";

export function ResizableHandleToys({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames("w-3 h-4 rounded-sm border bg-border flex items-center justify-center z-10", className)} {...rest}>
            <DragHandleDots2Icon className="h-2.5 w-2.5" />
        </div>
    );
}
