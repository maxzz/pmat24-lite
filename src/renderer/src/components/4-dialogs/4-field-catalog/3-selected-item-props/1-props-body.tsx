import { type ReactNode, useEffect } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { createEmptyValueLife, FieldTyp } from "@/store/manifest";
import { hasSelectedItemAtom, type FceCtx } from "@/store";
import { PropText, PropValue, PropTextarea } from "./8-inputs";
import { classNames } from "@/utils";

export function SelectedItemPropsBody({ fceCtx }: { fceCtx: FceCtx; }) {
    return (<>
        {/* <SelectedItemPropsGuard fceCtx={fceCtx}>
            <SelectedItemPropsContent fceCtx={fceCtx} />
        </SelectedItemPropsGuard> */}

        <FakeSelectedUpdates fceCtx={fceCtx} />
        <SelectedItemPropsContent fceCtx={fceCtx} />
    </>);
}

function SelectedItemPropsGuard({ fceCtx, children }: { fceCtx: FceCtx; children: ReactNode; }) {
    useSelectedUpdates({ fceCtx });
    return (<>
        {children}
    </>);
}

function FakeSelectedUpdates({ fceCtx }: { fceCtx: FceCtx; }) {
    useSelectedUpdates({ fceCtx });
    return null;
}

function useSelectedUpdates({ fceCtx }: { fceCtx: FceCtx; }) {
    const selectedItem = useAtomValue(fceCtx.selectedItemAtom);

    const { nameAtom, valueAtom, ownernoteAtom, valueLifeAtom } = fceCtx.fcePropAtoms;

    const setDisplayName = useSetAtom(nameAtom);
    const setValue = useSetAtom(valueAtom);
    const setOwnernote = useSetAtom(ownernoteAtom);
    const setValueLife = useSetAtom(valueLifeAtom);

    useEffect(
        () => {
            setDisplayName(selectedItem?.fieldValue.displayname || '');
            setValue(selectedItem?.fieldValue.value || '');
            setOwnernote(selectedItem?.fieldValue.ownernote || '');
            setValueLife(selectedItem?.fieldValue || createEmptyValueLife({ fType: FieldTyp.edit }));
        }, [selectedItem]
    );
}

const itemClasses = "pt-2 flex flex-col disabled:opacity-25 disabled:pointer-events-none";
const disabledClasses = "opacity-0 pointer-events-none cursor-not-allowed";
const mergeStateClasses = (enabled: boolean) => classNames(itemClasses, !enabled && disabledClasses);

function SelectedItemPropsContent({ fceCtx }: { fceCtx: FceCtx; }) {
    const hasSelectedItem = useAtomValue(hasSelectedItemAtom)({ fceCtx });

    const [valueLife, setValueLife] = useAtom(fceCtx.fcePropAtoms.valueLifeAtom);

    const enabled = hasSelectedItem;
    const allClasses = mergeStateClasses(enabled);

    // return null;
    return (<>
        <SelectedIdxView fceCtx={fceCtx} />

        <div className={classNames(!enabled && disabledClasses)}>
            Field Type: {valueLife.fType === FieldTyp.edit ? 'Text' : 'Password'}
        </div>

        <div className={allClasses}>
            <PropText
                label={"Name"}
                disabled={!enabled}
                editAtom={fceCtx.fcePropAtoms.nameAtom}
            />
        </div>

        <div className={allClasses}>
            <PropValue
                label={"Value"}
                disabled={!enabled}
                parentDisabled={!enabled}
                className="w-max"
                fceCtx={fceCtx}
            />
        </div>

        <div className={allClasses}>
            <PropTextarea
                label="Description"
                disabled={!enabled}
                editAtom={fceCtx.fcePropAtoms.ownernoteAtom}
            />
        </div>

        {/* {!fceCtx.isDlgCtx && (
            <div className="pt-1 text-[.65rem] h-4 text-muted-foreground">
                ID: {selectedItem ? selectedItem.fieldValue.dbname : 'No item selected'}
            </div>
        )} */}
    </>);
}

function SelectedIdxView({ fceCtx }: { fceCtx: FceCtx; }) {
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

//TODO: value dropdown is showing one jusnk separator
