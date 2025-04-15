import { useState } from "react";
import { atom, useAtomValue } from "jotai";
import { FormIdx } from "@/store/manifest";
import { type FileUs } from "@/store/store-types";
import { type OFormContextProps } from "@/store/1-atoms/2-file-mani-atoms";
import { ButtonSliders, RowInputAndButtonWTitle, SectionTitle, UiAccordion } from "../9-controls";
import { BlockWrap_Detection, BlockWrap_Auth, BlockWrap_Quicklink, BlockWrap_Icon } from "./1-all-block-wraps";
import { Part1General } from "./2-1-general";

export function ManiEditorAllOptions({ fileUs }: { fileUs: FileUs; }) {
    const maniAtoms = useAtomValue(fileUs.maniAtomsAtom);
    if (!maniAtoms) {
        return null;
    }

    const [login, cpass] = maniAtoms;
    if (!login && !cpass) {
        return (
            <div>
                No forms. It can be a manifest to exclude website support (It has to be no fields not forms).
            </div>
        );
    }

    const loginCtx: OFormContextProps | undefined = login && { maniAtoms, oAllAtoms: { fileUsCtx: login.fileUsCtx, options: login.options }, formIdx: FormIdx.login };
    const cpassCtx: OFormContextProps | undefined = cpass && { maniAtoms, oAllAtoms: { fileUsCtx: cpass.fileUsCtx, options: cpass.options }, formIdx: FormIdx.cpass };

    return (
        <div className={optionsAllGroupsClasses}>
            {loginCtx && (<>
                <SectionTitle label="Manifest options" />
                <GroupManiGeneral ctx={loginCtx} />

                <SectionTitle label="Login form options" />
                <GroupFormLogin ctx={loginCtx} />
            </>)}

            {cpassCtx && (<>
                <SectionTitle label="Password change form options" />
                <GroupFormCpass ctx={cpassCtx} />
            </>)}
        </div>
    );
}

const optionsAllGroupsClasses = "ml-1 mr-3 grid grid-cols-[auto_minmax(0,1fr)] gap-x-2 gap-y-0.5 select-none";

function GroupManiGeneral({ ctx }: { ctx: OFormContextProps; }) {
    const openAtom = useState(() => atom(false))[0];
    const open = useAtomValue(openAtom);
    const { nameAtom } = ctx.oAllAtoms.options.p1General;
    return (<>
        <RowInputAndButtonWTitle
            label="Managed login name"
            stateAtom={nameAtom}
            button={<ButtonSliders openAtom={openAtom} />}
        />

        <UiAccordion open={open}>
            <Part1General ctx={ctx} />
        </UiAccordion>
    </>);
}

function GroupFormLogin({ ctx }: { ctx: OFormContextProps; }) {
    return (<>
        <BlockWrap_Auth ctx={ctx} />
        <BlockWrap_Quicklink ctx={ctx} />
        <BlockWrap_Detection ctx={ctx} />
        <BlockWrap_Icon ctx={ctx} />
    </>);
}

function GroupFormCpass({ ctx }: { ctx: OFormContextProps; }) {
    return (<>
        <BlockWrap_Auth ctx={ctx} />
        <BlockWrap_Quicklink ctx={ctx} />
        <BlockWrap_Detection ctx={ctx} />
        <BlockWrap_Icon ctx={ctx} />
    </>);
}

//TODO: Do we need to show fields: window caption and classname if they don't have sense for web, but created w/ IE?
