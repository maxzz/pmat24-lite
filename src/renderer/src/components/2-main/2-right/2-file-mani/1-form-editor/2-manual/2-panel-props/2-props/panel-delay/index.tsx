import { HTMLAttributes } from "react";
import { ManualFieldState } from "@/store/atoms/3-file-mani-atoms";
import { propsBoxClasses } from "../../8-ui";
import { RowInputWLabel } from "@/components/2-main/2-right/2-file-mani/2-form-options/9-controls";

// export function InputDelay({ item }: { item: ManualFieldState.DlyForAtoms; }) {
//     const [n, setN] = useAtom(item.nAtom);

//     function onChange(e: React.ChangeEvent<HTMLInputElement>) {
//         let n = +e.target.value;
//         if (Number.isNaN(n)) {
//             n = 1;
//         }
//         setN(n);
//     }

//     return (
//         <div className="flex items-end space-x-1" title="Delay in ms before performing the next action">
//             <InputField
//                 className="w-12" horizontal
//                 label="Delay"
//                 value={`${n}`}
//                 onChange={onChange}
//             />

//             <div className="pb-1">
//                 ms
//             </div>
//         </div>
//     );
// }

export function InputDelay({ item }: { item: ManualFieldState.DlyForAtoms; }) {
    return (
        <div className="flex items-end space-x-1" title="Delay in ms before performing the next action">
            <RowInputWLabel stateAtom={item.nAtom} label="Description" />

            <div className="pb-1">
                ms
            </div>
        </div>
    );
}

export function PropsEditorDly({ item, ...rest }: { item: ManualFieldState.DlyForAtoms; } & HTMLAttributes<HTMLElement>) {
    return (
        <div className={propsBoxClasses} {...rest}>
            <InputDelay item={item} />
        </div>
    );
}
