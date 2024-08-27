import { useAtomValue, useAtom } from "jotai";
import { NFormContextProps, NormalFormAtoms } from "@/store/atoms/3-file-mani-atoms";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem, SelectTrigger,
    SelectValue
} from "@/ui/shadcn/select";

function ManiSection2_Submit({ formAtoms }: { formAtoms: NormalFormAtoms; }) {

    const buttonNames = useAtomValue(formAtoms.submitAtoms.buttonNamesAtom);
    const [selected, setSelected] = useAtom(formAtoms.submitAtoms.selectedAtom);

    return (
        <Select value={selected.toString()} onValueChange={(value) => { console.log(value); setSelected(+value); }}>
            <SelectTrigger className="px-2 py-1 w-max text-xs gap-1">
                <SelectValue placeholder={"Don't submit"} />
            </SelectTrigger>

            <SelectContent align="start">
                <SelectGroup>
                    {buttonNames.map((name, idx) => (
                        <SelectItem className="text-xs" value={idx.toString()} indicatorFirst key={idx}>
                            {name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

export function TabSubmit({ formAtoms }: NFormContextProps) {
    //const metaForm = formAtoms.fileUsParams.fileUs.meta?.[formIdx]!; // We are under FormEditor umbrella, so we can safely use ! here
    if (!formAtoms.normal) {
        return null;
    }
    return (
        <div className="p-1">
            <ManiSection2_Submit formAtoms={formAtoms.normal} />
        </div>
    );
}
