import { useState } from "react";
import { useSnapshot } from "valtio";
import { buildState, PointXY } from "@/store";
import { classNames } from "@/utils";
import { IconTarget } from "@/components/ui/icons";

export function PositionIcon() {
    const [iconVisible, setIconVisible] = useState(true);

    function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
        const elm = event.target as HTMLDivElement;

        event.preventDefault();
        // elm.classList.add("cursor-tm-target")
        // elm.style.cursor = `url(data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='white' stroke-linecap='round' width='64' height='64' viewBox='0 0 24 24'%3e %3ccircle cx='12' cy='12' r='8.04'/%3e %3ccircle cx='12' cy='12' r='4.99'/%3e %3cpath d='M12 1.5v8.13'/%3e %3cpath d='M22.5 12h-8.13'/%3e %3cpath d='M12 22.5v-8.13'/%3e %3cpath d='M1.5 12h8.13'/%3e %3c/svg%3e) 32 32, auto`;
        elm.style.cursor = `move`;
        console.log('elm', getComputedStyle(elm).cursor);

        elm.setPointerCapture(event.pointerId);
        setIconVisible(false);
    }

    function onPointerUp(event: React.PointerEvent<HTMLDivElement>) {
        setIconVisible(true);
    }

    function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
        if (iconVisible) {
            return;
        }

        const point: PointXY = { x: roundInt(event.pageX), y: roundInt(event.pageY) };
        buildState.getPosProgress.point = point;
    }

    function onPointerCancel(event: React.PointerEvent<HTMLDivElement>) {
        setIconVisible(true);
    }
    //iconVisible ? "cursor-pointer" : "cursor-tm-target"
    return (
        <div
            // className={classNames("w-16 h-16 bg-primary-900 rounded cursor-tm-target")}
            className={classNames("w-16 h-16 bg-primary-900 rounded")}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerMove={onPointerMove}
            onPointerCancel={onPointerCancel}
        // style={{ width: '200px' }}
        // style={{ cursor: `url(data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='white' stroke-linecap='round' width='64' height='64' viewBox='0 0 24 24'%3e %3ccircle cx='12' cy='12' r='8.04'/%3e %3ccircle cx='12' cy='12' r='4.99'/%3e %3cpath d='M12 1.5v8.13'/%3e %3cpath d='M22.5 12h-8.13'/%3e %3cpath d='M12 22.5v-8.13'/%3e %3cpath d='M1.5 12h8.13'/%3e %3c/svg%3e) 32 32, auto` }}
        // style={{ cursor: 'move' }}
        // style={{ cursor: 'cursor-tm-target' }}
        // style={{ cursor: iconVisible ? "cursor-pointer" : "cursor-tm-target" }}
        >
            {/* <div className="hover:invisible bg-red-500"> */}
            {/* <IconTarget className={classNames("text-primary-200 pointer-events-none", !iconVisible && "invisible")} /> */}
            {/* </div> */}
        </div>

    );
}

function round2(num: number) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
}
function roundInt(num: number) {
    return Math.round(num);
}

//TODO: add center dot to cursor icon
//TODO: add contrast outline to cursor icon
//TODO: scroll pos as part of panel-pos (how to implement runtime?)

//TODO: try to use click uproach instead of drag immediately
    //https://bugs.chromium.org/p/chromium/issues/detail?id=26723 !! chrome: 'Issue 26723: Mouse cursor doesn't change when mouse-idling'
        //https://codepen.io/dimsemenov/pen/kyeVmx 'WebKit Cursor Bug'
