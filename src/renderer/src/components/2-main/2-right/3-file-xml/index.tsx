import React, { HTMLAttributes } from 'react';
import { SyntaxHighlighterXml } from './syntax-highlighter-xml';
import { ScrollArea } from '@/ui';

export function Body_Xml({ text, ...rest }: { text: string; } & HTMLAttributes<HTMLDivElement>) {
    return (<>
        <ScrollArea>
            <SyntaxHighlighterXml>
                {text}
            </SyntaxHighlighterXml>
        </ScrollArea>
    </>);
}

//TODO: extension 'text highlight' may cause a problem when user switch manifests (this is a thirdparty problem).
