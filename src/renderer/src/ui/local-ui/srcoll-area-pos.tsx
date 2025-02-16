import { useRef, useEffect } from "react"; //copilot: 'How to preserve scroll position of shadcn ScrollArea'
import { ScrollArea2 } from "@/ui/shadcn";

interface PreserveScrollAreaProps {
    children: React.ReactNode;
    className?: string;
    fullHeight?: boolean;
    fixedWidth?: boolean;
    storage: PositionStorage;
}

export function PreserveScrollArea({ storage, ...rest }: PreserveScrollAreaProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(
        () => {
            const scrollElement = scrollRef.current;
            if (scrollElement) {

                const savedPos = storage.getTop();
                if (savedPos) {
                    const pos = parseInt(savedPos, 10);
                    if (!isNaN(pos)) {
                        scrollElement.scrollTop = pos;
                    }
                }

                const handleScroll = () => storage.setTop(scrollElement.scrollTop);

                scrollElement.addEventListener("scroll", handleScroll);
                return () => {
                    scrollElement.removeEventListener("scroll", handleScroll);
                };
            }
        }, []
    );

    return (
        <ScrollArea2 ref={scrollRef} {...rest} />
    );
}

// Position Storage //TODO: add left position as well

export type PositionStorage = {
    getTop: () => string | undefined | null;
    setTop: (top: number) => void;
}

export function createSessionStorage(name: string): PositionStorage {
    const storage: PositionStorage = {
        getTop: () => localStorage.getItem(name),
        setTop: (top: number) => localStorage.setItem(name, top.toString()),
    };
    return storage;
}

export function createVarStorage(): PositionStorage {
    const rv: PositionStorage & { pos: string; } = {
        pos: '0',
        getTop: () => rv.pos,
        setTop: (top: number) => rv.pos = top.toString(),
    };
    return rv;
}
