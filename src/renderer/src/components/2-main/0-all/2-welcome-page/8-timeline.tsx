import { type DependencyList, useRef, useEffect } from "react";
import { type DOMKeyframesDefinition, type ElementOrSelector, type AnimationOptions, useAnimate } from "motion/react";

type AnimateParams = [ElementOrSelector, DOMKeyframesDefinition, (AnimationOptions | undefined)?,];

type Animation = AnimateParams | Animation[];

export const useMotionTimeline = (keyframes: Animation[], count: number = 1, deps?: DependencyList) => {
    const mounted = useRef(true);
    const [scope, animate] = useAnimate();

    useEffect(
        () => {
            mounted.current = true;

            console.log("--------------------------");
            
            handleAnimate();

            return () => {
                mounted.current = false;
            };
        }, deps || []
    );

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

    async function processAnimation(animation: Animation, level = 0) {
        // Check if array of animations or a single animation were the first array item is selector
        if (Array.isArray(animation[0])) { // If list of animations, run all concurrently
            await Promise.all((animation as Animation[]).map(
                async (a: Animation): Promise<void> => {
                    console.log(`arr${' '.repeat(level * 2)}${JSON.stringify(a)}`);
                    
                    await processAnimation(a as Animation, level++);
                }
            ));
        } else {
            // else run the single animation
            console.log(`sub ${' '.repeat(level * 2)}${JSON.stringify(animation)}`);
            
            await animate(...(animation as AnimateParams));
        }
    }

    return scope;
};
