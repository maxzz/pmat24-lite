import { filesAtom } from "@/store";
import { Button } from "@/ui";
import { useAtomValue } from "jotai";

export function WelcomePage() {
    const files = useAtomValue(filesAtom);

    if (!files.length) {
        return null;
    }

    return (
        <div className="h-full bg-muted-background flex flex-col items-center justify-center">
            <div className="text-2xl">
                Welcome to the app!
            </div>
            <Button className="mt-4">Open a file</Button>
        </div>
    );
}
