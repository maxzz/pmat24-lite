import { ReactNode } from "react";
import { Close as DialogCloseButton } from '@radix-ui/react-dialog';
import { SymbolCross } from "@ui/icons";

export function DialogHeader({ header, subHeader }: { header: ReactNode, subHeader?: ReactNode; }) {
    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="flex-1 text-lg font-bold text-primary-300">
                    {header}
                </div>
                
                <DialogCloseButton tabIndex={-1} className="px-1.5 py-1.5 hover:bg-primary-700 active:scale-[.97] rounded">
                    <SymbolCross className="size-5 py-1" />
                </DialogCloseButton>
            </div>

            {subHeader && (
                <h1 className="mt-4 mb-6">
                    {subHeader}
                </h1>
            )}
        </div>
    );
}
