import { InputHTMLAttributes, useEffect, useState } from "react";
import { PrimitiveAtom, atom, useAtom, useAtomValue } from "jotai";
import { CatalogItem } from "@/store/manifest";
import { classNames, turnOffAutoComplete } from "@/utils";

const inputHeight28Classes = 'px-2 py-1.5 text-xs'; // h-7
const inputHeight32Classes = 'px-2 py-1.5 text-sm'; // h-8
export const inputFocusClasses = "focus:outline-none focus:ring-1 focus:ring-primary-400  focus:ring-offset-1 focus:ring-offset-primary-800";

function Input({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input className={classNames("px-2 py-1.5 w-full text-primary-300 bg-primary-700 rounded", inputFocusClasses, className)} {...rest} />
    );
}

export function SelectedItemBody({ selectedItemAtom }: { selectedItemAtom: PrimitiveAtom<CatalogItem | null>; }) {
    const selectedItem = useAtomValue(selectedItemAtom);

    const nameAtom = useState(() => atom(selectedItem?.displayname || ''))[0];
    const [localName, setLocalName] = useAtom(nameAtom);

    const valueAtom = useState(() => atom(selectedItem?.value || ''))[0];
    const [localValue, setLocalValue] = useAtom(valueAtom);

    const typeAtom = useState(() => atom(!selectedItem ? '' : selectedItem?.password ? 'psw' : 'txt'))[0];
    const [localType, setLocalType] = useAtom(typeAtom);

    const ownernoteAtom = useState(() => atom(selectedItem?.ownernote || ''))[0];
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
                <Input className="w-[3rem]" value={localType} onChange={(e) => setLocalType(e.target.value)} {...turnOffAutoComplete} />
            </div>

            <div className={itemClasses}>
                <div>Name</div>
                <Input value={localName} onChange={(e) => setLocalName(e.target.value)} {...turnOffAutoComplete} />
            </div>

            <div className={itemClasses}>
                <div>Value</div>
                <Input value={localValue} onChange={(e) => setLocalValue(e.target.value)} {...turnOffAutoComplete} />
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
