import { useAtomValue } from "jotai";
import { rightPanelSelectedContentAtom } from "@/store";
import { a, useTransition } from "@react-spring/web";

/** /
export function RightTitle() {
    const rightPanel = useAtomValue(rightPanelSelectedContentAtom);
    if (!rightPanel) {
        return <div className="">No File</div>;
    }
    return (
        <div className="">Name</div>
    );
}
/**/

export function RightTitle() {
    const rightPanel = useAtomValue(rightPanelSelectedContentAtom);

    const transition = useTransition(rightPanel, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { duration: 200 },
    });

    // if (!rightPanel) {
    //     return <div className="">No File</div>;
    // }
    return (<>
        <div className="">
            {transition((style, item) => item && (
                <a.div style={style} className="">Name {item ? "1" : "2"}</a.div>
            ))}
        </div>
    </>);
}
