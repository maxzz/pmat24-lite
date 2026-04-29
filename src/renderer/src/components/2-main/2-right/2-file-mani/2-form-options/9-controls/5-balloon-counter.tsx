import { useAtom } from "jotai";
import { SelectTm } from "@/ui/local-ui/4-select-tm";
import { type OptionTextValue } from "@/store/8-manifest";
import { type OptionInputProps } from "@/ui/local-ui/1-input-validate";

// Balloon counter

export function BalloonCounterSelect(props: OptionInputProps) {
    return (
        <LocalSelect items={balloonCounterItems} {...props} />
    );
}

const balloonCounterItems: OptionTextValue[] = [
    ['Never', '0'],
    ['Once', '1'],
    ['3 times', '3'],
    ['5 times', '5'],
    ['Always', '-1'],
];

// Authenticate immediately

export function AuthImmSelect(props: OptionInputProps) {
    return (
        <LocalSelect items={authImmItems} {...props} />
    );
}

const authImmItems: OptionTextValue[] = [
    ['Never', '0' ],
    ['Once', '1' ],
    ['Always', '2' ],
];

// LocalSelect

function LocalSelect({ stateAtom, onValueStateChange: onValueChange, items, className }: OptionInputProps & { items: OptionTextValue[]; }) {
    const [state, setState] = useAtom(stateAtom);

    function onChange(newValue: string) {
        setState((prev) => {
            const rv = { ...prev, data: newValue, dirty: prev.initialData !== newValue, };
            return rv;
        });
        onValueChange?.();
    }

    return (
        <SelectTm items={items} value={state.data || '0'} onValueChange={onChange} triggerClasses={className} />
    );
}
