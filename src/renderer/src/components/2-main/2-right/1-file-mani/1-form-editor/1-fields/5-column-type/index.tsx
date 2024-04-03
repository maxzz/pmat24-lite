import { InputHTMLAttributes } from 'react';
import { PrimitiveAtom as PA, useAtomValue } from 'jotai';
import { Meta } from '@/store/manifest';
import { classNames } from '@/utils';
import { FieldTypeIconComponent } from '@/store/manifest/manifest-field-icons';

type Column5_TypeProps = {
    useItAtom: PA<boolean>;
    field: Meta.Field;
} & InputHTMLAttributes<HTMLInputElement>;

export function Column5_Type({ useItAtom, field, className, ...rest }: Column5_TypeProps) {
    const { password, type = 'NOTYPE' } = field.mani;
    const useIt = useAtomValue(useItAtom);
    return (
        <div className={classNames("flex items-center space-x-0.5 select-none", !useIt && "opacity-30 cursor-pointer", className)} {...rest}>
            <FieldTypeIconComponent field={field.mani} className="size-5 text-primary-500" />
            <div className="text-primary-500">{`${password ? 'psw' : type}`}</div>
        </div>
    );
}
