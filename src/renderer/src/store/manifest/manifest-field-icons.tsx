import { FC } from 'react';
import { FieldTyp, Mani } from "@/store/manifest";
import { EngineControl } from "@shared/ipc-types";
import { SymbolFieldBtn, SymbolFieldTxt, SymbolFieldChk, SymbolFieldLst, SymbolFieldPsw, SymbolFieldEdt } from "@ui/icons";

export const fieldIcons: Record<Exclude<keyof typeof FieldTyp, 'und'>, FC> = {
    edit: SymbolFieldEdt,
    psw: SymbolFieldPsw,
    check: SymbolFieldChk,
    radio: SymbolFieldChk,
    list: SymbolFieldLst,
    combo: SymbolFieldLst,
    text: SymbolFieldTxt,
    button: SymbolFieldBtn,
    listbx: SymbolFieldLst,
};

export type TypeFieldsForIcon = Pick<Mani.Field, 'type' | 'password' | 'choosevalue'>;

export function FieldTypeIconComponent({ field, className }: { field: TypeFieldsForIcon; className?: string; }) {
    const type = field.password
        ? "psw"
        : field.type as keyof typeof fieldIcons;
        
    const title =
        type === "list"
            ? `Field choices: ${field.choosevalue}`
            : `Field type: ${type}`;

    const Icon = fieldIcons[type]?.({ className, title }) || <div className="text-red-500">nan</div>;
    return Icon;
}

export function engineControlToFieldIconType(item: EngineControl): TypeFieldsForIcon {
    const isPsw = item.type === 'psw';
    return {
        type: (isPsw ? 'edit' : item.type) as Mani.FieldTypeStr,
        password: isPsw,
        ...(item.choosevalues.length && { choosevalue: item.choosevalues.join(',') }),
    };
}
