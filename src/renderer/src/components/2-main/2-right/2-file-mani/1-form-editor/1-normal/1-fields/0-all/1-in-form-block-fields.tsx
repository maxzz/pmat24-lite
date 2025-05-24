import { useSnapshot } from "valtio";
import { appSettings } from "@/store";
import { type NFormContextProps } from "@/store/1-atoms/2-file-mani-atoms";
import { FieldRow } from "./2-field-row";
import { TableHeader, getFieldsGridClasses } from "./3-fields-header";

export function InFormBlockFields({ ctx }: { ctx: NFormContextProps; }) {
    if (!ctx.nAllAtoms.normal.rowCtxs.length) {
        return <NoFields />;
    }

    return <FieldsGridBody ctx={ctx} />;
}

function NoFields() {
    return (
        <div className="p-2 text-xs text-mani-title/30 select-none">
            There are no fields in the form.
        </div>
    );
}

function FieldsGridBody({ ctx }: { ctx: NFormContextProps; }) {
    const { fcAllowed } = useSnapshot(appSettings.files.shownManis);

    //highlightFieldAtom
    //onblur={() => highlightFieldAtom({ nCtx: ctx, fieldIdx: ctx.nAllAtoms.normal.rowCtxs.length })}
    //onfocus={() => highlightFieldAtom({ nCtx: ctx, fieldIdx: ctx.nAllAtoms.normal.rowCtxs.length })}

    return (
        <div className={getFieldsGridClasses(fcAllowed)}>
            <TableHeader />

            {ctx.nAllAtoms.normal.rowCtxs.map(
                (fieldRowAtoms, idx) => (
                    <FieldRow rowCtx={fieldRowAtoms} fileUsCtx={ctx.nAllAtoms.fileUsCtx} key={idx} />
                ))
            }
        </div>
    );
}
