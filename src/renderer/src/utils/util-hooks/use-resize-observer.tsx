import { useState, useRef, useCallback } from 'react';

export function useRefSize() {
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
