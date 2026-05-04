import { AccordionWithTrigger } from "@/ui/motion-primitives";
import { InputWithTitle2Rows } from "@/ui/local-ui";
import { Button } from "@/ui/shadcn/button";
import { type OFormProps } from "@/store/2-file-mani-atoms";
import { FormIdx } from "@/store/8-manifest";
import { InFormAccordionValue } from "@/store/2-file-mani-atoms/9-types";
import { useAtomValue, useSetAtom } from "jotai";
import { IconClose, IconPaste } from "@/ui/icons/normal";

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
    const setQUrl = useSetAtom(qUrlAtom);

    function clearQuickLinkUrl() {
        setQUrl((v) => ({ ...v, data: '' }));
    }

    function pasteOriginalUrl() {
        setQUrl((v) => ({ ...v, data: ourl.data }));
    }

    return (
        <div className={textClasses}>
            <InputWithTitle2Rows
                asCheckbox
                stateAtom={qUseAtom}
                label="Show on mini-dashboard"
                labelClasses="font-normal"
                containerClasses="py-0! col-span-full"
            />

            <InputWithTitle2Rows
                stateAtom={qNameAtom}
                label="Quick link name (*)"
                labelClasses="font-normal"
                containerClasses="py-0! col-span-full"
            />

            <div className="relative">
                <InputWithTitle2Rows
                    asTextarea
                    stateAtom={qUrlAtom}
                    label="Quick link URL (**)"
                    labelClasses="font-normal"
                    containerClasses="py-0! col-span-full"
                />

                <Button className="absolute bottom-1 right-6 size-5" size="icon" variant="ghost" onClick={clearQuickLinkUrl} title="Clear quick link URL">
                    <IconClose className="pt-0.5 size-4" />
                </Button>

                <Button className="absolute bottom-1 right-1.5 size-5" size="icon" variant="ghost" onClick={pasteOriginalUrl} title="Paste original URL">
                    <IconPaste className="pt-0.5 size-4" />
                </Button>
            </div>

            <div className="grid grid-cols-[auto_1fr] gap-1">
                <span className="font-bold">*</span> <p>If "Quick link name" is empty, the template name will be used to show the quick link on mini-dashboard.</p>
                <span className="font-bold">**</span> <p>When the "Quick Link URL" field is empty, the original URL will be used as the URL to open the web page.</p>
            </div>
        </div>
    );
}

const textClasses = "pl-6 pr-0.5 py-3 text-balance grid gap-1.5";

//TODO: original url with % is that OK?
//TODO: add validation:
// - quick link name cannot be empty if quick link show is checked
// - quick link URL cannot be empty if quick link show is checked (or message the same as original url will be used) (may be add button to paste original url)
