import { ButtonHTMLAttributes } from "react";
import { Close as DialogCloseButton } from '@radix-ui/react-dialog';
import { classNames } from "@/utils";

const dlgBottomButtonClasses = "\
px-4 py-2 inline-block \
\
hover:bg-primary-700 \
border-primary-500 \
active:scale-[.97] \
disabled:opacity-25 \
\
border rounded select-none";

export function BottomButton({ className, children, ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <DialogCloseButton className={classNames(dlgBottomButtonClasses, className)} {...rest}>
            {children}
        </DialogCloseButton>
    );
}
