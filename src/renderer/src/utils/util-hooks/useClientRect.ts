import { useCallback, useState } from "react";

export function useClientRect<T extends HTMLElement = HTMLElement>(): readonly [(node: T) => void, DOMRect | null] {
    const [rect, setRect] = useState<DOMRect | null>(null);

    const ref = useCallback(
        (node: T) => {
            node && setRect(node.getBoundingClientRect());
        }, []
    );

    return [ref, rect] as const;
}
