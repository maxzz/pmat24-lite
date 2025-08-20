import { useState, useRef, useCallback, useEffect } from "react";
/*
export function useRefSize2() { //https://github.com/ZeeCoder/use-resize-observer/issues/108
    const [size, setSize] = useState<DOMRect>(defaultRect);
    const observerRef = useRef<ResizeObserver | null>(null);

    console.log('useRefSize');

    const refCallback = useCallback((node: HTMLElement | null) => {
        if (observerRef.current) {
            observerRef.current.disconnect();
            observerRef.current = null;
        }

        console.log('useRefSize', node);


        if (node) {
            const updateSize = () => {
                const rect = node.getBoundingClientRect();
                setSize(rect);
            };

            updateSize();

            const observer = new ResizeObserver(() => {
                updateSize();
            });

            observer.observe(node);
            observerRef.current = observer;
        }
    }, []);

    return [refCallback, size] as const;
}

const defaultRect = { x: 0, y: 0, width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0 } as DOMRect;

export const useRefSize = <T extends React.RefObject<Element | null>>(target: T) => {
    const [size, setSize] = useState<DOMRect>(defaultRect);

    const updateSize = useCallback(() => {
        if (target.current) {
            const size = target.current.getBoundingClientRect();
            setSize(size);
        }
    }, [target]);

    useEffect(() => {
        const { current } = target;

        updateSize();

        const observer = new ResizeObserver((entries) => {
            if (entries.length > 0) {
                updateSize();
            }
        });

        if (current) {
            observer.observe(current);
        }

        return () => {
            if (current) {
                observer.unobserve(current);
            }

            observer.disconnect();
        };
    }, [target, updateSize]);

    return size;
};
*/