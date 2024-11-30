import { useAtomValue } from "jotai";
import { type FceCtx } from "@/store";
import { FieldTyp } from "@/store/manifest";
import { PropText, PropValue, PropTextarea, NewLabel } from "./8-inputs";
import { SelectedIdxView, SelectedIdView } from "./7-selected-views";
import { classNames } from "@/utils";

const itemClasses = "pt-2 flex flex-col disabled:opacity-25 disabled:pointer-events-none";
const disabledClasses = "opacity-0 pointer-events-none cursor-not-allowed";
const mergeStateClasses = (enabled: boolean) => classNames(itemClasses, !enabled && disabledClasses);

export function SelectedItemPropsBody({ fceCtx }: { fceCtx: FceCtx; }) {

    const hasSelected = useAtomValue(fceCtx.hasSelectedItemAtom);
    const valueLife = useAtomValue(fceCtx.fcePropAtoms.valueLifeAtom);

    const allClasses = mergeStateClasses(hasSelected);

    return (<>
        <SelectedIdxView fceCtx={fceCtx} />

        <div className={classNames("select-none cursor-default", !hasSelected && disabledClasses)}>
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
