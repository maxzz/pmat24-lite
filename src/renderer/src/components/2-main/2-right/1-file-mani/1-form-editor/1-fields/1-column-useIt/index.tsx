import { InputHTMLAttributes } from 'react';
import { PrimitiveAtom, useAtom } from 'jotai';
import { classNames } from '@/utils';

type Column1_UseItProps = InputHTMLAttributes<HTMLInputElement> & {
    useItAtom: PrimitiveAtom<boolean>;
};

const checkbox = "data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='green' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e";

const checkboxClasses = { backgroundImage: `url("${checkbox}")`, backgroundSize: "contain", backgroundRepeat: "no-repeat" };

console.log(checkboxClasses);


export function Column1_UseIt({ useItAtom, className, ...rest }: Column1_UseItProps) {
    const [useIt, setUseIt] = useAtom(useItAtom);
    return (
        <input
            type="checkbox"
            className={classNames("place-self-center size-4 dark-checkbox", className)}
            style={checkboxClasses}
            checked={useIt}
            onChange={() => setUseIt(v => !v)}
            {...rest}
        />
    );
}
