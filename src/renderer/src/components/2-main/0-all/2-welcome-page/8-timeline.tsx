import { type DependencyList, useRef, useEffect } from "react";
import { type DOMKeyframesDefinition, type ElementOrSelector, type AnimationOptions, useAnimate } from "motion/react";
import { delay } from "@/utils";
import { on } from "events";

type AnimateParams = [ElementOrSelector, DOMKeyframesDefinition, (AnimationOptions | undefined)?,];

type Animation = AnimateParams | Animation[];

let gGeneration = 0;

export const useMotionTimeline = (keyframes: Animation[], count: number = 1, deps?: DependencyList) => {
    const mounted = useRef(true);
    const [scope, animate] = useAnimate();
    const once = useRef(true);

    console.log('++++++++++++++++++++++++++++++++++ deps', JSON.stringify(deps), once);

    useEffect(
        () => {
            mounted.current = true;
            if (once.current) {
                once.current = false;
                return;
            }

            console.log('-------------------------- deps', JSON.stringify(deps), once);
            //console.log(`keyframes ${' '.repeat(0)}${JSON.stringify(keyframes, null, 2)}`);
            // printAnimationLines(keyframes);
            printAnimation(keyframes, ++gGeneration);

            handleAnimate(gGeneration);

            return () => {
                mounted.current = false;
            };
        }, deps || []
    );

    async function handleAnimate(generation: number) {
        for (let loopCount = 0; loopCount < count; loopCount++) {
            for (const animation of keyframes) {
                console.log(`%ctop ${generation}:${' '.repeat(0)}${JSON.stringify(animation)}`, 'color: red');
                if (!mounted.current) {
                    return;
                }
                // console.log(`%ctop ${' '.repeat(0)}${JSON.stringify(animation)}`, 'color: red');
                //await processAnimation(animation);
                await delay(100);
            }
        }
    }

    async function processAnimation(animation: Animation, level = 0) {
        // Check if array of animations or a single animation were the first array item is selector
        if (Array.isArray(animation[0])) { // If list of animations, run all concurrently
            level++;
            await Promise.all((animation as Animation[]).map(
                async (a: Animation): Promise<void> => {
                    //console.log(`arr ${' '.repeat(level * 2)}${JSON.stringify(a)}`);

                    await processAnimation(a as Animation, level);
                }
            ));
            level--;
        } else {
            // else run the single animation
            console.log(`sub ${' '.repeat(level * 2)}${JSON.stringify(animation)}`);

            await animate(...(animation as AnimateParams));
        }
    }

    return scope;
};

function printAnimationLines(animation: Animation, level = 0) {
    if (Array.isArray(animation[0])) { // If list of animations, run all concurrently
        console.log(`${' '.repeat(level * 2)}[`);
        level++;

        (animation as Animation[]).forEach(
            (a: Animation): void => {
                printAnimationLines(a as Animation, level);
            }
        );
        level--;
        console.log(`${' '.repeat(level * 2)}],`);
    } else {
        // else run the single animation
        console.log(`${' '.repeat(level * 2)}${JSON.stringify(animation)},`);
    }
}

function printAnimationRecursive(animation: Animation, generation: number, level = 0): string {
    const res: string[] = [];
    if (Array.isArray(animation[0])) { // If list of animations, run all concurrently
        res.push(`${' '.repeat(level * 2)}[`);
        level++;

        (animation as Animation[]).forEach(
            (a: Animation): void => {
                res.push(printAnimationRecursive(a as Animation, generation, level));
            }
        );
        level--;
        res.push(`${' '.repeat(level * 2)}],`);
    } else {
        // else run the single animation
        res.push(`${' '.repeat(level * 2)}${generation}:${JSON.stringify(animation)},`);
    }
    return res.join('\n');
}

function printAnimation(keyframes: Animation, generation: number) {
    console.log(printAnimationRecursive(keyframes, generation));
}
