import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { FocusScope } from "@radix-ui/react-focus-scope";

const items = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`);

export function ListViewCo() {
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (focusedIndex === null) {
            return;
        }

        if (event.key === 'ArrowDown') {
            setFocusedIndex((prev) => (prev !== null ? Math.min(prev + 1, items.length - 1) : 0));
        }
        else if (event.key === 'ArrowUp') {
            setFocusedIndex((prev) => (prev !== null ? Math.max(prev - 1, 0) : 0));
        }
    };

    useEffect(
        () => {
            if (focusedIndex !== null && itemRefs.current[focusedIndex]) {
                itemRefs.current[focusedIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }, [focusedIndex]
    );

    return (
        <FocusScope>
            <ScrollArea className="h-64 w-64 border border-gray-300 rounded-md overflow-auto">
                <div
                    className="focus:outline-hidden"
                    onKeyDown={handleKeyDown}
                    tabIndex={0}
                >
                    {items.map(
                        (item, index) => (
                            <div
                                ref={(el) => { itemRefs.current[index] = el; }}
                                className={`p-2 ${focusedIndex === index ? 'bg-blue-500 text-white' : 'bg-white'}`}
                                onFocus={() => setFocusedIndex(index)}
                                tabIndex={-1}
                                key={index}
                            >
                                {item}
                            </div>
                        )
                    )}
                </div>
            </ScrollArea>
        </FocusScope>
    );
}
