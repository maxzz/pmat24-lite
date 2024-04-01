import { InputHTMLAttributes } from 'react';
import { PrimitiveAtom, useAtom } from 'jotai';
import { classNames } from '@/utils';

type Column1_UseItProps =
    & InputHTMLAttributes<HTMLInputElement>
    & {
        useItAtom: PrimitiveAtom<boolean>;
    };

export function Column1_UseIt({ useItAtom, className, ...rest }: Column1_UseItProps) {
    const [useIt, setUseIt] = useAtom(useItAtom);
    return (
        <input
            type="checkbox"
            className={classNames("place-self-center size-4 dark-checkbox", className)}
            checked={useIt}
            onChange={() => setUseIt(v => !v)}
            {...rest}
        />
    );
}
