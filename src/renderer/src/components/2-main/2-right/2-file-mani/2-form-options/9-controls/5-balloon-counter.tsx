import { useAtom } from "jotai";
import { type OptionTextValue } from "@/store/manifest";
import { type OptionInputProps } from "@/ui/local-ui/1-input-validate";
import { SelectTm } from "@/ui/local-ui/4-select-tm";

export function BalloonCounterSelect({ stateAtom, onValueStateChange: onValueChange, ...rest }: OptionInputProps) {
    const [state, setState] = useAtom(stateAtom);

    function onChange(newValue: string) {
        setState((prev) => {
            const rv = { ...prev, data: newValue, dirty: prev.initialData !== newValue, };
            return rv;
        });
        onValueChange?.();
    }

    return (
        <SelectTm items={balloonCounterItems} value={state.data || '0'} onValueChange={onChange} />
    );
}

const balloonCounterItems: OptionTextValue[] = [
    ['Never', '0' ],
    ['Once', '1' ],
    ['3 times', '3' ],
    ['5 times', '5' ],
    ['Always', '-1' ],
];
