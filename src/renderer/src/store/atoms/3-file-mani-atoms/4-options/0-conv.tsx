import { Getter, Setter } from "jotai";
import { Atomize } from "@/util-hooks";
import { FileUsAtom, FormIdx } from '@/store/store-types';

export namespace OptionsConv {
    
    type UiPart1General = {
        name: string;       // login name
        desc: string;       // login description; Mani.Options.sidekick
        hint: string;       // user hint; Mani.Options.ownernote
        balloon: string;    // show balloon # times; note: value should be a number, but it's stored as string
    };
    
    type UiPart2ScreenDetection = {
        url: string;        // URL
        caption: string;    // Windows Caption
        monitor: boolean;   // Monitor screen changes
    };
    
    type UiPart3Authentication = {
        aim: boolean;       // Start authentication immediately
        lock: boolean;      // Lock out login fields
    };
    
    type UiPart4QL = {
        dashboard: boolean; // Display on mini-dashboard
        name: string;       // Quick Link Name
        url: string;        // Quick Link URL
    };
    
    type UiPart5PasswordManagerIcon = {
        id: string;         // Location ID
        loc: string;        // Location
    };
    
    export type FormOptionsAtoms = {
        uiPart1General: Atomize<UiPart1General>;
        uiPart4QL: Atomize<UiPart4QL>;
        uiPart2ScreenDetection: Atomize<UiPart2ScreenDetection>;
        uiPart3Authentication: Atomize<UiPart3Authentication>;
        uiPart5PasswordManagerIcon: Atomize<UiPart5PasswordManagerIcon>;
    
        fileUsAtom: FileUsAtom;
        formIdx: FormIdx;
    };
    
}
