import React from 'react';
import { SyntaxHighlighterProps } from 'react-syntax-highlighter';
import { default as SyntaxHighlighter } from 'react-syntax-highlighter/dist/esm/light';
import xml from 'react-syntax-highlighter/dist/esm/languages/hljs/xml';
//import theme from './highlight-night-owl';
import './highlight-inline.css';

SyntaxHighlighter.registerLanguage('xml', xml); /* cannot use lazy load */

export function SyntaxHighlighterXml({ children, ...rest }: SyntaxHighlighterProps) {
    return (
        // <SyntaxHighlighter language='xml' style={theme} {...rest}>
        <SyntaxHighlighter language='xml' useInlineStyles={false} {...rest}>
            {children}
        </SyntaxHighlighter>
    );
}
