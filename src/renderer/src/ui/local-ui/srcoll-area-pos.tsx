import { useRef, useEffect } from "react"; //copilot: 'How to preserve scroll position of shadcn ScrollArea'
import { ScrollArea2 } from "@/ui/shadcn";

export type PosStorage = {
    name: string;
    getTop: (name: string) => string | undefined | null;
    setTop: (name: string, top: number) => void;
}

interface PreserveScrollAreaProps {
    children: React.ReactNode;
    className?: string;
    fullHeight?: boolean;
    fixedWidth?: boolean;
    storage: PosStorage;
}

export function PreserveScrollArea({ storage, ...rest }: PreserveScrollAreaProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(
        () => {
            const scrollElement = scrollRef.current;
            if (scrollElement) {
                const savedPos = storage.getTop(storage.name);
                if (savedPos) {
                    const pos = parseInt(savedPos, 10);
                    if (!isNaN(pos)) {
                        scrollElement.scrollTop = pos;
                    }
                }

                const handleScroll = () => {
                    storage.setTop(storage.name, scrollElement.scrollTop);
                };

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
