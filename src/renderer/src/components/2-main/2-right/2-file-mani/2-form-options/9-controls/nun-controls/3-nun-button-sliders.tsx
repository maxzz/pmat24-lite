import { PrimitiveAtom, useSetAtom } from "jotai";
import { Button } from "@/ui";
import { IconSliders } from "@/ui/icons";

export function ButtonSliders({ openAtom }: { openAtom: PrimitiveAtom<boolean>; }) {
    const setOpen = useSetAtom(openAtom);
    return (
        <Button className="mr-0.5 col-start-2 place-self-end" onClick={() => setOpen(v => !v)}>
            <IconSliders className="size-4 text-muted-foreground" />
        </Button>
    );
}
