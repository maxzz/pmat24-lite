import { useAtom } from "jotai";
import { type OptionInputProps } from "@/ui/local-ui/1-input-validate";
import { Dropdown5, SelectNameValueItem } from "@/ui/local-ui/2-dropdown5";

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
        <Dropdown5 items={balloonCounterItems} value={state.data || '0'} onValueChange={onChange} className={rest.className} />
    );
}

const balloonCounterItems: SelectNameValueItem[] = [
    ['Never', '0' ],
    ['Once', '1' ],
    ['3 times', '3' ],
    ['5 times', '5' ],
    ['Always', '-1' ],
];
