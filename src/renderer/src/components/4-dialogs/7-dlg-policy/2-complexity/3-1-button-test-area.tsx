import { PrimitiveAtom, useAtom } from "jotai";
import { Button } from "@/ui";

export function ButtonTestArea({ isTestAreaOpenAtom }: { isTestAreaOpenAtom: PrimitiveAtom<string[]>; }) {
    const [isTestAreaOpen, setIsTestAreaOpen] = useAtom(isTestAreaOpenAtom);

    return (
        <Button
            className="h-6"
            size="sm"
            onClick={() => setIsTestAreaOpen(isTestAreaOpen.length ? [] : ['policy'])}
        >
            Test area
        </Button>
    );
}
