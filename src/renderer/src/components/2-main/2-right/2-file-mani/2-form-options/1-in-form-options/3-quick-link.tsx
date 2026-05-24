import { AccordionWithTrigger } from "@/ui/motion-primitives";
import { InputWithTitle2Cols, InputWithTitle2Rows } from "@/ui/local-ui";
import { Button } from "@/ui/shadcn/button";
import { type OFormProps } from "@/store/1-file-mani-atoms";
import { FormIdx } from "@/store/8-manifest";
import { InFormAccordionValue } from "@/store/1-file-mani-atoms/9-types";
import { useAtomValue, useSetAtom } from "jotai";
import { IconClose, IconPaste } from "@/ui/icons/normal";
import { optionsTooltips } from "../8-tooltips";
import { AnimatePresence, motion } from "motion/react";

export function BlockQuickLink({ oFormProps }: { oFormProps: OFormProps; }) {
    const formIdx = oFormProps.oAllAtoms.options.formIdx;

    return (
        <AccordionWithTrigger name={InFormAccordionValue.quickLink} formIdx={formIdx} triggerText="Quick link on mini-dashboard" triggerClasses="w-auto">
            {formIdx !== FormIdx.login
                ? (
                    <div className={textClasses}>
                        The quick link is available only for the login form.
                    </div>
                )
                : (
                    <BlockQuickLinkContent_Guarded oFormProps={oFormProps} />
                )
            }
        </AccordionWithTrigger>
    );
}

function BlockQuickLinkContent_Guarded({ oFormProps }: { oFormProps: OFormProps; }) {
    const { qUseAtom, qNameAtom, qUrlAtom } = oFormProps.oAllAtoms.options.p4QL;
    const ourl = useAtomValue(oFormProps.oAllAtoms.options.p2Detect.ourlAtom);
    const isFormWeb = useAtomValue(oFormProps.oAllAtoms.options.isWebAtom); //TODO: For win32 it can be used too to specify app params
    const qUse = useAtomValue(qUseAtom);
    const setQUrl = useSetAtom(qUrlAtom);

    const showQuickLinkDetails = qUse.data === '1';

    function clearQuickLinkUrl() {
        setQUrl((v) => ({ ...v, data: '' }));
    }

    function pasteOriginalUrl() {
        setQUrl((v) => ({ ...v, data: ourl.data }));
    }

    return (
        <div className={`${textClasses} grid grid-cols-[auto_minmax(0,1fr)] gap-x-1.5`}>
            <InputWithTitle2Cols
                asSwitch
                stateAtom={qUseAtom}
                label="Show on mini-dashboard"
                titleTooltip={optionsTooltips.optionsNeedQl}
                labelClasses="font-normal justify-end justify-self-end!"
                containerClasses="py-0!"
            />

            <div className="overflow-hidden col-span-full">
                <AnimatePresence initial={false}>
                    {showQuickLinkDetails && (
                        <motion.div
                            className="grid gap-2.5 col-span-full"
                            initial={{ opacity: 0, y: -50, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: 'auto', transition: { duration: .3, ease: "easeInOut" } }}
                            exit={{ opacity: 0, y: -50, height: 0, transition: { duration: .4, ease: "easeInOut" } }}
                        >
                            <InputWithTitle2Rows
                                stateAtom={qNameAtom}
                                label="Quick link name"
                                titleTooltip={optionsTooltips.quicklinkName}
                                labelClasses="font-normal"
                                containerClasses="py-0! col-span-full"
                            />

                            {isFormWeb && (
                                <div className="relative">
                                    <InputWithTitle2Rows
                                        asTextarea
                                        stateAtom={qUrlAtom}
                                        label="Quick link URL"
                                        titleTooltip={optionsTooltips.quicklink}
                                        labelClasses="font-normal"
                                        containerClasses="py-0! col-span-full"
                                    />

                                    <div className="absolute bottom-1 right-1.5 flex items-center 1gap-px">
                                        <Button className="size-5" size="icon" variant="ghost" onClick={clearQuickLinkUrl} title="Clear quick link URL">
                                            <IconClose className="pt-0.5 size-4" />
                                        </Button>

                                        <Button className="size-5" size="icon" variant="ghost" onClick={pasteOriginalUrl} title="Paste original URL">
                                            <IconPaste className="pt-0.5 size-4" />
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

const textClasses = "pl-6 pr-0.5 py-3 text-balance grid gap-2.5";

//TODO: original url with % is that OK?
//TODO: add validation:
// - quick link name cannot be empty if quick link show is checked - done
// - quick link URL cannot be empty if quick link show is checked (or message the same as original url will be used) (may be add button to paste original url) - done

//TODO: if murl is equal to ourl, then quick link URL won't be saved and next time after reload will become empty. This maybe confusing for the user. So may be set it as ourl by default (and mark it as the same as original url)?
//TODO: validation does select tab, opens group, but does not select the input with error; but may be we cannot do it because of the way the validation is done. We need to mark it during validation as an error, but when to reset it back?
