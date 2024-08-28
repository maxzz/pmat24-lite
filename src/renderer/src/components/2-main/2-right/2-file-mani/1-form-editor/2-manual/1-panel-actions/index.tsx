import { type MFormContextProps } from "@/store/atoms/3-file-mani-atoms";
import { useAtomValue } from "jotai";

export function ManualPanelActions({ maniAtoms, formAtoms, formIdx }: MFormContextProps) {
    const items = useAtomValue(formAtoms.manual.chunks);
    return (<>
        <div className="">
            {items.map(
                (item, idx) => (
                    <div key={idx}>
                        {item.type}
                    </div>
                ))
            }
        </div>
    </>);
}
