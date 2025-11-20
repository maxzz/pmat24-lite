import { Button } from "@/ui";
import { IconStopCircle, SymbolCross, SymbolInfo, SymbolWarning } from "@/ui/icons";
import { toast, type ToastT } from "sonner";

export function TestSonner() {
    return (<>
        <Button className="text-[.65rem]" onClick={() => notice.info("lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")}>
            <SymbolInfo className="size-4 text-blue-500" />
        </Button>

        <Button className="text-[.65rem]" onClick={() => notice.success("Hello from a custom component! Hello 231 from a custom component!")}>
            <div className="text-green-500">OK</div>
        </Button>

        <Button className="text-[.65rem]" onClick={() => notice.warning("Hello from a custom component! Hello from 312 a custom component! Hello 2132 from a custom component!")}>
            <SymbolWarning className="size-4 text-orange-500" />
        </Button>

        <Button className="text-[.65rem]" onClick={() => notice.error("Hello from a custom component!")}>
            <IconStopCircle className="size-4" />
        </Button>

        <Button className="text-[.65rem]" onClick={ () => { const id = toast.error("Hello from a custom component!", { duration: 5000, action: { label: 'Dismiss', onClick: () => toast.dismiss(id) } }); }}>
            standard error
        </Button>
    </>);
}

type ToastTypes = Exclude<NonNullable<ToastT['type']>, 'normal' | 'action' | 'default' | 'loading'>; // 'success' | 'info' | 'warning' | 'error';

function myToast(type: ToastTypes, message: React.ReactNode, options: Partial<ToastT> = {}) {
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

                    <Button className="m-1 p-1 aspect-square active:scale-[.97]" variant="ghost" onClick={() => toast.dismiss(id)}>
                        <SymbolCross className="size-3" onClick={() => toast.dismiss(id)} />
                    </Button>
                </div>

            </div>
        ),
        {
            duration: 555000,
            ...options,
        }
    );
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

function toastError(message: React.ReactNode, options: Partial<ToastT> = {}) {
    myToast("error", message, options);
}

function toastWarning(message: React.ReactNode, options: Partial<ToastT> = {}) {
    myToast("warning", message, options);
}

function toastInfo(message: React.ReactNode, options: Partial<ToastT> = {}) {
    myToast("info", message, options);
}

function toastSuccess(message: React.ReactNode, options: Partial<ToastT> = {}) {
    myToast("success", message, options);
}

export const notice = {
    error: toastError,
    warning: toastWarning,
    info: toastInfo,
    success: toastSuccess,
};

//notice.error("Hello from a custom component!");
