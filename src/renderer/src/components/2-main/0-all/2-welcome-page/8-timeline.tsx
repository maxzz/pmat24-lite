import { type DependencyList, useRef, useEffect } from "react";
import { type DOMKeyframesDefinition, type ElementOrSelector, type AnimationOptions, useAnimate } from "motion/react";

type AnimateParams = [ElementOrSelector, DOMKeyframesDefinition, (AnimationOptions | undefined)?,];

type Animation = AnimateParams | Animation[];

export const useMotionTimeline = (keyframes: Animation[], count: number = 1, deps?: DependencyList) => {
    const mounted = useRef(true);

    const [scope, animate] = useAnimate();

    useEffect(() => {
        mounted.current = true;

        handleAnimate();

        return () => {
            mounted.current = false;
        };
    }, deps || []);

    async function handleAnimate() {
        for (let i = 0; i < count; i++) {
            for (const animation of keyframes) {
                if (!mounted.current) {
                    return;
                }
                await processAnimation(animation);
            }
        }
    }

    async function processAnimation(animation: Animation) {
        // If list of animations, run all concurrently
        if (Array.isArray(animation[0])) {
            await Promise.all(
                animation.map(async (a) => {
                    await processAnimation(a as Animation);
                })
            );
        } else {
            // Else run the single animation
            await animate(...(animation as AnimateParams));
        }
    }

    return scope;
};
