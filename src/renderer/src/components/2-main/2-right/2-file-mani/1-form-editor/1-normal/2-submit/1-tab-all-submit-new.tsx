import { useAtomValue, useAtom } from "jotai";
import { type NFormContextProps } from "@/store/atoms/3-file-mani-atoms";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/shadcn/select";

export function TabSubmit({ ctx }: { ctx: NFormContextProps; }) {
    const isWeb = ctx.nAllAtoms.normal.submitCtx.isWeb;
    return (
        <div className="ml-1 p-1 flex items-center gap-1">
            {isWeb
                ? (<>
                    After filling in the form fields,
                    <SubmitSelector ctx={ctx} />
                    the form data.
                </>)
                : (
                    <SubmitBodyForWin32 ctx={ctx} />
                )
            }
        </div>
    );
}

function SubmitSelector({ ctx }: { ctx: NFormContextProps; }) {

    const { buttonNameItemsAtom, selectedAtom } = ctx.nAllAtoms.normal.submitCtx;
    const buttonNameItems = useAtomValue(buttonNameItemsAtom);
    const [selected, setSelected] = useAtom(selectedAtom);

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

function SubmitBodyForWin32({ ctx }: { ctx: NFormContextProps; }) {
    const selected = useAtomValue(ctx.nAllAtoms.normal.submitCtx.selectedAtom) !== 0;
    return (<>
        After filling in the form fields,
        {selected ? " the" : ""}
        <SubmitSelector ctx={ctx} />
        {selected ? " button will be used to submit the form data." : " the form data."}
    </>);
}
