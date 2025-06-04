import { type HTMLAttributes, type SVGAttributes } from 'react';
import { classNames } from '@/utils';

export function IconDndTarget({ className, title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("fill-none stroke-current stroke-1.5", className)} viewBox="0 0 24 24" strokeLinejoin="round" {...rest}>
            {title && <title>{title}</title>}
            {/* <path fill="#ccc" d="M0 0h24v24H0z"/> */}

            <path d="M2.58 12c0-5.2 4.22-9.42 9.42-9.42S21.42 6.8 21.42 12 17.2 21.42 12 21.42 2.58 17.2 2.58 12" className={`${line1Classes} ${width1Classes}`}/>
            <path d="M3.27 12c0-4.82 3.91-8.73 8.73-8.73s8.73 3.91 8.73 8.73-3.91 8.73-8.73 8.73S3.27 16.82 3.27 12" className={`${line2Classes} ${width1Classes}`}/>
            <path d="M5.37 12c0-3.66 2.97-6.63 6.63-6.63s6.63 2.97 6.63 6.63-2.97 6.63-6.63 6.63S5.37 15.66 5.37 12" className={`${line1Classes} ${width2Classes}`}/>
            <path d="M5.86 12c0-3.39 2.75-6.14 6.14-6.14s6.14 2.75 6.14 6.14-2.75 6.14-6.14 6.14S5.86 15.39 5.86 12" className={`${line2Classes} ${width2Classes}`}/>
            <path d="M.97 12h6.41M12 .97v6.41M23.03 12h-6.41M12 23.03v-6.41M9.71 12h4.58M12 9.71v4.58" className={`${line3Classes} ${width1Classes}`}/>
        </svg>
    );
}

const line1Classes = "[stroke-miterlimit:10] fill-none stroke-white opacity-50";
const line2Classes = "[stroke-miterlimit:10] fill-none stroke-black";
const line3Classes = "[stroke-miterlimit:10] fill-none stroke-red-500 [stroke-linecap:round] [stroke-linejoin:round]";

const width1Classes = "stroke-[.9px]";
const width2Classes = "stroke-[.9px]";
