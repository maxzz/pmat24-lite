import { useSnapshot } from "valtio";
import { appSettings } from "@/store";
import { FormIdx } from "@/store/manifest";
import { type NFormProps } from "@/store/1-file-mani-atoms";
import { FieldRow } from "./2-field-row";
import { TableHeader, getFieldsGridClasses } from "./3-fields-header";

export function FieldsList({ nFormProps }: { nFormProps: NFormProps; }) {
    const noFields = !nFormProps.nFormCtx.normal.rowCtxs.length;
    return (<>
        {noFields
            ? (
                <div className="p-2 text-xs text-mani-title/30 select-none">
                    There are no fields in the form.
                </div>
            )
            : (
                <FieldsGridBody nFormProps={nFormProps} />
            )
        }
    </>);
}

function FieldsGridBody({ nFormProps }: { nFormProps: NFormProps; }) {
    const { fcAllowed } = useSnapshot(appSettings.files.shownManis);
    const isPasswordForm = nFormProps.nFormCtx.fileUsCtx.formIdx === FormIdx.cpass;

    //TODO: (maybe) highlightFieldAtom. Now we highlight only label column
    //onblur={() => highlightFieldAtom({ nCtx: ctx, fieldIdx: ctx.nAllAtoms.normal.rowCtxs.length })}
    //onfocus={() => highlightFieldAtom({ nCtx: ctx, fieldIdx: ctx.nAllAtoms.normal.rowCtxs.length })}

    return (
        <div className={getFieldsGridClasses(fcAllowed)}>
            <TableHeader isPasswordForm={isPasswordForm} />

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
