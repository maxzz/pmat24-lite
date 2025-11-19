import { Button } from "@/ui";
import { IconStopCircle, SymbolInfo, SymbolWarning } from "@/ui/icons";
import { toast, type ToastT } from "sonner";

type ToastTypes = Exclude<NonNullable<ToastT['type']>, 'normal' | 'action' | 'default' | 'loading'>; // 'success' | 'info' | 'warning' | 'error';

export function TestSonner() {
    return (<>
        <Button className="text-[.65rem]" onClick={() => myToast("success", "Hello from a custom component!")}>
            success
        </Button>

        <Button className="text-[.65rem]" onClick={() => myToast("info", "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")}>
            info
        </Button>

        <Button className="text-[.65rem]" onClick={() => myToast("warning", "Hello from a custom component!")}>
            warning
        </Button>

        <Button className="text-[.65rem]" onClick={() => myToast("error", "Hello from a custom component!")}>
            error
        </Button>
    </>);
}

function myToast(type: ToastTypes, message: React.ReactNode) {
    const iconClasses =
        type === 'success' ? 'bg-green-600 text-slate-800'
            : type === 'info' ? 'bg-blue-600 text-slate-100'
                : type === 'warning' ? 'bg-orange-600 text-slate-100'
                    : type === 'error' ? 'bg-red-500 text-slate-800'
                        : '';
    const id = toast.custom(
        () => (
            <div className="text-xs text-background bg-foreground border-foreground/10 border rounded-md shadow-md overflow-hidden">

                <div className="grid grid-cols-[4rem_1fr_auto] 1gap-2">
                    <div className={`shrink-0 flex items-center justify-center ${iconClasses}`}>
                        {type === 'success' && <SymbolInfo className="size-5 " />}
                        {type === 'info' && <SymbolInfo className="size-5 " />}
                        {type === 'warning' && <SymbolWarning className="size-5 " />}
                        {type === 'error' && <IconStopCircle className="size-5 " />}
                    </div>

                    <div className="px-2 py-3 flex items-center gap-2">
                        <div className="hyphens-auto text-pretty">
                            {message}
                        </div>


                    </div>

                    <div className="place-self-center px-2">
                        <button className="srink-0 px-2 py-1 text-foreground bg-background border-foreground border rounded shadow" onClick={() => toast.dismiss(id)}>Dismiss</button>
                    </div>
                </div>

            </div>
        ),
        {
            duration: 423000,
        }
    );
}
