import { type PrimitiveAtom } from "jotai";
import { type AtomizeWithType } from "@/utils";
import { type RowInputState } from "@/ui";
import { type Matching, type FormIdx } from "@/store/manifest";

export namespace FormOptionsState {

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
        ourl: string;               // original URL
        murl: string;               // match URL
        rurl: string;               // Regex matching (or any other like wildcards) URL (as usual regex); This is internal value to show validation errors
        
        webCheckUrl: boolean;       // 'web_checkurl' not used by editor; only for detection section creation; in file '1'
        caption: string;            // Windows Caption
        variablecaption: string;    // Variable Caption
        monitor: boolean;           // Monitor screen changes

        dlg_tab: string;
        dlg_class: string;
        dlg_checkexe: boolean;

        emu_pattern: string;

        names: string;
        names_ext: string;
        processname: string;
        commandline: string;

        reCheck: boolean;           // re-check window after fillin
    };

    type p3Auth = {                 // Part Authentication
        aim: boolean;               // Start authentication immediately
        lock: boolean;              // Lock out login fields
        auth_pl: string;            // extended policy (see AuthTokenValues); only one bit as hex string (auth_pl="100"); used only for login form
    };

    type p4QL = {                   // Part Quick Links
        qName: string;              // Quick Link Name
        qUrl: string;               // Quick Link URL
        qUse: boolean;              // Use Quick Link, i.e display on mini-dashboard; now totally depends on 'qName' emptyness
    };

    type p5Icon = {                 // Part Password Manager Icon
        id: string;                 // Location ID
        loc: string;                // Location
    };

    export type ForAtoms = {
        p1General: p1General;
        p2Detect: p2Detect;
        p3Auth: p3Auth;
        p4QL: p4QL;
        p5Icon: p5Icon;

        isFormWeb: boolean;
        formIdx: FormIdx;
        fromFileHOU: Matching.RawMatchData; // Initial values of how, opt, url (HOW) for murl from file
        how: Matching.How;          // how to match URL
        opt: Matching.Options;      // how to match URL
    };

    export type AllAtoms = {
        p1General: AtomizeWithType<p1General, RowInputState>;
        p2Detect: AtomizeWithType<p2Detect, RowInputState>;
        p3Auth: AtomizeWithType<p3Auth, RowInputState>;
        p4QL: AtomizeWithType<p4QL, RowInputState>;
        p5Icon: AtomizeWithType<p5Icon, RowInputState>;

        isWebAtom: PrimitiveAtom<boolean>;
        formIdx: FormIdx;
        fromFileHOU: Matching.RawMatchData;         // Initial values of how, opt, url (HOW) for murl from file
        howAtom: PrimitiveAtom<Matching.How>;       // how to match URL
        optAtom: PrimitiveAtom<Matching.Options>;   // how to match URL
    };
}
