import { useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import { FieldTyp, ValueAs } from "@/store/manifest";
import { type FceCtx } from "@/store";
import { PropInput, PropInputValue, PropTextarea } from "./8-inputs";
import { classNames } from "@/utils";

const itemClasses = "flex flex-col";

export function SelectedItemPropsBody({ fceCtx }: { fceCtx: FceCtx; }) {

    const selectedItem = useAtomValue(fceCtx.selectedItemAtom);

    const { nameAtom, valueAtom, ownernoteAtom, valueLifeAtom } = fceCtx.fcePropAtoms;

    const [displayName, setDisplayName] = useAtom(nameAtom);
    const [value, setValue] = useAtom(valueAtom);
    const [ownernote, setOwnernote] = useAtom(ownernoteAtom);
    const [valueLife, setValueLife] = useAtom(valueLifeAtom);

    useEffect(
        () => {
            setDisplayName(selectedItem?.fieldValue.displayname || '');
            setValue(selectedItem?.fieldValue.value || '');
            setOwnernote(selectedItem?.fieldValue.ownernote || '');
            setValueLife(selectedItem?.fieldValue || { fType: FieldTyp.edit, value: '', isRef: false, valueAs: ValueAs.askReuse, isNon: false });
        }, [selectedItem]
    );

    return (<>
        <SelectedInxView fceCtx={fceCtx} />

        <div className="pb-2">
            Field Type: {valueLife.fType === FieldTyp.edit ? 'Text' : 'Password'}
        </div>

        <div className={itemClasses}>
            <PropInput label={"Name"} value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
        </div>

        <div className={classNames(itemClasses, "pt-2")}>
            <PropInputValue label={"Value"} fceCtx={fceCtx} value={value} onChange={(e) => setValue(e.target.value)} />
        </div>

        <div className={classNames(itemClasses, "pt-2")}>
            <PropTextarea label="Description" value={ownernote} onChange={(e) => setOwnernote(e.target.value)} />
        </div>

        {!fceCtx.isDlgCtx && (
            <div className="pt-1 text-[.65rem] h-4 text-muted-foreground">
                ID: {selectedItem ? selectedItem?.fieldValue.dbname : 'No item selected'}
            </div>
        )}
    </>);
}

function SelectedInxView({ fceCtx }: { fceCtx: FceCtx; }) {
    const selectedIdx = useAtomValue(fceCtx.selectedIdxStoreAtom);
    return (
        <div className="absolute top-1 right-2 mt-1 p-1 h-4 aspect-square text-xs text-muted-foreground flex items-center justify-center rounded-sm">
            {selectedIdx === -1 ? '' : `${selectedIdx + 1}`}
        </div>
    );
}

//TODO: don't allow to change type if item; type defined from the Add menu
//TODO: value input should from normal mode editor as result we don't need validation
//TODO: we still need to validate the name input field is not empty or assign a default name #

//TODO: scroll to newly created item
