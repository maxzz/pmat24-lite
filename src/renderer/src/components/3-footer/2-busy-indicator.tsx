import { useSnapshot } from "valtio";
import { useSpring, a } from "@react-spring/web";
import { busyIndicator } from "@/store/9-ui-state";
import { IconRocket } from "@ui/icons";
import css from "./2-busy-indicator.module.css";

export function BusyIndicator() {
    const { msg } = useSnapshot(busyIndicator);
    // const msg = 'Loading...';
    // console.log(`---busyIndicator.msg = "${msg}"`);

    const styles = useSpring({
        opacity: msg ? 1 : 0,
        config: { duration: 1250 }
    });

    return (
        <a.div style={styles} className="p-2 py-1.5 text-green-400 flex items-center gap-1">

            {/* Busy icon animation */}
            <IconRocket className="size-5" style={{ animation: msg ? `${css.rocketAnimation} 1.2s infinite` : '' }} />

            {/* Busy explanation text */}
            <div className={`text-xs`} style={{ transition: 'opacity 1.2s 1s' }}>
                {msg}
            </div>

        </a.div>
    );
}
