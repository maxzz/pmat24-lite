import { type DependencyList, useRef, useEffect } from "react";
import { type DOMKeyframesDefinition, type ElementOrSelector, type AnimationOptions, useAnimate } from "motion/react";
import { delay } from "@/utils";

type AnimateParams = [ElementOrSelector, DOMKeyframesDefinition, (AnimationOptions | undefined)?,];

type Animation = AnimateParams | Animation[];

let gGeneration = 0;

export const useMotionTimeline = (keyframes: Animation[], count: number = 1, deps?: DependencyList) => {
    const [scope, animate] = useAnimate();
    const mounted = useRef(true);
    const first = useRef(true);

    console.log('++++++++++++++++++++++++++++++++++ deps', JSON.stringify(deps), { first: first.current, count });

    useEffect(
        () => {
            mounted.current = true;
            if (first.current) {
                first.current = false;
                console.log('%cskip by once', 'color: red');
                return;
            }

            gGeneration++;

            console.log('-------------------------- useEffect', JSON.stringify(deps), { first: first.current, count });
            //console.log(`keyframes ${' '.repeat(0)}${JSON.stringify(keyframes, null, 2)}`);
            // print_AnimationLines(keyframes);
            print_Animation(keyframes, gGeneration);

            handleAnimate(gGeneration);

            return () => {
                mounted.current = false;
            };
        }, deps || []
    );

    async function handleAnimate(generation: number) {
        console.log(`-------------------------- handleAnimate: generation:${generation}`, JSON.stringify(deps), { first: first.current, count });

        for (let loopCount = 0; loopCount < count; loopCount++) {
            console.log(`%c Loop ${loopCount} `, 'background-color: chocolate; color: white; font-size:0.5rem');

            for (const animation of keyframes) {
                console.log(`%ctop %c${print_AnimationRecursive(animation, generation)}`, 'color: gray; font-size:0.5rem', 'color: blue');
                if (!mounted.current) {
                    return;
                }
                // console.log(`%ctop ${' '.repeat(0)}${JSON.stringify(animation)}`, 'color: red');
                await processAnimation(animation, generation); //TODO: this is the main problem - it's not awaited
                //await delay(100);
            }

            console.log(`%c Loop end ${loopCount} `, 'background-color: chocolate; color: white; font-size:0.5rem');
        }
    }

    async function processAnimation(animation: Animation, generation: number, level = 0) {
        // Check if array of animations or a single animation were the first array item is selector
        if (Array.isArray(animation[0])) { // If list of animations, run all concurrently
            level++;

            await Promise.all((animation as Animation[]).map(
                // const anis = Promise.all((animation as Animation[]).map(
                async (a: Animation) => {
                    //console.log(`arr ${' '.repeat(level * 2)}${JSON.stringify(a)}`);

                    // await processAnimation(a as Animation, generation, level);
                    const ani = processAnimation(a as Animation, generation, level);
                    return ani;
                }
            ));
            console.log('%cPromise.all done', 'background-color: maroon; color: white; font-size:0.5rem');

            level--;
            // return anis;
        } else {
            // else run the single animation
            //console.log(`sub ${' '.repeat(level * 2)}${JSON.stringify(animation)}`);
            console.log(`%csub %c${print_AnimationRecursive(animation, generation)}`, 'color: gray; font-size:0.5rem', 'color: green');

            const aa = await animate(...(animation as AnimateParams)); // await animate did not return from promise
            // await animate(...(animation as AnimateParams)); // await animate did not return from promise
            // const ani = animate(...(animation as AnimateParams)); // await animate did not return from promise
            console.log('%cAnimation done', 'color: green; font-size:0.5rem');
            // return ani;
        }
    }

    return scope;
};

function print_AnimationLines(animation: Animation, level = 0) {
    if (Array.isArray(animation[0])) { // If list of animations, run all concurrently
        console.log(`${' '.repeat(level * 2)}[`);
        level++;

        (animation as Animation[]).forEach(
            (a: Animation): void => {
                print_AnimationLines(a as Animation, level);
            }
        );
        level--;
        console.log(`${' '.repeat(level * 2)}],`);
    } else {
        // else run the single animation
        console.log(`${' '.repeat(level * 2)}${JSON.stringify(animation)},`);
    }
}

function print_AnimationRecursive(animation: Animation, generation: number, level = 0): string {
    const res: string[] = [];
    if (Array.isArray(animation[0])) { // If list of animations, run all concurrently
        res.push(`${' '.repeat(level * 2)}[`);
        level++;

        (animation as Animation[]).forEach(
            (a: Animation): void => {
                res.push(print_AnimationRecursive(a as Animation, generation, level));
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

function print_Animation(keyframes: Animation, generation: number) {
    console.log(print_AnimationRecursive(keyframes, generation));
}
