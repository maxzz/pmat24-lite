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

/** /
export function RightTitle() {
    const rightPanel = useAtomValue(rightPanelSelectedContentAtom);

    const transition = useTransition(rightPanel, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { duration: 300 },
        exitBeforeEnter: true,
    });

    return (
        <div>
            {transition((style, item) => item && (
                <a.div style={style}>Name {item ? "1" : "2"}</a.div>
            ))}
        </div>
    );
}
/**/

/**/
export function RightTitle() {
    const rightPanel = useAtomValue(rightPanelSelectedContentAtom);

    console.log('render.rightPanel', rightPanel);

    // const [transition] = useTransition(rightPanel,
    //     () => {
    //         console.log('useTransition', rightPanel);

    //         return {
    //             from: { opacity: 0 },
    //             enter: { opacity: 1 },
    //             leave: { opacity: 0 },
    //             config: { duration: 1300 },
    //             exitBeforeEnter: true,
    //         };
    //     },
    //     [rightPanel]
    // );

    // const transition = useTransition(rightPanel, {
    const transition = useTransition(!!rightPanel, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0, config: { duration: 0 }},
        config: { duration: 400 },
        //exitBeforeEnter: true,
    });

    return (<>
        <div>
            {/* {transition((style, item) => item && (
            <a.div style={style}>Name</a.div>
        ))} */}
            {transition((style, item) => {
                console.log('transition', item);

                return item && (
                    <a.div style={style}>Name {rightPanel?.fname}</a.div>
                );
            })}
        </div>
    </>);
}
/**/
