import { ReactNode } from "react";
import { ManualFieldState } from "@/store/atoms/3-file-mani-atoms";
import { PropsEditorDly } from "../2-props/panel-delay";
import { PropsEditorFld } from "../2-props/panel-field";
import { PropsEditorKey } from "../2-props/panel-key";
import { PropsEditorPos } from "../2-props/panel-pos";

export function getPropsEditor({ scriptItem }: { scriptItem: ManualFieldState.ForAtoms; }): ReactNode {
    switch (scriptItem.type) {
        case 'fld': return <PropsEditorFld item={scriptItem as ManualFieldState.FldForAtoms} />;
        case 'kbd': return <PropsEditorKey item={scriptItem as ManualFieldState.KbdForAtoms} />;
        case 'pos': return <PropsEditorPos item={scriptItem as ManualFieldState.PosForAtoms} />;
        case 'dly': return <PropsEditorDly item={scriptItem as ManualFieldState.DlyForAtoms} />;
        default: {
            const really: never = scriptItem;
            return  null;
        }
    }
}
