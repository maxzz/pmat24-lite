import { PrimitiveAtom, useAtom } from "jotai";
import { Button } from "@/ui";
import { SymbolChevronDown } from "@/ui/icons";
import { classNames } from "@/utils";

export const inlineButtonClasses = "h-6 bg-background active:scale-[.97] cursor-pointer";

export function ButtonTestArea({ isTestAreaOpenAtom }: { isTestAreaOpenAtom: PrimitiveAtom<string[]>; }) {
    const [isTestAreaOpen, setIsTestAreaOpen] = useAtom(isTestAreaOpenAtom);
    return (
        <Button
            className={classNames(inlineButtonClasses, "px-2 space-x-0.5")}
            size="sm"
            onClick={() => setIsTestAreaOpen(isTestAreaOpen.length ? [] : ['policy'])}
        >
            <span>Test area</span>
            <SymbolChevronDown className={classNames("size-3 transition-all", isTestAreaOpen.length && "rotate-180")} />
        </Button>
    );
}
