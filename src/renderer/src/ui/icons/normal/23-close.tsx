import { HTMLAttributes, SVGAttributes } from 'react';
import { classNames } from '@/utils'; // https://heroicons.com/close

export function IconClose({ className, title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("stroke-current stroke-[1.5] fill-none", className)}  viewBox="0 0 24 24" {...rest}>
            {title && <title>{title}</title>}
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
    );
}
