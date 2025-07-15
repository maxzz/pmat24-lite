import { RefObject, useEffect, useRef } from "react";
import { on, off } from "react-use/esm/misc/util";

const defaultEvents = ['mousedown', 'touchstart'];

export function useClickAway<E extends Event = Event>(ref: RefObject<HTMLElement | null>, onClickAway: (event: E) => void, events: string[] = defaultEvents): void {
    const savedCallback = useRef(onClickAway);

    useEffect(
        () => {
            savedCallback.current = onClickAway;
        }, [onClickAway]
    );

    useEffect(
        () => {
            const handler = (event: E) => {
                const { current: el } = ref;
                el && !el.contains(event.target as Node) && savedCallback.current(event);
            };

            for (const eventName of events) {
                on(document, eventName, handler);
            }

            return () => {
                for (const eventName of events) {
                    off(document, eventName, handler);
                }
            };
        }, [events, ref]
    );
}

export function useElementClickAway<E extends Event = Event>(el: HTMLElement | null, onClickAway: (event: E) => void, events: string[] = defaultEvents): void {
    const savedCallback = useRef(onClickAway);

    useEffect(
        () => {
            savedCallback.current = onClickAway;
        }, [onClickAway]
    );

    useEffect(
        () => {
            const handler = (event: E) => {
                el && !el.contains(event.target as Node) && savedCallback.current(event);
            };

            for (const eventName of events) {
                on(document, eventName, handler);
            }
            
            return () => {
                for (const eventName of events) {
                    off(document, eventName, handler);
                }
            };
        }, [events, el]
    );
}
