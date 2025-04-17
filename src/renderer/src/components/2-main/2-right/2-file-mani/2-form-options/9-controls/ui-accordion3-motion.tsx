import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
//https://codesandbox.io/p/sandbox/framer-motion-accordion-qx958?file=%2Fsrc%2FContentPlaceholder.tsx%3A3%2C40

export const UiAccordion3Example = () => {
    // This approach is if you only want max one section open at a time. If you want multiple
    // sections to potentially be open simultaneously, they can all be given their own `useState`.
    const [expanded, setExpanded] = useState<false | number>(0);

    return accordionIds.map((idx) => (
        <UiAccordion3 key={idx} idx={idx} expandedIdx={expanded} setExpandedIdx={setExpanded}>
            <ContentPlaceholder />
        </UiAccordion3>
    ));
};

const accordionIds = [0, 1, 2, 3];

// Accordion

function UiAccordion3({ idx, expandedIdx, setExpandedIdx, children }: { idx: number; expandedIdx: number | false; setExpandedIdx: (v: number | false) => void; children: ReactNode; }) {
    const isOpen = idx === expandedIdx;

    // By using `AnimatePresence` to mount and unmount the contents, we can animate
    // them in and out while also only rendering the contents of open accordions
    return (<>
        <motion.header
            className="p-2 rounded"
            initial={false}
            animate={{ backgroundColor: isOpen ? "#03ff74" : "#c4c4c4" }}
            onClick={() => setExpandedIdx(isOpen ? false : idx)}
        >
            Trigger
        </motion.header>

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
                    {children}
                </motion.section>
            )}
        </AnimatePresence>
    </>);
}

// Demo content

function ContentPlaceholder() {
    return (
        <motion.div
            variants={{ collapsed: { scale: 0.8 }, open: { scale: 1 } }}
            transition={{ duration: 0.8 }}
        >
            {paragraphs.map(words => (
                <Paragraph words={words} />
            ))}
        </motion.div>
    );
}

function Word({ width }: { width: number; }) {
    return <div className="inline-block m-0.5 h-4 bg-green-500 rounded" style={{ width }} />;
}

function Paragraph({ words }: { words: number[]; }) {
    return (
        <div className="mb-4 debug-black">
            {words.map(
                (width) => (
                    <Word width={width} />
                ))
            }
        </div>
    );
}

// Demo data

const mix = (from: number, to: number, progress: number) => -progress * from + progress * to + from; //https://github.com/Popmotion/popmotion/blob/master/packages/popmotion/src/utils/mix.ts
const randomInt = (min: number, max: number) => Math.round(mix(min, max, Math.random()));
const generateParagraphLength = () => randomInt(5, 20);
const generateWordLength = () => randomInt(20, 100);

// Randomly generate some paragraphs of word lengths
const paragraphs = [...Array(3)].map(
    () => {
        return [...Array(generateParagraphLength())].map(generateWordLength);
    }
);
