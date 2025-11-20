import { toast, type ToastT } from "sonner";
import { Button } from "@/ui";
import { IconStopCircle, SymbolCross, SymbolInfo, SymbolWarning } from "@/ui/icons";

//export { toast as toaster };

type ToastTypes = Exclude<NonNullable<ToastT['type']>, 'normal' | 'action' | 'default' | 'loading'>; // 'success' | 'info' | 'warning' | 'error';

function myToast(type: ToastTypes, message: React.ReactNode, options: Partial<ToastT> = {}): string | number {
    const id = toast.custom(
        () => (
            <div className={`text-xs text-background bg-foreground border-foreground/10 dark:border-background border rounded-md shadow-md 1dark:shadow-foreground/20 1dark:shadow-red-500/60 overflow-hidden ${toastShadowClasses(type)}`}>

                <div className="min-h-12 grid grid-cols-[4rem_1fr_auto] place-items-center">

                    <div className={`self-stretch w-full grid place-items-center text-background ${toastIconClasses(type)}`}>
                        {type === 'success' && <SymbolInfo className="size-5" />}
                        {type === 'info' && <SymbolInfo className="size-5" />}
                        {type === 'warning' && <SymbolWarning className="size-5" />}
                        {type === 'error' && <IconStopCircle className="size-5 stroke-background!" />}
                    </div>

                    <div className="pl-3 py-3 text-balance hyphens-auto" data-content>
                        {message}
                    </div>

                    <Button className="m-1 p-1 aspect-square active:scale-[.97]" variant="ghost" onClick={() => notice.dismiss(id)}>
                        <SymbolCross className="size-3" onClick={() => notice.dismiss(id)} />
                    </Button>
                </div>

            </div>
        ),
        {
            duration: 5000,
            ...options,
        }
    );
    return id;
}

function toastIconClasses(type: ToastTypes): string {
    return (
        type === 'success' ? 'bg-green-600'
            : type === 'info' ? 'bg-blue-600'
                : type === 'warning' ? 'bg-orange-600'
                    : type === 'error' ? 'bg-red-500'
                        : ''
    );
}

function toastShadowClasses(type: ToastTypes): string {
    return (
        type === 'success' ? 'dark:shadow-green-600/60'
            : type === 'info' ? 'dark:shadow-sky-600/60'
                : type === 'warning' ? 'dark:shadow-orange-600/60'
                    : type === 'error' ? 'dark:shadow-red-500/60'
                        : ''
    );
}

// Exports

function toastError(message: React.ReactNode, options: Partial<ToastT> = {}): string | number {
    return myToast("error", message, options);
}

function toastWarning(message: React.ReactNode, options: Partial<ToastT> = {}): string | number {
    return myToast("warning", message, options);
}

function toastInfo(message: React.ReactNode, options: Partial<ToastT> = {}): string | number {
    return myToast("info", message, options);
}

function toastSuccess(message: React.ReactNode, options: Partial<ToastT> = {}): string | number {
    return myToast("success", message, options);
}

export const notice = {
    error: toastError,
    warning: toastWarning,
    info: toastInfo,
    success: toastSuccess,
    dismiss: toast.dismiss,
};

//TODO: add notice.dismiss(id);
//TODO: import { Dropdown5, SelectNameValueItem } from "@/ui/local-ui"; global classes as separate import
//TODO: import { InputSelectUi } from "@/ui/local-ui";
//TODO: import { InputSelectUi, type RowInputStateAtom } from "@/ui/local-ui";
//TODO: import { InputSelectUi } from "@/ui/local-ui";
