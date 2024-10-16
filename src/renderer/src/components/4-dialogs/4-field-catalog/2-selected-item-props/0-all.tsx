import { useEffect, useState } from "react";
import { atom, useAtom, useAtomValue } from "jotai";
import { turnOffAutoComplete } from "@/utils";
import { type SelectedItemAtom } from "@/store";
import { PropInput } from "./8-input";

const inputHeight28Classes = 'px-2 py-1.5 text-xs'; // h-7
const inputHeight32Classes = 'px-2 py-1.5 text-sm'; // h-8

export function SelectedItemBody({ selectedItemAtom }: { selectedItemAtom: SelectedItemAtom; }) {
    const selectedItem = useAtomValue(selectedItemAtom);

    const nameAtom = useState(() => atom(selectedItem?.displayname || ''))[0];
    const valueAtom = useState(() => atom(selectedItem?.value || ''))[0];
    const typeAtom = useState(() => atom(!selectedItem ? '' : selectedItem?.password ? 'psw' : 'txt'))[0];
    const ownernoteAtom = useState(() => atom(selectedItem?.ownernote || ''))[0];

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

    const itemClasses = "flex flex-col items-start";

    return (
        <div className="mt-2 text-xs grid grid-cols-[min-content_auto_10rem] gap-x-2">

            <div className={itemClasses}>
                <div>Type</div>
                <PropInput className="w-[3rem]" value={localType} onChange={(e) => setLocalType(e.target.value)} {...turnOffAutoComplete} />
            </div>

            <div className={itemClasses}>
                <div>Name</div>
                <PropInput value={localName} onChange={(e) => setLocalName(e.target.value)} {...turnOffAutoComplete} />
            </div>

            <div className={itemClasses}>
                <div>Value</div>
                <PropInput value={localValue} onChange={(e) => setLocalValue(e.target.value)} {...turnOffAutoComplete} />
            </div>

            <div className={`mt-2 col-span-full ${itemClasses}`}>
                <div>Description</div>
                <textarea
                    className="p-1 w-full min-h-[3rem] text-[.65rem] leading-3 bg-primary-700 rounded" rows={3}
                    value={ownernote}
                    onChange={(e) => { setOwnernote(e.target.value); }}
                    {...turnOffAutoComplete}
                />
            </div>
        </div>
    ); //max-w-[340px]
}
