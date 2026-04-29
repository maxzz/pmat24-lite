import { useAtom } from "jotai";
import { type OptionTextValue } from "@/store/8-manifest";
import { type OptionInputProps } from "@/ui/local-ui/1-input-validate";
import { SelectTm } from "@/ui/local-ui/4-select-tm";

export function AuthImmSelect({ stateAtom, onValueStateChange: onValueChange, ...rest }: OptionInputProps) {
    const [state, setState] = useAtom(stateAtom);

    function onChange(newValue: string) {
        setState((prev) => {
            const rv = { ...prev, data: newValue, dirty: prev.initialData !== newValue, };
            return rv;
        });
        onValueChange?.();
    }

    return (
        <SelectTm items={authImmItems} value={state.data || '0'} onValueChange={onChange} />
    );
}

const authImmItems: OptionTextValue[] = [
    ['Never', '0' ],
    ['Once', '1' ],
    ['Always', '2' ],
];
