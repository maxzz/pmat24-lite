import { HTMLAttributes, SVGAttributes } from 'react';
import { classNames } from '@/utils'; // https://react-icons.github.io/react-icons/search/#q=broken PiImageBrokenThin

export function IconBrokenImage({ className, title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("stroke-none fill-current", className)} viewBox="0 0 256 256" {...rest}>
            {title && <title>{title}</title>}
            <path d="M216,44H40A12,12,0,0,0,28,56V200a12,12,0,0,0,12,12h64a4,4,0,0,0,3.79-2.74L123.21,163l38.28-15.31a4,4,0,0,0,2.22-2.22L179,107.21l46.24-15.42A4,4,0,0,0,228,88V56A12,12,0,0,0,216,44ZM118.51,156.29a4,4,0,0,0-2.3,2.45L101.12,204H40a4,4,0,0,1-4-4V170.34l53.17-53.17a4,4,0,0,1,5.66,0l34.71,34.71ZM220,85.12l-45.26,15.09a4,4,0,0,0-2.45,2.3l-15.37,38.41-19.3,7.73-37.13-37.14a12,12,0,0,0-17,0L36,159V56a4,4,0,0,1,4-4H216a4,4,0,0,1,4,4Zm6.34,33.37a4,4,0,0,0-3.6-.55l-23.81,7.93a4,4,0,0,0-2.44,2.31l-15,37.36-37.36,15a4,4,0,0,0-2.31,2.44l-7.93,23.81a4,4,0,0,0,.55,3.6,4,4,0,0,0,3.24,1.66H216a12,12,0,0,0,12-12V121.73A4,4,0,0,0,226.34,118.49ZM220,200a4,4,0,0,1-4,4H143.28l5.59-16.78,37.23-14.89a4,4,0,0,0,2.23-2.23l14.89-37.23L220,127.28Z" />
        </svg>
    );
}
