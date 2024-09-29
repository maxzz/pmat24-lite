import { useAtomValue, useAtom } from "jotai";
import { type NFormContextProps } from "@/store/atoms/3-file-mani-atoms";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/shadcn/select";

function SubmitSelector({ ctx }: { ctx: NFormContextProps; }) {

    const buttonNameItems = useAtomValue(ctx.nFormAtoms.normal.submitCtx.buttonNameItemsAtom);
    const [selected, setSelected] = useAtom(ctx.nFormAtoms.normal.submitCtx.selectedAtom);

    return (
        <Select value={selected.toString()} onValueChange={(value) => setSelected(+value)}>

            <SelectTrigger className="pl-2 pr-1 py-1 h-7 w-max text-xs gap-1">
                <SelectValue placeholder={"Don't submit"} />
            </SelectTrigger>

            <SelectContent align="start">
                {buttonNameItems.map(
                    ({ name }, idx) => (
                        <SelectItem className="text-xs" value={idx.toString()} indicatorFirst key={idx}>
                            {name}
                        </SelectItem>
                    ))
                }
            </SelectContent>

        </Select>
    );
}

function BodyWin32({ ctx }: { ctx: NFormContextProps; }) {
    const selected = useAtomValue(ctx.nFormAtoms.normal.submitCtx.selectedAtom) !== 0;
    return (<>
        After filling in the form fields,
        {selected ? " the" : ""}
        <SubmitSelector ctx={ctx} />
        {selected ? " button will be used to submit the form data." : " the form data."}
    </>);
}

export function TabSubmit({ ctx }: { ctx: NFormContextProps; }) {
    const isWeb = ctx.nFormAtoms.normal.submitCtx.isWeb;
    return (
        <div className="p-1 flex items-center gap-1">
            {isWeb
                ? (<>
                    After filling in the form fields,
                    <SubmitSelector ctx={ctx} />
                    the form data.
                </>)
                : (
                    <BodyWin32 ctx={ctx} />
                )
            }
        </div>
    );
}
