import { Getter, Setter } from "jotai";
import { Atomize, OnValueChangeAny } from '@/util-hooks';
import { Meta } from "pm-manifest";
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

    // export type OptionsForAtoms = {
    //     uiPart1General: UiPart1General;
    //     uiPart4QL: UiPart4QL;
    //     uiPart2ScreenDetection: UiPart2ScreenDetection;
    //     uiPart3Authentication: UiPart3Authentication;
    //     uiPart5PasswordManagerIcon: UiPart5PasswordManagerIcon;
    // }
    
    export type FormOptionsAtoms = {
        uiPart1General: Atomize<UiPart1General>;
        uiPart4QL: Atomize<UiPart4QL>;
        uiPart2ScreenDetection: Atomize<UiPart2ScreenDetection>;
        uiPart3Authentication: Atomize<UiPart3Authentication>;
        uiPart5PasswordManagerIcon: Atomize<UiPart5PasswordManagerIcon>;
    
        fileUsAtom: FileUsAtom;
        formIdx: FormIdx;
    };
 
/** /
export function forAtoms(metaForm: Meta.Form): SubmitForAtoms {
    const { buttonNames, initialSelected } = getSubmitChoices(metaForm);

    const doSubmit = metaForm.mani.options?.submittype === 'dosubmit';
    const isDoSubmitUndefined = typeof metaForm.mani.options?.submittype === 'undefined';

    const rv: SubmitForAtoms = {
        buttonNames,
        selected: initialSelected,
        doSubmit,
        isDoSubmitUndefined,
    };
    return rv;
}
/**/
/** /
export function forMani(from: SubmitForAtoms, metaForm: Meta.Form) {
    const rv: ThisType = {
        useit: from.useIt,
        displayname: from.label,
        dbname: from.dbname,
        ...fieldTyp2Obj(from.type),
    };

    TransformValue.valueLife2Mani(from.valueLife, rv);
    return rv;
}
/**/

//
/** /

export function toAtoms(initialState: SubmitForAtoms, onChange: OnValueChangeAny): Atomize<SubmitForAtoms> {
    const { useIt, label, type, dbname, valueLife } = initialState;
    return {
        useItAtom: atomWithCallback(useIt, onChange),
        labelAtom: atomWithCallback(label, onChange),
        typeAtom: atomWithCallback(type, onChange),
        valueLifeAtom: atomWithCallback(valueLife, onChange),
        dbnameAtom: atomWithCallback(dbname, onChange),
    };
}
/**/
/** /

export function fromAtoms(atoms: SubmitAtoms, get: Getter, set: Setter): SubmitForAtoms {
    const rv = {
        useIt: get(atoms.useItAtom),
        label: get(atoms.labelAtom),
        type: get(atoms.typeAtom),
        valueLife: get(atoms.valueLifeAtom),
        dbname: get(atoms.dbnameAtom),
    };
    return rv;
}
/** /

//
/** /

function theSameValue(from: ValueLife, to: ValueLife): boolean {
    const rv = (
        from.value === to.value &&
        from.valueAs === to.valueAs &&
        from.isRef === to.isRef
    );
    return rv;
}
/** /

/** /
export function areTheSame(from: SubmitForAtoms, to: SubmitForAtoms): boolean {
    const rv = (
        from.useIt === to.useIt &&
        from.label === to.label &&
        from.type === to.type &&
        from.dbname === to.dbname &&
        theSameValue(from.valueLife, to.valueLife) &&
        from.valueLife.valueAs === to.valueLife.valueAs
    );
    return rv;
}
/**/
    
}
