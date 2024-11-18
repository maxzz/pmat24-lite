import { useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import { type FceCtx } from "@/store";
import { PropInput, PropInputValue, PropTextarea } from "./8-inputs";
import { classNames } from "@/utils";

const itemClasses = "flex flex-col";

export function SelectedItemBody({ fceCtx }: { fceCtx: FceCtx; }) {

    const selectedItem = useAtomValue(fceCtx.selectedItemAtom);

    const { nameAtom, valueAtom, typeAtom, ownernoteAtom } = fceCtx.fcePropAtoms;

    const [localName, setLocalName] = useAtom(nameAtom);
    const [localValue, setLocalValue] = useAtom(valueAtom);
    const [localType, setLocalType] = useAtom(typeAtom);
    const [ownernote, setOwnernote] = useAtom(ownernoteAtom);

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
        <SelectedInxView fceCtx={fceCtx} />

        <div className="pb-2">
            Field Type: {localType === 'txt' ? 'Text' : 'Password'}
        </div>

        <div className={itemClasses}>
            <PropInput label={"Name"} value={localName} onChange={(e) => setLocalName(e.target.value)} />
        </div>

        <div className={classNames(itemClasses, "pt-2")}>
            <PropInputValue label={"Value"} fceCtx={fceCtx} value={localValue} onChange={(e) => setLocalValue(e.target.value)} />
        </div>

        <div className={classNames(itemClasses, "pt-2")}>
            <PropTextarea label="Description" value={ownernote} onChange={(e) => setOwnernote(e.target.value)} />
        </div>

        <div className="pt-1 text-[.65rem] text-muted-foreground">
            ID: {selectedItem?.dbname}
        </div>
    </>);
}

//TODO: don't allow to change type if item; type defined from the Add menu
//TODO: value input should from normal mode editor as result we don't need validation
//TODO: we still need to validate the name input field is not empty or assign a default name #

//TODO: scroll to newly created item
//TODO: scroll the initial item if provided

//TODO: show item's dbid

function SelectedInxView({ fceCtx }: { fceCtx: FceCtx; }) {
    const selectedIdx = useAtomValue(fceCtx.selectedIdxStoreAtom);
    return (
        <div className="absolute top-1 right-2 mt-1 p-1 h-4 aspect-square text-xs text-muted-foreground flex items-center justify-center rounded-sm">
            {selectedIdx === -1 ? '' : `${selectedIdx + 1}`}
        </div>
    );
}
