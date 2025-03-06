import { type ComponentPropsWithoutRef } from "react";
import { useAtomValue } from "jotai";
import { AnimatePresence, motion } from "motion/react";
import { classNames } from "@/utils";
import { Button, ImageHolder } from "@/ui";
import { sawHandleAtom, sawHandleCaptionAtom, sawIconAtom } from "@/store";
import { showProgressAtom } from "../0-ctx";
import { Spinner } from "@/ui/icons";

export function CurrentApp({ className, ...rest }: ComponentPropsWithoutRef<'div'>) {
    return (
        <div className={classNames("px-4 py-2 w-full border-border/30 border shadow rounded-md grid place-items-center gap-2", className)} {...rest}>
            <div className="select-none">
                Active application:
            </div>
            <AppIcon className="grid place-items-center select-none" />
            <CurrentAppCaption />
        </div>
    );
}

function AppIcon({ className, ...rest }: ComponentPropsWithoutRef<'div'>) {
    const hasHandle = useAtomValue(sawHandleAtom);
    const imageElm = useAtomValue(sawIconAtom);
    const showProgress = useAtomValue(showProgressAtom);
    return (<>
        <div className={classNames("relative h-8 grid grid-cols-[1fr,2rem,1fr] gap-x-2", className)} {...rest}>
            {showProgress
                ? <DetectionProgress />
                : hasHandle
                    ? imageElm
                        ? <ImageHolder className="col-start-2" imageAtom={sawIconAtom} />
                        : <div className="col-span-3">
                            No icon
                        </div>
                    : (
                        <div className="col-span-3">
                            No application selected
                        </div>
                    )
            }
        </div>
    </>);
}

function DetectionProgress({ className, ...rest }: ComponentPropsWithoutRef<'div'>) {
    const showProgress = useAtomValue(showProgressAtom);
    return (<>
        {showProgress && (<>
            <div className={classNames("col-start-2")}>
                <Spinner className="size-8 bg-sky-300" blockClasses="bg-sky-600" />
            </div>

            <Button className={cancelBtnClasses} variant="ghost" size="xs" tabIndex={-1}>
                Cancel
            </Button>
        </>)}
    </>);
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
