import { InputHTMLAttributes } from 'react';
import { PrimitiveAtom as PA, useAtomValue } from 'jotai';
import { Mani } from '@/store/manifest';
import { classNames } from '@/utils';
import { FieldTypeIconComponent, fieldTypeTitle } from '@/store/manifest/manifest-field-icons';

const column5_TypeClasses = "\
size-8 pt-1 text-[.6rem] \
\
text-mani-muted-foreground \
\
border-muted-foreground/40 border \
\
rounded \
select-none \
flex flex-col items-center \
";

type Column5_TypeProps = InputHTMLAttributes<HTMLInputElement> & {
    useItAtom: PA<boolean>;
    maniField: Mani.Field;
};

export function Column5_Type({ useItAtom, maniField, className, ...rest }: Column5_TypeProps) {
    const useIt = useAtomValue(useItAtom);
    const { password, type = 'NOTYPE' } = maniField;
    const title = fieldTypeTitle(maniField);
    return (
        <div className={classNames(column5_TypeClasses, !useIt && "opacity-30 cursor-pointer", className)} title={title} {...rest}>
            <FieldTypeIconComponent className="size-5" field={maniField} />

            <div className="-mt-2">
                {`${password ? 'psw' : type}`}
            </div>
        </div>
    );
}
