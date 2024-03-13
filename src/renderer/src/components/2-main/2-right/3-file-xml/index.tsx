import { CSSProperties, Children, HTMLAttributes } from 'react';
import { ScrollArea } from '@/ui';
import { SyntaxHighlighterXml } from './syntax-highlighter-xml';
import useResizeObserver from 'use-resize-observer';
import { classNames } from '@/utils';

export function Body_Xml({ text, className, ...rest }: { text: string; } & HTMLAttributes<HTMLDivElement>) {
    const { ref, width, height } = useResizeObserver();
    return (<>
        <div className={classNames("h-full", className)} ref={ref} {...rest}>
            <ScrollArea style={{ width, height }} horizontal>
                <SyntaxHighlighterXml className="p-1 dark:opacity-60">
                    {text}
                </SyntaxHighlighterXml>
            </ScrollArea>
        </div>
    </>);
}
