import { type HTMLAttributes, useRef, useEffect } from "react";
import { type Atom, useAtomValue } from "jotai";
import { classNames } from "@/utils";

export function ImageHolder({ imageAtom, className, ...rest }: { imageAtom: Atom<HTMLImageElement | null>; } & HTMLAttributes<HTMLDivElement>) {
    const refParent = useRef<HTMLDivElement>(null);
    const imageElm = useAtomValue(imageAtom);

    useEffect(
        () => {
            if (!refParent.current) {
                return;
            }

            let elm: HTMLElement | HTMLDivElement | null = imageElm;

            if (!elm) {
                elm = document.createElement('div');
                elm.innerText = 'Select application';
            }

            const parent = refParent.current;
            parent.appendChild(elm);

            return () => {
                parent.removeChild(elm);
            };
        }, [parent, imageElm]
    );

    // if (!imageElm) {
    //     return null;
    // }

    return (
        <div ref={refParent} className={classNames("[&>img]:size-full", className)} {...rest} />
    );
}

//TODO: add icons cache
//TODO: we need to get the website icon from the active tab for browser windows
