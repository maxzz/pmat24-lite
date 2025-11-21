import { type ComponentPropsWithoutRef, forwardRef, type ElementRef, type ReactNode } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { classNames, cn } from "@/utils";
import * as D from "@/ui/shadcn/dialog";
import { doCancelFceDlgAtom, fceDlgTriggerAtom } from "@/store/3-field-catalog-atoms";
import { FceDialogBodySelector } from "./1-dialog-body";
import { overlayClasses } from "@/ui/local-ui/8-classes";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { DialogPortalProps } from "@radix-ui/react-dialog";

const contentMainClasses = "w-4/5! max-w-4xl";
const contentClasses = "w-80! min-w-fit max-w-xl";
const contentRestClasses = "\
p-0 \
h-4/5 min-h-[60vh] max-h-[90vh] \
text-xs \
gap-0 \
select-none \
data-[state=open]:animate-none \
data-[state=closed]:animate-none \
1data-[state=open]:[animation-duration:200ms] \
data-[state=closed]:duration-ani-200 \
"; // temp.:  min-h-[60vh] to fit right panel height until it will be floated w/ absolute position

export function FceDialog() {
    const doCancelFceDlg = useSetAtom(doCancelFceDlgAtom);

    const fceCtx = useAtomValue(fceDlgTriggerAtom);
    const openMainDlg = !fceCtx?.inData?.openItemPickerDlg;

    return (
        <D.Dialog open={!!fceCtx} onOpenChange={doCancelFceDlg}>
            {/* <MotionConfig transition={{ type: "spring", duration: .7 }}> */}
            <AnimatePresence>

            {!!fceCtx && (
                <DialogContentPortal>
                        //{/* We need to scale Prim.Content right after DialogPortal */ }
                        <motion.div
                            // initial={{ opacity: 0, scale: .9 }}
                            // animate={{ opacity: 1, scale: 1 }}
                            // exit={{ opacity: 0, scale: .9 }}
                            // transition={{ duration: .3 }}
                            // layout
                            // layoutId="fc-dlg-body"

                        // className="w-full h-full"
                        >
                            {/* {fceCtx && */}
                            <DialogContent
                                className={classNames(openMainDlg ? contentMainClasses : contentClasses, contentRestClasses)}
                                noClose
                                hiddenTitle="Field Catalog"
                                overlayClasses={overlayClasses}
                            // forceMount
                            >
                                {/* <motion.div className="w-full h-full" layout="size" transition={{ duration: .3 }}> */}
                                {/* {fceCtx && */}
                                <FceDialogBodySelector fceCtx={fceCtx} />
                                {/* } */}
                            </DialogContent>
                            {/* } */}
                        </motion.div>

                        // {/* </motion.div> */}
                </DialogContentPortal>
                    )}
            </AnimatePresence>
            {/* </MotionConfig> */}
        </D.Dialog >
    );
}

//TODO: add initial selection

//version by https://codesandbox.io/p/sandbox/dialog-radix-framer-motion-8w7dqz?file=%2Fsrc%2FApp.js%3A10%2C55

import * as Prim from "@radix-ui/react-dialog";

export const DialogContentClasses = "\
fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-50 \
p-6 w-full md:w-full max-w-lg \
\
bg-background \
\
1data-[state=open]:animate-in \
data-[state=open]:fade-in-0 \
data-[state=open]:zoom-in-95 \
data-[state=open]:slide-in-from-left-1/2 \
data-[state=open]:slide-in-from-top-[48%] \
\
1data-[state=closed]:animate-out \
data-[state=closed]:fade-out-0 \
data-[state=closed]:zoom-out-95 \
data-[state=closed]:slide-out-to-left-1/2 \
data-[state=closed]:slide-out-to-top-[48%] \
\
border sm:rounded-lg shadow-lg \
duration-200 \
grid gap-4";

type DialogContentProps = ComponentPropsWithoutRef<typeof Prim.Content> & {
    modal?: boolean;
    container?: DialogPortalProps['container'];
    noClose?: boolean;
    withScroll?: boolean; // by default DialogContent has no scroll for popups
    hiddenTitle?: string; // If headenTitle is not provided, then parent component should provide own Prim.Title (same for aria-describedby)
    overlayClasses?: string;
};

const preventClose = (e: Event) => e.preventDefault();

const DialogContent = forwardRef<ElementRef<typeof Prim.Content>, DialogContentProps>(
    ({ className, children, noClose, withScroll, modal, overlayClasses, onPointerDownOutside, hiddenTitle, ...rest }, ref) => (
        <>
            {withScroll ? <D.DialogOverlayWithScroll className={overlayClasses} /> : <D.DialogOverlay className={overlayClasses} />}

            <Prim.Content
                ref={ref}
                className={cn(DialogContentClasses, className)}
                onPointerDownOutside={modal ? preventClose : onPointerDownOutside}
                aria-describedby={undefined}
                forceMount
                {...rest}
            >
                {hiddenTitle && (
                    <Prim.Title className="sr-only">{hiddenTitle}</Prim.Title>
                )}

                {children}
                {!noClose && <D.DialogCloseButton />}
            </Prim.Content>
        </>
    )
);

function DialogContentPortal({ children, container }: { children: ReactNode, container?: DialogPortalProps['container']; }) {
    return (
        <D.DialogPortal container={container} forceMount>
            {children}
        </D.DialogPortal>
    );
}
