import { useAtomValue, useAtom } from "jotai";
import { type NFormContextProps } from "@/store/atoms/3-file-mani-atoms";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/ui/shadcn/select";

function ManiSection2_Submit({ ctx }: { ctx: NFormContextProps; }) {

    const buttonNameItems = useAtomValue(ctx.formAtoms.normal.submitAtoms.buttonNameItemsAtom);
    const [selected, setSelected] = useAtom(ctx.formAtoms.normal.submitAtoms.selectedAtom);

    return (
        <Select value={selected.toString()} onValueChange={(value) => setSelected(+value) }>

            <SelectTrigger className="px-2 py-1 w-max text-xs gap-1">
                <SelectValue placeholder={"Don't submit"} />
            </SelectTrigger>

            <SelectContent align="start">
                <SelectGroup>
                    {buttonNameItems.map(
                        ({ name }, idx) => (
                            <SelectItem className="text-xs" value={idx.toString()} indicatorFirst key={idx}>
                                {name}
                            </SelectItem>
                        ))
                    }
                </SelectGroup>
            </SelectContent>

        </Select>
    );
}

export function TabSubmit({ ctx }: { ctx: NFormContextProps; }) {
    //const metaForm = formAtoms.fileUsCtx.fileUs.meta?.[formIdx]!; // We are under FormEditor umbrella, so we can safely use ! here
    return (
        <div className="p-1">
            <ManiSection2_Submit ctx={ctx} />
        </div>
    );
}
