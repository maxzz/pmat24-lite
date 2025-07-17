import { useSnapshot } from "valtio";
import { appSettings } from "@/store";
import { type NFormProps } from "@/store/1-atoms/2-file-mani-atoms";
import { FieldRow } from "./2-field-row";
import { TableHeader, getFieldsGridClasses } from "./3-fields-header";

export function InFormBlockFields({ nFormProps }: { nFormProps: NFormProps; }) {
    if (nFormProps.nFormCtx.normal.rowCtxs.length) {
        return <FieldsGridBody nFormProps={nFormProps} />;
    }
    return <NoFields />;
}

function FieldsGridBody({ nFormProps }: { nFormProps: NFormProps; }) {
    const { fcAllowed } = useSnapshot(appSettings.files.shownManis);

    //highlightFieldAtom
    //onblur={() => highlightFieldAtom({ nCtx: ctx, fieldIdx: ctx.nAllAtoms.normal.rowCtxs.length })}
    //onfocus={() => highlightFieldAtom({ nCtx: ctx, fieldIdx: ctx.nAllAtoms.normal.rowCtxs.length })}

    return (
        <div className={getFieldsGridClasses(fcAllowed)}>
            <TableHeader />

            {nFormProps.nFormCtx.normal.rowCtxs.map(
                (fieldRowAtoms, idx) => (
                    <FieldRow
                        rowCtx={fieldRowAtoms}
                        fileUsCtx={nFormProps.nFormCtx.fileUsCtx}
                        key={idx}
                    />
                ))
            }
        </div>
    );
}

function NoFields() {
    return (
        <div className="p-2 text-xs text-mani-title/30 select-none">
            There are no fields in the form.
        </div>
    );
}
