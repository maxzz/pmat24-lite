import { FileMani, Meta } from "@/store/manifest";
import { FieldConv } from "../../1-fields/0-conv";

export namespace ManiConv {

    export function fieldForFileMani(from: FieldConv.ThisType, metaField: Meta.Field): FileMani.Field {
        const maniField = metaField.mani;

        const rv: FileMani.Field = {
            ...(from.displayname && { displayname: from.displayname }),
            type: from.type,
            dbname: from.dbname,
            //...(maniField.pa)
            ...(maniField.path_ext && { path_ext: maniField.path_ext }),
            ...(from.askalways && { askalways: '1' }),
            ...(from.onetvalue && { onetvalue: '1' }),
            ...(from.policy && { policy: from.policy }),
            ...(from.policy2 && { policy2: from.policy2 }),
            ...(from.options && { options: from.options }),
            ...(from.password && { password: '1' }),
            ...(from.useit && { useit: '1' }),
        };
        return rv;
    }

}

//TODO: we need to correlate policies with password change form
