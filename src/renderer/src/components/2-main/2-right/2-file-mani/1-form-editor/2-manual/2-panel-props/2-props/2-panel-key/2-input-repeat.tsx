import { type PrimitiveAtom, useAtomValue } from "jotai";
import { type RowInputState } from "@/ui";
import { pluralWord, toNumberWDefault1 } from "@/utils";
import { InputWTooltip } from "@/components/2-main/2-right/2-file-mani/2-form-options/9-controls";

export function InputRepeat({ valueAtom }: { valueAtom: PrimitiveAtom<RowInputState>; }) {
    const repeat = useAtomValue(valueAtom);
    return (
        <label className="flex flex-col gap-1">
            <span>
                Repeat
            </span>

            <div className="max-w-[70px] flex items-center gap-1" title="Number of times to repeat this key">
                <InputWTooltip stateAtom={valueAtom} asCheckbox={false} />

                <span className="pt-0.5">
                    {`${pluralWord(toNumberWDefault1(repeat.data), 'time')}`}
                </span>
            </div>
        </label>
    );
}
