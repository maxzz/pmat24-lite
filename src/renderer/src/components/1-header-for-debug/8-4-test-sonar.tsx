import { Button } from "@/ui";
import { SymbolWarning } from "@/ui/icons";
import { toast, type ToastT } from "sonner";

type ToastTypes = NonNullable<ToastT['type']>;

export function TestSonner() {

    function onClick() {
        toast.custom(
            () => (
                <div className="text-xs text-background bg-foreground border-foreground/10 border rounded-md shadow-md overflow-hidden">

                    <div className="grid grid-cols-[4rem_1fr] gap-2">
                        <div className="shrink-0 flex items-center justify-center bg-orange-500 text-slate-800">
                            <SymbolWarning className="size-5 " />
                        </div>

                        <div className="p-4">
                            <p>Hello from a custom component!</p>
                            <button onClick={() => toast.dismiss()}>Dismiss</button>
                        </div>
                    </div>

                </div>
            ),
            {
                duration: 33000,
            }
        );
    }

    return (<>
        <Button className="text-[.65rem]" onClick={onClick}>
            Sonnar1
        </Button>

        <Button className="text-[.65rem]" onClick={onClick}>
            Sonnar2
        </Button>
    </>);
}
