import { Button } from "@/ui";
import { toast } from "sonner";

export function TestSonner() {

    function onClick() {
        toast.custom(() => (
            <div className="custom-component-toast">
                <p>Hello from a custom component!</p>
                <button onClick={() => toast.dismiss()}>Dismiss</button>
            </div>
        ));
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
