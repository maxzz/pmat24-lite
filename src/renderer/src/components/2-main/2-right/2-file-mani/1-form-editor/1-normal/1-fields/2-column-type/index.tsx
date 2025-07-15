import { InputHTMLAttributes } from "react";
import { PrimitiveAtom as PA, useAtomValue } from "jotai";
import { Mani } from "@/store/manifest";
import { classNames } from "@/utils";
import { FieldTypeIconComponent, fieldTypeTitle } from "@/store/manifest/manifest-field-icons";

const column2_TypeClasses = "\
size-7 pt-1 text-[.6rem] \
\
text-mani-muted-foreground \
\
border-muted-foreground/40 border \
\
rounded \
select-none \
flex flex-col items-center gap-0.5";

type Column2_TypeProps = InputHTMLAttributes<HTMLInputElement> & {
    useItAtom: PA<boolean>;
    maniField: Mani.Field;
};

export function Column2_Type({ useItAtom, maniField, className, ...rest }: Column2_TypeProps) {

    const useIt = useAtomValue(useItAtom);
    const { password, type = 'NOTYPE' } = maniField;
    const title = fieldTypeTitle(maniField);
    
    return (
        <div className={classNames(column2_TypeClasses, !useIt && "opacity-30 cursor-pointer", className)} title={title} {...rest}>
            <FieldTypeIconComponent className="size-3" field={maniField} />

            <div className="-mt-2">
                {`${password ? 'psw' : type}`}
            </div>
        </div>
    );
}
