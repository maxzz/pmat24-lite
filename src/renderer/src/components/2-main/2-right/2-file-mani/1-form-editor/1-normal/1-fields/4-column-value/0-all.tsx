import { type ComponentPropsWithoutRef, useMemo } from "react";
import { type PrimitiveAtom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { classNames, turnOffAutoComplete } from "@/utils";
import { type ValueLife, ValueAs } from "@/store/manifest";
import { getValueUiState, mapIndexToValueLife } from "./3-select-uitils";
import { DropdownValue } from "./2-dropdown-value";
import { inputRingClasses } from "@/ui/local-ui";
import { isKeyToClearDefault } from "../6-fields-shared-ui";
import { doHighlightControlAtom } from "@/store/7-napi-atoms";
import { type FieldRowCtx, type FileUsCtx, type FieldHighlightCtx } from "@/store/1-atoms/2-file-mani-atoms";
import { Column4_Value } from "./1-normal-value";

export function Column4_Value2({ rowCtx, fileUsCtx }: { rowCtx: FieldRowCtx; fileUsCtx: FileUsCtx; }) {
    const { useItAtom, typeAtom, labelAtom, valueLifeAtom, policiesAtom, metaField } = rowCtx;
    const useIt = useAtomValue(useItAtom);
    
    const setUseIt = useSetAtom(useItAtom);
    const enableRow = () => setUseIt(true);
    
    const maniField = metaField.mani;
    return (
        <Column4_Value
            useItAtom={useItAtom}
            valueLifeAtom={valueLifeAtom}
            choosevalue={maniField.choosevalue}
            onClick={enableRow}
        />
    );
}
