import { filesAtom } from "@/store";
import { useAtomValue } from "jotai";

export function WelcomePage() {
    const files = useAtomValue(filesAtom);
    if (files.length === 0) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="text-2xl">
                    Welcome to the app!
                </div>
            </div>
        );
    }
    return null;
}
