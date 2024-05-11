import { useAtomValue, useAtom } from "jotai";
import { Meta } from "pm-manifest";
import { ManiAtoms, FormAtoms, TabSectionProps } from "@/store/atoms/3-file-mani-atoms";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem, SelectTrigger,
    SelectValue
} from "@/ui/shadcn/select";

function ManiSection2_Submit({ maniAtoms, formAtoms, metaForm }: { maniAtoms: ManiAtoms; formAtoms: FormAtoms; metaForm: Meta.Form; }) {

    const buttonNames = useAtomValue(formAtoms.submitAtoms.buttonNamesAtom);
    const [selected, setSelected] = useAtom(formAtoms.submitAtoms.selectedAtom);

    return (
        <Select value={selected.toString()} onValueChange={(value) => { console.log(value); setSelected(+value); }}>
            <SelectTrigger className="px-2 w-max text-xs font-semibold gap-1">
                <SelectValue placeholder={"Don't  submit"} />
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

export function TabSubmit({ maniAtoms, formAtoms, formIdx }: TabSectionProps) {
    const metaForm = formAtoms.params.fileUs.meta?.[formIdx]!; // We are under FormEditor umbrella, so we can safely use ! here
    return (
        <div className="px-1">
            <ManiSection2_Submit maniAtoms={maniAtoms} formAtoms={formAtoms} metaForm={metaForm} />
        </div>
    );
}
