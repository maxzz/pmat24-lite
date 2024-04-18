import { HTMLAttributes, SVGAttributes } from 'react';

export function SvgSymbolAppWebIe() {
    return (<>
        {/* ie outline w/ stroke */}
        <symbol id="app-web-ie" viewBox="0 0 24 24">
            <path d="M22.07 7.45c2.08-4.89-2.23-5.69-4.48-3.69-.09.08-.09.18.15.3 3.85 1.84 5.67 5.1 5.42 9.23-5.13.13-9.8.15-14.66.15-.26 0-.58.06-.49.38.7 3.99 5.86 5.71 8.83 2.97.21-.2.37-.4.69-.36h4.79c.13 0 .15.03.09.14-3.04 7.47-13.34 7.9-17.39 1.64-.41-.63-.26-.33-.41-.63-.2-.4-.25-.58-.51-.23-.81 1.12-1.77 2.63-1.09 4.03.88 1.83 2.66.8 5.22.05-5.48 2.57-7.89 1.43-7.17-3.3A17.98 17.98 0 0 1 9.79 5.87c.01-.03 0-.05-.02-.07-2.51 1.3-4.72 4.03-5.94 5.64-.06.06-.09.09-.17.1 1.03-5.59 6.51-8.89 10.52-8.74 2.44-1.38 7.75-3.56 8.63.54.05.34.3 2.51-.74 4.11Zm-3.9 4.3c.25 0 .37-.16.31-.41-1.22-5.19-9.13-5.25-10.4-.05-.09.3.03.46.34.46h9.75Z" />
        </symbol>

    </>);
}

export function SymbolAppWebIE({ title, children, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        // TODO: use prev solid version for title and outline for buttons: // <svg fill="currentColor" stroke="black" strokeWidth={.7} {...rest}>

        <svg fill="none" stroke="currentColor" strokeWidth={.8} {...rest}>
            {title && <title>{title}</title>}
            {children}
            <use xlinkHref="#app-web-ie" />
        </svg>
    );
}
