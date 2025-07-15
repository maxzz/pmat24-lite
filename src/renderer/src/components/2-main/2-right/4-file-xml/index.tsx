import { type HTMLAttributes } from "react";
import { ScrollArea } from "@/ui";
import { SyntaxHighlighterXml } from "./syntax-highlighter-xml";
import useResizeObserver from "use-resize-observer";
import { classNames } from "@/utils";

/**/
export function Body_Xml({ text, className, ...rest }: { text: string; } & HTMLAttributes<HTMLDivElement>) {
    const { ref, width, height } = useResizeObserver();
    return (<>
        <div className={classNames("size-full", className)} ref={ref} {...rest}>
            <ScrollArea style={{ width, height }} horizontal>
                <SyntaxHighlighterXml className="p-1 dark:opacity-60">
                    {text}
                </SyntaxHighlighterXml>
            </ScrollArea>
        </div>
    </>);
}
/**/

/** /
// That one is not working because CSS variables will not trigger re-render on ScrollArea

export function Body_Xml({ text, className, ...rest }: { text: string; } & HTMLAttributes<HTMLDivElement>) {
    const { ref, width, height } = useResizeObserver();
    return (<>
        <ParentSize {...rest}>
            <ScrollArea style={{ width: 'var(--parent-width)', height: 'var(--parent-height)' }} horizontal>
                <SyntaxHighlighterXml className="p-1 dark:opacity-60">
                    {text}
                </SyntaxHighlighterXml>
            </ScrollArea>
        </ParentSize>
    </>);
}

export function ParentSize({ children, className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const { ref, width, height } = useResizeObserver();
    return (<>
        <div className={classNames("h-full", className)} style={{ '--parent-width': width, '--parent-height': height } as CSSProperties} ref={ref} {...rest}>
            {children}
        </div>
    </>);
}
/**/
