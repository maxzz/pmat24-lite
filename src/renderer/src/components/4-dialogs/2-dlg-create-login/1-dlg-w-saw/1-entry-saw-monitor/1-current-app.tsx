import { type ComponentPropsWithoutRef } from "react";
import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { AnimatePresence, motion } from "motion/react";
import { classNames } from "@/utils";
import { Button, ImageHolder } from "@/ui";
import { stateNapiBuildMani, napiLock, sawHandleAtom, sawHandleCaptionAtom, sawIconAtom} from "@/store";
import { showProgressAtom } from "@/store/4-dialogs-atoms";
import { Spinner } from "@/ui/icons";
import { CornerSelector } from "./3-corner-selector";

export function CurrentApp({ className, ...rest }: ComponentPropsWithoutRef<'div'>) {
    return (
        <div className={classNames("relative px-4 py-2 w-full bg-background 1bg-muted/50 border-border border shadow-inner rounded-md grid place-items-center gap-2", className)} {...rest}>
            <CornerSelector className="absolute right-1 top-1" />
            <div className="select-none">
                Active application:
            </div>
            <AppIcon className="grid place-items-center select-none" />
            <CurrentAppCaption />
        </div>
    );
}

//TODO: handle: no icon, no caption

function AppIcon({ className, ...rest }: ComponentPropsWithoutRef<'div'>) {
    const hasHandle = useAtomValue(sawHandleAtom);
    const imageElm = useAtomValue(sawIconAtom);
    const showProgress = useAtomValue(showProgressAtom);
    return (
        <div className={classNames("relative h-8 grid grid-cols-[1fr,2rem,1fr] gap-x-2 select-none", className)} {...rest}>
            {showProgress
                ? <DetectionProgress />
                : hasHandle
                    ? imageElm
                        ? <ImageHolder className="col-start-2" imageAtom={sawIconAtom} />
                        : <div className="col-span-full">
                            No icon
                        </div>
                    : (
                        <div className="col-span-full">
                            No active application
                        </div>
                    )
            }
        </div>
    );
}

function DetectionProgress({ className, ...rest }: ComponentPropsWithoutRef<'div'>) {
    const showProgress = useAtomValue(showProgressAtom);
    return (<>
        {showProgress && (
            <motion.div className="col-span-full grid grid-cols-subgrid">
                <div className={classNames("col-start-2")}>
                    <Spinner className="size-8 1bg-sky-300" blockClasses="bg-sky-600" />
                </div>

                <div className="flex items-center gap-2">
                    <div className="min-w-6">
                        <BuildCounter />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 2, duration: .2 }}
                    >
                        <Button className={cancelBtnClasses} variant="ghost" size="xs" tabIndex={-1} onClick={() => napiLock.cancel()}>
                            Cancel
                        </Button>
                    </motion.div>
                </div >

            </motion.div>
        )}
    </>);
}

function BuildCounter() {
    const { buildCounter } = useSnapshot(stateNapiBuildMani);
    if (buildCounter < 200) {
        return null;
    }
    return (
        <div className="text-[.65rem] text-foreground/50" title="# of detected controls">
            {buildCounter}
        </div>
    );
}

const cancelBtnClasses = "text-white bg-orange-500 hover:text-white hover:bg-orange-600 active:scale-[.97] shadow";

function CurrentAppCaption({ className, ...rest }: ComponentPropsWithoutRef<typeof motion.div>) {
    const caption = useAtomValue(sawHandleCaptionAtom);
    return (
        <div className="relative overflow-clip">
            <AnimatePresence mode="wait">
                <motion.div
                    className={classNames("w-full min-h-8 text-center line-clamp-2", className)}

                    key={caption}
                    // layoutDependency={caption}

                    initial={{ opacity: 0, y: -5, }}
                    animate={{ opacity: 1, y: 0, }}
                    exit={{ opacity: 0, y: 0, transition: { duration: 0 } }}
                    // transition={{ duration: 2 }}


                    // layoutId={caption}
                    // initial={{ opacity: 1, x: 100, }}
                    // animate={{ opacity: 1, x: 0, }}
                    // exit={{ opacity: 1, x: -100, }}
                    // transition: { delay: .2, duration: .2 }
                    title={caption} {...rest}
                >
                    <motion.div
                    // layoutDependency={caption}

                    // key={caption}
                    // initial={{ opacity: 0, x: -100, }}
                    // animate={{ opacity: 1, x: 0, }}
                    // exit={{ opacity: 0, x: 100, }}
                    // transition={{ duration: 2 }}

                    // layout="position"
                    >

                        {caption}
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
