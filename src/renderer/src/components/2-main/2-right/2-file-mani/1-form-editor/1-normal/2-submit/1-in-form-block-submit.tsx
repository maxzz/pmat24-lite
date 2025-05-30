import { useAtomValue, useAtom } from "jotai";
import { type NFormContextProps } from "@/store/1-atoms/2-file-mani-atoms";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/shadcn/select";

export function InFormBlockSubmit({ ctx }: { ctx: NFormContextProps; }) {
    const isWeb = ctx.nAllAtoms.normal.submitCtx.isWeb;
    return (
        <div className="ml-1 p-1 1flex items-center gap-1 select-none">
            {isWeb
                ? <SubmitBodyForWeb ctx={ctx} />
                : <SubmitBodyForWin32 ctx={ctx} />
            }
        </div>
    );
}

function SubmitBodyForWeb({ ctx }: { ctx: NFormContextProps; }) {
    return (<>
        After filling in the form fields,
        <DropdownSubmit ctx={ctx} />
        the form data.
    </>);
}

function SubmitBodyForWin32({ ctx }: { ctx: NFormContextProps; }) {
    const selected = useAtomValue(ctx.nAllAtoms.normal.submitCtx.selectedAtom) !== 0;
    return (<>
        After filling in the form fields,
        {selected ? " the" : ""}
        <DropdownSubmit ctx={ctx} />
        {selected ? " button will be used to submit the form data." : " the form data."}
    </>);
}

function DropdownSubmit({ ctx }: { ctx: NFormContextProps; }) {

    const { buttonNameItemsAtom, selectedAtom } = ctx.nAllAtoms.normal.submitCtx;
    const buttonNameItems = useAtomValue(buttonNameItemsAtom);
    const [selected, setSelected] = useAtom(selectedAtom);

    return (
        <div className="inline-block">
            <Select value={selected.toString()} onValueChange={(value) => setSelected(+value)}>

                <SelectTrigger className="mx-1 pl-1.5 pr-0.5 py-1 h-7 w-max text-xs gap-1">
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
        </div>
    );
}

//NOTE: Theoretically, two buttons cannot be selected. Only the first one will be pressed, but it depends on the application (submit vs. trigger).
