import { type ComponentPropsWithoutRef } from "react";
import { useSetAtom } from "jotai";
import { classNames } from "@/utils";
import { Button } from "@/ui";
import { doOpenDlgNewManiSawAtom } from "@/store";
import { doSaveNewManiAtom } from "../0-ctx";

export function DialogBottemButtons({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
    const doOpenDlg = useSetAtom(doOpenDlgNewManiSawAtom);
    const doSaveNewMani = useSetAtom(doSaveNewManiAtom);
    return (
        <div className={classNames("relative px-4 flex items-center justify-end gap-1", className)} {...rest}>
            <Button
                variant="default"
                size="xs"
                onClick={async () => {
                    const saved = await doSaveNewMani();
                    if (saved) {
                        doOpenDlg(false);
                    }
                }} // always enabled to show toast as hint
            >
                Save
            </Button>
        </div>
    );
}
