import { Mani } from "pm-manifest";

export namespace FileMani {         // This is a file structure wo/ boolean values

    export type FieldValueValue = {
        value?: string;
        choosevalue?: string;       // This does not exist in field catalog yet but we can added it to field catalog (as 2023 extension).
        password?: '1';             // In file it's undefined | '1'. Only field catalog or manual mode can change this value.
        askalways?: '1';            // In file it's undefined | '1'.
        onetvalue?: '1';            // In file it's undefined | '1'.
    };

    export type FieldValueIds = {
        displayname?: string;       // It should be '' (in momory) if undefined and empty won't be stored in file (for localization). In filed catalog this is "dispname" and is required so we mark it here as required as well.
        dbname: string;
        ownernote?: string;         // This is not stored in Field and may appear in Field Catalog only.
    };

    export type FieldValue = FieldValueValue & FieldValueIds;

    export type FieldPolicySome = {
        policy?: string;            // This is standard rule: "[p4]g:8:8:withspecial:different_ap"
        policy2?: string;           // This is custom rule like: "[e1]g:(a{4,4}d{2,2}A{1,1}[@#$%!]{1,1})&lt;8,8&gt;"; both can present at the same time. It's defined in file, but not in c++.
        options?: string;           // see FieldPolicyOptions type
    };

    export type FieldDirection = {
        rfield?: 'in' | 'out';
        rfieldindex?: string;       // "2"
        rfieldform?: string;        // refs from login form
    };

    export type Field = FieldValue & FieldPolicySome & FieldDirection & Prettify<{
        type: Mani.FieldTypeStr;    // This does not exist in field catalog

        path_ext?: string;          // path to this control with accessiblity info if exists

        submit?: '1';               // "1"
        useit?: '1';                // "1"

        controltosubmitdata?: '1';
        ids?: string;
    }>;

    //////////////////

    export type Detection = {
        caption?: string;
        web_ourl?: string;
        web_murl?: string;
        web_qurl?: string;
        web_checkurl?: '1';             // "1"
        dlg_class?: string;
        names_ext?: string;
        processname?: string;
        commandline?: string;
    };

    export type Options = {
        choosename?: string;
        sidekick?: string;              // "manual mode hint"
        ownernote?: string;
        quicklink?: string;             // QL menu name
        auth_pl?: string;               // extended policy (see AuthTokenValues); only one bit as hex string (auth_pl="100"); used only for login form
        balooncount?: string;
        autoprompt?: string;            // boolean
        lockfields?: string;            // "0" | "1"
        submittype?: string;            // "dosubmit" | "nosubmit"
        iconkey?: string;               // Any name not necessarily unique
        iconlocation?: string;          // Format is the same as described into feedback_drawing.h. "Q:0:0:0"
        usequicklink?: string;          // ("1" | "usequicklink") | ("2" | "dontusequicklink")
        recheckwindowafterfillin?: string; // boolean
        qlwocred?: string;              // boolean. Quick reauthentication enable/disable (QL wo/ crededntials).
    };

    export type Form = {
        detection: Detection;
        options: Options;
        fields: Field[];
    };

    export type Descriptor = {
        id: string;                     // "{fe94ea4f-ac76-4f7d-9c74-fa14abca889b}"
        created: string;                // "1d57495 61c6f733"
        modified: string;               // "1d57496 87bed3e8",
        integrity?: string;             // "OTS2.056a41167041b1ea2c529494aeb606d0e"
        version: string;                // "2.4.3"
    };

    export namespace Customization {
        export type Process = {
            name: string;               // process name like 'outlook.exe'
            type: string;               // 'skip'
        };
        export type Options = {
            processes: Process[];
        };
    }

    export type Manifest = {
        descriptor: Descriptor;
        options?: Customization.Options;
        forms: Form[];
    };
}
