import { PrimitiveAtom } from "jotai";
import { AtomizeWithType } from '@/util-hooks';
import { RowInputState } from "@/ui";
import { FormIdx } from "@/store/store-types";

export namespace ManiOptions {

    type p1General = {              // Part General
        name: string;               // login name
        desc: string;               // login description; Mani.Options.sidekick
        hint: string;               // user hint; Mani.Options.ownernote
        balloon: string;            // show balloon # times; note: value should be a number, but it's stored as string
        submitType: string;         // "dosubmit" | "nosubmit"
        qlName: string;             // Quick Link Name
        qlWoCred: boolean;          // Quick reauthentication enable/disable (QL wo/ crededntials). I'm not sure why it's here at all
        unkAttrs: string;           // unknown attributes
    };

    type p2Detect = {               // Part Screen Detection
        url: string;                // URL
        caption: string;            // Windows Caption
        monitor: boolean;           // Monitor screen changes

        dlg_tab: string;
        dlg_class: string;
        dlg_checkexe: boolean;

        emu_pattern: string;

        names: string;
        names_ext: string;
        processname: string;
        commandline: string;

        reCheck: boolean;           // re-check windowa after fillin
    };

    type p3Auth = {                 // Part Authentication
        aim: boolean;               // Start authentication immediately
        lock: boolean;              // Lock out login fields
        auth_pl: string;            // extended policy (see AuthTokenValues); only one bit as hex string (auth_pl="100"); used only for login form
    };

    type p4QL = {                   // Part Quick Links
        dashboard: boolean;         // Display on mini-dashboard
        qName: string;              // Quick Link Name
        qUrl: string;               // Quick Link URL
        qUse: boolean;              // Use Quick Link
    };

    type p5Icon = {                 // Part Password Manager Icon
        id: string;                 // Location ID
        loc: string;                // Location
    };

    export type OptionsForAtoms = {
        p1General: p1General;
        p2Detect: p2Detect;
        p3Auth: p3Auth;
        p4QL: p4QL;
        p5Icon: p5Icon;

        isWeb: boolean;
        formIdx: FormIdx;
    };

    export type FormOptionsAtoms = {
        p1General: AtomizeWithType<p1General, RowInputState>;
        p2Detect: AtomizeWithType<p2Detect, RowInputState>;
        p3Auth: AtomizeWithType<p3Auth, RowInputState>;
        p4QL: AtomizeWithType<p4QL, RowInputState>;
        p5Icon: AtomizeWithType<p5Icon, RowInputState>;

        isWebAtom: PrimitiveAtom<boolean>;
        formIdx: FormIdx;
    };
}