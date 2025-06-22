import { type ComponentPropsWithoutRef, useState } from "react";
import { classNames, roundInt } from "@/utils";
import { IconDndTarget } from "@/ui/icons";
import { debouncedSetNapiGetPosXY } from "@/store/7-napi-atoms";

export function TestTargetWindowPosition({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
    const [iconVisible, setIconVisible] = useState(true);

    function startDragging(event: React.PointerEvent<HTMLDivElement>) {
        const elm = event.target as HTMLDivElement;
        elm.setPointerCapture(event.pointerId);
        
        setIconVisible(false);
        console.log('%cDragging. start', 'color:magenta');

        // this is not ready on plugin side: if (sawHandle?.hwnd) { invokeMain({ type: 'get-window-pos', hwnd: sawHandle.hwnd }); }
    }

    function stopDragging(event: React.PointerEvent<HTMLDivElement>) {
        setIconVisible(true);
        console.log('%cDragging. stop', 'color:magenta');
    }

    function dragging(event: React.PointerEvent<HTMLDivElement>) {
        if (iconVisible) {
            return;
        }

        debouncedSetNapiGetPosXY(event.pageX, event.pageY);
    }

    function stopDragCanceled(event: React.PointerEvent<HTMLDivElement>) {
        setIconVisible(true);
        console.log('%cDragcancel.canceled', 'color:magenta');
    }

    return (<>
        <div
            className="p-1 inline-block border-border border rounded shadow"
            onPointerDown={startDragging}
            onPointerUp={stopDragging}
            onPointerMove={dragging}
            onPointerCancel={stopDragCanceled}
        >
            <IconDndTarget className={classNames("size-8 text-primary-200", !iconVisible && "invisible")} />
        </div>
    </>);
}

//TODO: set custom cursor while dragging
