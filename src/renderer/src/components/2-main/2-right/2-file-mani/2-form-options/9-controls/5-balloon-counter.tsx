import { useAtom } from "jotai";
import { type OptionTextValue } from "pm-manifest";
import { type OptionInputProps } from "@/ui/local-ui/1-input-validate";
import { InputSelectUi } from "@/ui/local-ui/4-input-select-ui";

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
        <InputSelectUi items={balloonCounterItems} value={state.data || '0'} onValueChange={onChange} />
    );
}

const balloonCounterItems: OptionTextValue[] = [
    ['Never', '0' ],
    ['Once', '1' ],
    ['3 times', '3' ],
    ['5 times', '5' ],
    ['Always', '-1' ],
];
