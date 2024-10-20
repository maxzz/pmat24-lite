import { HTMLAttributes, useEffect, useState } from "react";
import { atom, useAtom, useAtomValue } from "jotai";
import { type SelectedItemAtom } from "@/store";
import { PropInput, PropTextarea } from "./8-inputs";
import { classNames } from "@/utils";

const inputHeight28Classes = 'px-2 py-1.5 text-xs'; // h-7
const inputHeight32Classes = 'px-2 py-1.5 text-sm'; // h-8

const itemClasses = "flex flex-col";

export function SelectedItemBody({ selectedItemAtom, className, ...rest }: { selectedItemAtom: SelectedItemAtom; } & HTMLAttributes<HTMLDivElement>) {

    const selectedItem = useAtomValue(selectedItemAtom);

    const nameAtom      /**/ = useState(() => atom(selectedItem?.displayname || ''))[0];
    const valueAtom     /**/ = useState(() => atom(selectedItem?.value || ''))[0];
    const typeAtom      /**/ = useState(() => atom(!selectedItem ? '' : selectedItem?.password ? 'psw' : 'txt'))[0];
    const ownernoteAtom /**/ = useState(() => atom(selectedItem?.ownernote || ''))[0];

    const [localName, setLocalName] = useAtom(nameAtom);
    const [localValue, setLocalValue] = useAtom(valueAtom);
    const [localType, setLocalType] = useAtom(typeAtom);
    const [ownernote, setOwnernote] = useAtom(ownernoteAtom);

    useEffect(
        () => {
            setLocalName(selectedItem?.displayname || '');
            setLocalValue(selectedItem?.value || '');
            setLocalType(!selectedItem ? '' : selectedItem?.password ? 'psw' : 'txt');
            setOwnernote(selectedItem?.ownernote || JSON.stringify(selectedItem || {}));
        }, [selectedItem]
    );

    return (
        <div className={classNames("text-xs flex flex-col", className)} {...rest}>

            <div className={itemClasses}>
                <PropInput label={"Type"} className="w-[3rem]" value={localType} onChange={(e) => setLocalType(e.target.value)} />
            </div>

            <div className={itemClasses}>
                <PropInput label={"Name"} value={localName} onChange={(e) => setLocalName(e.target.value)} />
            </div>

            <div className={itemClasses}>
                <PropInput label={"Value"} value={localValue} onChange={(e) => setLocalValue(e.target.value)} />
            </div>

            <div className={itemClasses}>
                <PropTextarea label="Description" value={ownernote} onChange={(e) => setOwnernote(e.target.value)} />
            </div>
        </div>
    );
}

//TODO: don't allow to change type if item; type defined from the Add menu
//TODO: value input should from normal mode editor as result we don't need validation
//TODO: we still need to validate the name input field is not empty or assign a default name #

//TODO: scroll to newly created item
//TODO: scroll the initial item if provided

//TODO: show item's dbid
