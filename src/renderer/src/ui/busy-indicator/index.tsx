import React from 'react';
import { useAtomValue } from "jotai";
import { useSpring, a } from "@react-spring/web";
//import { keyframes } from "@stitches/react";
import css from "./busy-indicator.module.css";
import { IconRocket } from "@ui/icons";
import { useSnapshot } from 'valtio';
import { busyIndicator } from '@/store';

// const rocketAnimation = keyframes({
//     '0%': { transform: 'scale(1) translateY(0px)', opacity: 1 },
//     '25%': { transform: 'scale(.7) translateY(-2px)', opacity: 0 },
//     '50%': { transform: 'scale(1) translateY(2px)', opacity: 0.5 },
//     '70%': { transform: 'scale(.8) translateY(0px)', opacity: 0.7 },
// });

export function BusyIndicator() {
    const {msg} = useSnapshot(busyIndicator);
    const styles = useSpring({ opacity: msg ? 1 : 0, config: { duration: 1250 } });
    return (
        <a.div style={styles} className="grid md:flex md:space-x-1">
            {/* Busy icon animation */}
            <IconRocket
                className="ml-2 w-5 h-5 -mt-6 md:mt-0"
                style={{ animation: msg ? `${css.rocketAnimation} 1.2s infinite` : '' }}
            />
            {/* Busy explanation text */}
            <div
                className={`text-xs text-green-400 rotate-90 ${msg ? 'translate-x-[-3px]' : ''} translate-y-5 md:translate-x-0 md:translate-y-0 md:rotate-0`}
                style={{ transition: 'opacity 1.2s 1s' }}
            >
                {msg}
            </div>
        </a.div>
    );
}
