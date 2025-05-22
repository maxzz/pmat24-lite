import { useAtomValue } from "jotai";
import { pluralWord, toNumberWDefault1 } from "@/utils";
import { type RowInputStateAtom, InputOrCheckWithErrorMsg } from "@/ui/local-ui";

export function InputRepeat({ valueAtom }: { valueAtom: RowInputStateAtom; }) {
    const repeat = useAtomValue(valueAtom);
    return (
        <label className="flex flex-col gap-1">
            <span>
                Repeat
            </span>

            <div className="max-w-[70px] flex items-center gap-1" title="Number of times to repeat this key">
                <div>
                    <InputOrCheckWithErrorMsg stateAtom={valueAtom} />
                </div>

                <span className="pt-0.5">
                    {`${pluralWord(toNumberWDefault1(repeat.data), 'time')}`}
                </span>
            </div>
        </label>
    );
}
