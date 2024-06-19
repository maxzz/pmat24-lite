import { Getter, Setter } from "jotai";
import { FileUs, FileUsAtom } from "@/store/store-types";
import { FieldConv } from "../../1-fields/0-conv";
import { FileMani, Meta } from "@/store/manifest";

//TODO: we need to correlate policies with password change form

/*
// Order is important to keep the same order as in manifest. see oti_manifest_io.h::save_field()
    out_begin(os, "<field");
        out(os, "displayname", field_.displayname);
        out(os, "type", internal_io::mapping::MAP_FIELD_TYPE::cast(field_.type));
        out(os, "dbname", field_.dbname);
        out(os, "path", oldPath_);
        out(os, "path_ext", field_.path);

        out(os, "policy", policyOld);
        out(os, "policy2", policyExt);
        out(os, "options", customRuleOptions);

        out(os, "value", textchars::low::remove_illegal(field_.value.memvalue));

        out(os, "choosevalue", textchars::low::remove_illegal(field_.value.choosevalue));

        out(os, "rfield", internal_io::mapping::MAP_RDIRECTION_TYPE::cast(field_.rdir));
        out(os, "rfieldform", internal_io::mapping::MAP_FORMNAME_TYPE::cast(field_.rfield.rmemid.form));
        out(os, "rfieldindex", internal_io::mapping::MAP_NUMBER_TYPE::cast(field_.rfield.rindex));

        out(os, "askalways", field_.value.askalways77);
        out(os, "onetvalue", field_.value.onetvalue77);
        out(os, "password", field_.password);
        out(os, "submit", field_.controltosubmitdata);
        out(os, "useit", field_.useit);

        out(os, "accid", strings::conv_int(field_.ids.accid));
    out_end(os);
*/

namespace PackManifestData {
    export function forFileMani(from: FieldConv.ThisType, metaField: Meta.Field): FileMani.Field {
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

export function packManifestData(get: Getter, set: Setter, fileUs: FileUs, fileUsAtom: FileUsAtom, newFilename?: string) {

    const maniAtoms = get(fileUs.maniAtomsAtom);
    if (!maniAtoms) {
        return;
    }

    const loginFormAtoms = maniAtoms[0];
    const cpassFormAtoms = maniAtoms[1];

    if (loginFormAtoms) {

        loginFormAtoms.fieldsAtoms.map((fieldAtoms) => {
            const fromAtomValues = FieldConv.fromAtoms(fieldAtoms, get, set);
            const maniValues = FieldConv.forMani(fromAtomValues);
            const fileValues = PackManifestData.forFileMani(maniValues, fieldAtoms.metaField);

            console.log('maniValues', JSON.stringify(fileValues, null, 2));
        });

        // loginFormAtoms.submitAtoms;
        // loginFormAtoms.policyAtoms;
        // loginFormAtoms.optionsAtoms;
    }

    console.log('saved', fileUs.fname);

    // fileUs.changesSet.clear();

    //TODO: validate
    //TODO: check if we can save from web or electron
    //TODO: collect all data from all atoms
    //TODO: each file may have no filename
    // const loginFormAtoms = maniAtoms[0];
    // const cpassFormAtoms = maniAtoms[1];
    // if (loginFormAtoms) {
    //     loginFormAtoms.fieldsAtoms;
    //     loginFormAtoms.submitAtoms;
    //     loginFormAtoms.policyAtoms;
    //     loginFormAtoms.optionsAtoms;
    // }
}
