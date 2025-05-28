import { IconColorPicker, IconColorPickerChrome } from "@/ui/icons";
import { type ManualFieldState } from "@/store/1-atoms/2-file-mani-atoms";
import { PositionIcon } from "./3-nun-target-pos-dnd";

// export function TargetPositionDisplay() {
//     const { getPosProgress } = useSnapshot(buildState);
//     return (
//         <div className="flex items-end space-x-2">
//             <PositionIcon />

//             <div className="">Test get target position:</div>

//             {getPosProgress &&
//                 <div className="">{getPosProgress.point?.x}, {getPosProgress.point?.y}</div>
//             }
//         </div>
//     );
// }

export function InputXY({ item }: { item: ManualFieldState.CtxPos }) {
    return (
        <div className="!mt-6 space-y-2">
            <div>
                Click on the preview window below to select the click point.
            </div>

            {/* <div className="aspect-auto h-28 bg-primary-700 border-primary-400 border grid place-items-center cursor-pointer">
                <div className="text-[.65rem]">
                    <IconTarget className="w-12 h-12" />
                </div>
            </div> */}

            <div className="flex items-center space-x-2">
                <IconColorPickerChrome className="w-8 h-8" />
                <div className="p-2 bg-primary-950 border-primary-700 border rounded shadow-inner shadow-primary-100/10">
                    <IconColorPicker className="w-7 h-7 stroke-[1.5]" />
                </div>

                {/* <TargetPositionDisplay /> */}
                <PositionIcon />

                {/* <IconLibra className="w-6 h-6 stroke-[1]" />
                <IconSearch className="w-5 h-5 stroke-[1]" /> */}
            </div>

        </div>
    );
}
