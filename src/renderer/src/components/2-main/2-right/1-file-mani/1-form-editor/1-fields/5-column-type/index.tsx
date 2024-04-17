import { InputHTMLAttributes } from 'react';
import { PrimitiveAtom as PA, useAtomValue } from 'jotai';
import { Meta } from '@/store/manifest';
import { classNames } from '@/utils';
import { FieldTypeIconComponent } from '@/store/manifest/manifest-field-icons';

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
    field: Meta.Field;
};

export function Column5_Type({ useItAtom, field, className, ...rest }: Column5_TypeProps) {
    const { password, type = 'NOTYPE' } = field.mani;
    const useIt = useAtomValue(useItAtom);
    return (
        <div className={classNames(column5_TypeClasses, !useIt && "opacity-30 cursor-pointer", className)} {...rest}>
            <FieldTypeIconComponent className="size-5" field={field.mani} />

            <div className="-mt-2">
                {`${password ? 'psw' : type}`}
            </div>
        </div>
    );
}
