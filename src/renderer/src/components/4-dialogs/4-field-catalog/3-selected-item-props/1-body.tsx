import { useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import { type FceCtx } from "@/store";
import { PropInput, PropInputValue, PropTextarea } from "./8-inputs";

const itemClasses = "flex flex-col";

export function SelectedItemBody({ fceCtx }: { fceCtx: FceCtx; }) {

    const selectedItem = useAtomValue(fceCtx.selectedItemAtom);

    const [localName, setLocalName] = useAtom(fceCtx.nameAtom);
    const [localValue, setLocalValue] = useAtom(fceCtx.valueAtom);
    const [localType, setLocalType] = useAtom(fceCtx.typeAtom);
    const [ownernote, setOwnernote] = useAtom(fceCtx.ownernoteAtom);

    useEffect(
        () => {
            setLocalName(selectedItem?.displayname || '');
            setLocalValue(selectedItem?.value || '');
            setLocalType(!selectedItem ? '' : selectedItem?.password ? 'psw' : 'txt');
            setOwnernote(selectedItem?.ownernote || '');
            // setOwnernote(selectedItem?.ownernote || JSON.stringify(selectedItem || {})); // temp to debug size of the ownernote field
        }, [selectedItem]
    );

    return (<>
        <div className={itemClasses}>
            <PropInput label={"Name"} value={localName} onChange={(e) => setLocalName(e.target.value)} />
        </div>

        <div className="py-2">
            Field type: {localType === 'txt' ? 'Text' : 'Password'}
        </div>

        <div className={itemClasses}>
            <PropInputValue label={"Value"} fceCtx={fceCtx} value={localValue} onChange={(e) => setLocalValue(e.target.value)} />
        </div>

        <div className={itemClasses}>
            <PropTextarea label="Description" value={ownernote} onChange={(e) => setOwnernote(e.target.value)} />
        </div>
    </>);
}

//TODO: don't allow to change type if item; type defined from the Add menu
//TODO: value input should from normal mode editor as result we don't need validation
//TODO: we still need to validate the name input field is not empty or assign a default name #

//TODO: scroll to newly created item
//TODO: scroll the initial item if provided

//TODO: show item's dbid
