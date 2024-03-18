import { useSnapshot } from 'valtio';
import { useSpring, a } from "@react-spring/web";
import { busyAtom, busyIndicator } from '@/store';
import { IconRocket } from "@ui/icons";
import css from "./busy-indicator.module.css";
import { useAtomValue } from 'jotai';

export function BusyIndicator() {
    const { msg } = useSnapshot(busyIndicator);
    // const msg = useAtomValue(busyAtom);
    // const msg = 'Loading...';
    console.log(`---busyIndicator.msg = "${msg}"`);

    const styles = useSpring({
        opacity: msg ? 1 : 0,
        config: { duration: 1250 }
    });

    return (
        <a.div style={styles} className="text-green-400/70 flex items-center gap-1">

            {/* Busy icon animation */}
            <IconRocket className="ml-2 size-4" style={{ animation: msg ? `${css.rocketAnimation} 1.2s infinite` : '' }} />

            {/* Busy explanation text */}
            <div className={`text-xs`} style={{ transition: 'opacity 1.2s 1s' }}>
                {msg}
            </div>

        </a.div>
    );
}
