import { Button } from "@/ui";
import { IconStopCircle, SymbolCross, SymbolInfo, SymbolWarning } from "@/ui/icons";
import { toast, type ToastT } from "sonner";

type ToastTypes = Exclude<NonNullable<ToastT['type']>, 'normal' | 'action' | 'default' | 'loading'>; // 'success' | 'info' | 'warning' | 'error';

export function TestSonner() {
    return (<>
        <Button className="text-[.65rem]" onClick={() => myToast("info", "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")}>
            <SymbolInfo className="size-4 text-blue-500" />
        </Button>

        <Button className="text-[.65rem]" onClick={() => myToast("success", "Hello from a custom component!")}>
            <div className="text-green-500">OK</div>
        </Button>

        <Button className="text-[.65rem]" onClick={() => myToast("warning", "Hello from a custom component!")}>
            <SymbolWarning className="size-4 text-orange-500" />
        </Button>

        <Button className="text-[.65rem]" onClick={() => myToast("error", "Hello from a custom component!")}>
            <IconStopCircle className="size-4" />
        </Button>

        <Button className="text-[.65rem]" onClick={
            () => {
                const id = toast.error("Hello from a custom component!", { duration: 5000, action: { label: 'Dismiss', onClick: () => toast.dismiss(id) } });
            }}>
            standard error
        </Button>
    </>);
}

export function toastError(message: React.ReactNode) {
    myToast("error", message);
}

export function toastWarning(message: React.ReactNode) {
    myToast("warning", message);
}

export function toastInfo(message: React.ReactNode) {
    myToast("info", message);
}

export function toastSuccess(message: React.ReactNode) {
    myToast("success", message);
}

export const notice = {
    error: toastError,
    warning: toastWarning,
    info: toastInfo,
    success: toastSuccess,
}

notice.error("Hello from a custom component!");

function myToast(type: ToastTypes, message: React.ReactNode) {
    const id = toast.custom(
        () => (
            <div className="text-xs text-background bg-foreground border-foreground/10 dark:border-background border rounded-md shadow-md dark:shadow-foreground/30 overflow-hidden">

                <div className="min-h-12 grid grid-cols-[4rem_1fr_auto]">
                    
                    <div className={`shrink-0 relative flex flex-col items-center justify-center ${toastIconClasses(type)}`}>
                        {type === 'success' && <SymbolInfo className="size-5" />}
                        {type === 'info' && <SymbolInfo className="size-5" />}
                        {type === 'warning' && <SymbolWarning className="size-5" />}
                        {type === 'error' && <IconStopCircle className="size-5 stroke-background!" />}
                    </div>

                    <div className="place-self-center pl-2 py-3 hyphens-auto text-pretty" data-content>
                        {message}
                    </div>

                    <div className="place-self-center">
                        <Button className="m-1 p-1 aspect-square active:scale-[.97]" variant="ghost" onClick={() => toast.dismiss(id)}>
                            <SymbolCross className="size-3" onClick={() => toast.dismiss(id)} />
                        </Button>
                    </div>
                </div>

            </div>
        ),
        {
            duration: 555000,
        }
    );
}

function toastIconClasses(type: ToastTypes): string {
    return (
        type === 'success' ? 'bg-green-600 stroke-background'
            : type === 'info' ? 'bg-blue-600 stroke-background'
                : type === 'warning' ? 'bg-orange-600 stroke-background'
                    : type === 'error' ? 'bg-red-500 stroke-background'
                        : ''
    );
}
