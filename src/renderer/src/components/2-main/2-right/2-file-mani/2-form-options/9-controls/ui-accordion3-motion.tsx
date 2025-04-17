import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
//https://codesandbox.io/p/sandbox/framer-motion-accordion-qx958?file=%2Fsrc%2FContentPlaceholder.tsx%3A3%2C40

export function UiAccordion3({ i, expanded, setExpanded, children }: { i: number; expanded: number | false; setExpanded: (v: number | false) => void; children?: ReactNode; }) {
    const isOpen = i === expanded;

    // By using `AnimatePresence` to mount and unmount the contents, we can animate
    // them in and out while also only rendering the contents of open accordions
    return (
        <>
            <motion.header
                initial={false}
                animate={{ backgroundColor: isOpen ? "#FF0088" : "#0055FF" }}
                onClick={() => setExpanded(isOpen ? false : i)}
            />

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.section
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: "auto" },
                            collapsed: { opacity: 0, height: 0 },
                        }}
                        transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                        <ContentPlaceholder />
                    </motion.section>
                )}
            </AnimatePresence>
        </>
    );
}

export function ContentPlaceholder() {
    return (
        <motion.div
            className="content-placeholder"
            variants={{ collapsed: { scale: 0.8 }, open: { scale: 1 } }}
            transition={{ duration: 0.8 }}
        >
            {paragraphs.map(words => (
                <Paragraph words={words} />
            ))}
        </motion.div>
    );
}

//https://github.com/Popmotion/popmotion/blob/master/packages/popmotion/src/utils/mix.ts
export const mix = (from: number, to: number, progress: number) => -progress * from + progress * to + from;

const randomInt = (min: number, max: number) => Math.round(mix(min, max, Math.random()));
const generateParagraphLength = () => randomInt(5, 20);
const generateWordLength = () => randomInt(20, 100);

// Randomly generate some paragraphs of word lengths
const paragraphs = [...Array(3)].map(() => {
    return [...Array(generateParagraphLength())].map(generateWordLength);
});

export const Word = ({ width }) => <div className="word inline-block m-0.5 h-4 bg-green-500 rounded" style={{ width }} />;

const Paragraph = ({ words }) => (
    <div className="paragraph mb-4 debug-black">
        {words.map(width => (
            <Word width={width} />
        ))}
    </div>
);

//

export const UiAccordion3Example = () => {
    // This approach is if you only want max one section open at a time. If you want multiple
    // sections to potentially be open simultaneously, they can all be given their own `useState`.
    const [expanded, setExpanded] = useState<false | number>(0);

    return accordionIds.map((i) => (
        <UiAccordion3 key={i} i={i} expanded={expanded} setExpanded={setExpanded} />
    ));
};

const accordionIds = [0, 1, 2, 3];
