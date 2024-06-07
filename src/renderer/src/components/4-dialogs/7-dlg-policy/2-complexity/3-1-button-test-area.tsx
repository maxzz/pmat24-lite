import { PrimitiveAtom, useAtom } from "jotai";
import { Button } from "@/ui";

export const inlineButtonClasses = "h-6 bg-background";

export function ButtonTestArea({ isTestAreaOpenAtom }: { isTestAreaOpenAtom: PrimitiveAtom<string[]>; }) {
    const [isTestAreaOpen, setIsTestAreaOpen] = useAtom(isTestAreaOpenAtom);

    return (
        <Button
            className={inlineButtonClasses}
            size="sm"
            onClick={() => setIsTestAreaOpen(isTestAreaOpen.length ? [] : ['policy'])}
        >
            Test area
        </Button>
    );
}
