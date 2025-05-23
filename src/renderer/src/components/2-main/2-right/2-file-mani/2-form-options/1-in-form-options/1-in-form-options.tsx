import { type ComponentPropsWithoutRef } from "react";
import { useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { type OFormContextProps, type MFormContextProps, type NFormContextProps } from "@/store/1-atoms/2-file-mani-atoms";
import { AccordionWithTrigger } from "@/ui/motion-primitives";
import { DetectionContent_Web, DetectionContent_W32, PMIcon_W32 } from "./2-in-form-option-blocks";

export function InFormOptions({ n_mCtx, className, ...rest }: { n_mCtx: NFormContextProps | MFormContextProps; } & ComponentPropsWithoutRef<'div'>) {
    const formOptionsCtx = n_mCtx.maniAtoms?.[n_mCtx.formIdx];
    if (!formOptionsCtx) {
        return null;
    }
    const ctx: OFormContextProps = { maniAtoms: n_mCtx.maniAtoms, oAllAtoms: formOptionsCtx, formIdx: n_mCtx.formIdx };
    return (
        <div className={classNames("text-xs flex flex-col items-start gap-1 select-none", className)} {...rest}>
            <div className="font-semibold">
                Additional options
            </div>

            <FormDetection ctx={ctx} />
            <FormW32Icon ctx={ctx} />
            
            {/* <div className="">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae consectetur veritatis ducimus ipsam voluptatibus pariatur tempore nemo explicabo iure suscipit non similique at, veniam quo itaque voluptate minus aut et!
                Quisquam, molestias tenetur quidem magni fuga vero perferendis ipsam voluptas eum saepe beatae cupiditate ducimus? Tenetur ipsam aspernatur cum, ea excepturi eos! Obcaecati illum suscipit, eveniet nesciunt voluptatum possimus alias.
                Velit maxime autem totam molestias rerum mollitia praesentium tenetur ipsum amet modi ut debitis temporibus neque veniam, animi eos necessitatibus! Laboriosam magnam sunt sed facere rerum non architecto quidem maiores!
                Sit, libero nisi qui reiciendis unde fugit eaque totam ratione, obcaecati corporis vel iure officia? Amet ut omnis non inventore! Rem debitis soluta doloremque nemo accusantium, dolor atque temporibus illo?
                <br />
                <br />
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae consectetur veritatis ducimus ipsam voluptatibus pariatur tempore nemo explicabo iure suscipit non similique at, veniam quo itaque voluptate minus aut et!
                Quisquam, molestias tenetur quidem magni fuga vero perferendis ipsam voluptas eum saepe beatae cupiditate ducimus? Tenetur ipsam aspernatur cum, ea excepturi eos! Obcaecati illum suscipit, eveniet nesciunt voluptatum possimus alias.
                Velit maxime autem totam molestias rerum mollitia praesentium tenetur ipsum amet modi ut debitis temporibus neque veniam, animi eos necessitatibus! Laboriosam magnam sunt sed facere rerum non architecto quidem maiores!
                Sit, libero nisi qui reiciendis unde fugit eaque totam ratione, obcaecati corporis vel iure officia? Amet ut omnis non inventore! Rem debitis soluta doloremque nemo accusantium, dolor atque temporibus illo?
            </div> */}
        </div>
    );
}

function FormDetection({ ctx }: { ctx: OFormContextProps; }) {
    const isWeb = useAtomValue(ctx.oAllAtoms.options.isWebAtom);
    const formIdx = ctx.oAllAtoms.options.formIdx;
    return (
        <AccordionWithTrigger name='form-detection' formIdx={formIdx} triggerText="Screen detection">
            {isWeb
                ? <DetectionContent_Web ctx={ctx} />
                : <DetectionContent_W32 ctx={ctx} />
            }
        </AccordionWithTrigger>
    );
}

function FormW32Icon({ ctx }: { ctx: OFormContextProps; }) {
    const isWeb = useAtomValue(ctx.oAllAtoms.options.isWebAtom);
    const formIdx = ctx.oAllAtoms.options.formIdx;
    if (isWeb) {
        return null;
    }
    return (
        <AccordionWithTrigger name='form-icon' formIdx={formIdx} triggerText="Password Manager Icon">
            <PMIcon_W32 ctx={ctx} />
        </AccordionWithTrigger>
    );
}
