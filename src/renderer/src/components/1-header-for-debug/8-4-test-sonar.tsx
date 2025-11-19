import { Button } from "@/ui";
import { SymbolWarning } from "@/ui/icons";
import { toast, type ToastT } from "sonner";

type ToastTypes = Exclude<NonNullable<ToastT['type']>, 'normal' | 'action' | 'default' | 'loading'>; // 'success' | 'info' | 'warning' | 'error';

export function TestSonner() {
    return (<>
        <Button className="text-[.65rem]" onClick={() => myToast("success", "Hello from a custom component!")}>
            success
        </Button>

        <Button className="text-[.65rem]" onClick={() => myToast("info", "Hello from a custom component!")}>
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
    const id = toast.custom(
        () => (
            <div className="text-xs text-background bg-foreground border-foreground/10 border rounded-md shadow-md overflow-hidden">

                <div className="grid grid-cols-[4rem_1fr] gap-2">
                    <div className="shrink-0 flex items-center justify-center bg-orange-500 text-slate-800">
                        <SymbolWarning className="size-5 " />
                    </div>

                    <div className="px-2 py-3 flex items-center gap-2">
                        {message}

                        <button className="px-2 py-1 text-foreground bg-background border-foreground border rounded shadow" onClick={() => toast.dismiss(id)}>Dismiss</button>
                    </div>
                </div>

            </div>
        ),
        {
            duration: 3000,
        }
    );
}
