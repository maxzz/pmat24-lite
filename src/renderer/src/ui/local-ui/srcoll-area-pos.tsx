import { useRef, useEffect } from "react"; //copilot: 'How to preserve scroll position of shadcn ScrollArea'
import { ScrollArea } from "@/ui/shadcn";

interface PreserveScrollAreaProps {
    children: React.ReactNode;
    className?: string;
    fullHeight?: boolean;
    fixedWidth?: boolean;
}

export function PreserveScrollArea({ children, className, fullHeight, fixedWidth }: PreserveScrollAreaProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(
        () => {
            const scrollElement = scrollRef.current;
            if (scrollElement) {
                const savedScrollPosition = sessionStorage.getItem("scrollPosition");
                if (savedScrollPosition) {
                    scrollElement.scrollTop = parseInt(savedScrollPosition, 10);
                }

                const handleScroll = () => {
                    sessionStorage.setItem("scrollPosition", scrollElement.scrollTop.toString());
                };

                scrollElement.addEventListener("scroll", handleScroll);
                return () => {
                    scrollElement.removeEventListener("scroll", handleScroll);
                };
            }
        }, []
    );

    return (
        <ScrollArea ref={scrollRef} className={className} fullHeight={fullHeight} fixedWidth={fixedWidth}>
            {children}
        </ScrollArea>
    );
}
