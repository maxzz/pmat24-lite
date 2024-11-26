import { useAtomValue } from "jotai";
import { FieldTyp } from "@/store/manifest";
import { hasSelectedItemAtom, useSelectedUpdates, type FceCtx } from "@/store";
import { PropText, PropValue, PropTextarea, NewLabel } from "./8-inputs";
import { classNames } from "@/utils";
import { SelectedIdxView, SelectedIdView } from "./7-selected-views";

export function SelectedItemPropsBody({ fceCtx }: { fceCtx: FceCtx; }) {
    return (<>
        <FakeSelectedUpdates fceCtx={fceCtx} />
        <SelectedItemPropsContent fceCtx={fceCtx} />
    </>);
}

function FakeSelectedUpdates({ fceCtx }: { fceCtx: FceCtx; }) {
    useSelectedUpdates({ fceCtx });
    return null;
}

const itemClasses = "pt-2 flex flex-col disabled:opacity-25 disabled:pointer-events-none";
const disabledClasses = "opacity-0 pointer-events-none cursor-not-allowed";
const mergeStateClasses = (enabled: boolean) => classNames(itemClasses, !enabled && disabledClasses);

function SelectedItemPropsContent({ fceCtx }: { fceCtx: FceCtx; }) {

    const hasSelected = useAtomValue(hasSelectedItemAtom)({ fceCtx });
    const valueLife = useAtomValue(fceCtx.fcePropAtoms.valueLifeAtom);

    const allClasses = mergeStateClasses(hasSelected);

    return (<>
        <SelectedIdxView fceCtx={fceCtx} />

        <div className={classNames(!hasSelected && disabledClasses)}>
            Field Type: {valueLife.fType === FieldTyp.edit ? 'Text' : 'Password'}
        </div>

        <NewLabel label="Name" className={allClasses}>
            <PropText
                disabled={!hasSelected}
                editAtom={fceCtx.fcePropAtoms.nameAtom}
            />
        </NewLabel>

        <NewLabel label="Value" className={allClasses}>
            <PropValue
                className="w-max"
                disabled={!hasSelected}
                parentDisabled={!hasSelected}
                fceCtx={fceCtx}
            />
        </NewLabel>

        <NewLabel label="Description" className={allClasses}>
            <PropTextarea
                disabled={!hasSelected}
                editAtom={fceCtx.fcePropAtoms.ownernoteAtom}
            />
        </NewLabel>

        <SelectedIdView fceCtx={fceCtx} />
    </>);
}
