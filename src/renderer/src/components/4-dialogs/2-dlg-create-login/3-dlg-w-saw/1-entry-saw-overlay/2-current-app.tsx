import { type ComponentPropsWithoutRef } from "react";
import { useAtomValue } from "jotai";
import { AnimatePresence, motion } from "motion/react";
import { classNames } from "@/utils";
import { Button, ImageHolder } from "@/ui";
import { sawHandleCaptionAtom, sawIconAtom } from "@/store";
import { Spinner } from "@/ui/icons";

export function CurrentApp({ className, ...rest }: ComponentPropsWithoutRef<'div'>) {
    return (
        <div className={classNames("px-4 py-2 w-full border-border/30 border shadow rounded-md grid place-items-center gap-2", className)} {...rest}>

            <div className="select-none">
                Active application:
            </div>

            <div className="relative select-none">
                <div className={classNames("!absolute size-8", className)} {...rest}>
                    <Spinner className="size-full bg-sky-300" blockClasses="bg-sky-600" />
                </div>
                <AppIcon className="grid place-items-center select-none" />
                <Button>Cancel</Button>
            </div>

            <CurrentAppCaption />
        </div>
    );
}

function AppIcon({ className, ...rest }: ComponentPropsWithoutRef<'div'>) {
    const imageElm = useAtomValue(sawIconAtom);
    return (<>
        {imageElm
            ? (
                <div className={classNames("size-8", className)} {...rest}>
                    <ImageHolder imageAtom={sawIconAtom} />
                </div>
            )
            : (
                <div className={classNames("h-8", className)} {...rest}>
                    No application selected
                </div>
            )
        }
    </>);
}

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
