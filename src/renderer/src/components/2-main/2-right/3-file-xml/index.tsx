import React, { HTMLAttributes, useRef } from 'react';
import { SyntaxHighlighterXml } from './syntax-highlighter-xml';
import { ScrollArea } from '@/ui';
import useResizeObserver from 'use-resize-observer';

export function Body_Xml({ text, ...rest }: { text: string; } & HTMLAttributes<HTMLDivElement>) {
    const refRoot = useRef<HTMLDivElement | null>(null);
    const { ref: refRootCb, width, height } = useResizeObserver();
    return (<>
        <div className="h-full" ref={refRootCb}>
            <ScrollArea style={{ width, height }}>
                <SyntaxHighlighterXml className="p-1 dark:opacity-60">
                    {text}
                </SyntaxHighlighterXml>
            </ScrollArea>
        </div>
    </>);
}

//TODO: extension 'text highlight' may cause a problem when user switch manifests (this is a thirdparty problem).
