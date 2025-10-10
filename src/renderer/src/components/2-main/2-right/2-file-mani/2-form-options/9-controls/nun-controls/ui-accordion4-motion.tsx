import { Children, createContext, useContext, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
//https://codesandbox.io/p/sandbox/framer-motion-accordion-yhixfe?file=%2Fsrc%2FApp.jsx%3A5%2C1-113%2C2

export function UiAccordion4Example() {
    return (
        <section className="App">
            <h2>collapsible</h2>
            <Accordion>
                {[...Array(2)].map(
                    (_, i) => (
                        <AccordionItem key={i}>
                            <AccordionHeader>Accordion</AccordionHeader>
                            <AccordionPanel>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quod
                                explicabo, nam sapiente id nostrum ex, ab numquam, doloremque
                                aspernatur quisquam illo! Officiis explicabo laborum incidunt
                                corrupti provident esse eligendi.
                            </AccordionPanel>
                        </AccordionItem>
                    )
                )}
            </Accordion>

            <br />

            <h2>multiple</h2>
            <Accordion multiple>
                {[...Array(2)].map(
                    (_, i) => (
                        <AccordionItem key={i}>
                            <AccordionHeader>Accordion</AccordionHeader>
                            <AccordionPanel>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quod
                                explicabo, nam sapiente id nostrum ex, ab numquam, doloremque
                                aspernatur quisquam illo! Officiis explicabo laborum incidunt
                                corrupti provident esse eligendi.
                            </AccordionPanel>
                        </AccordionItem>
                    )
                )}
            </Accordion>
        </section>
    );
}

// Accordion

type AccordionContextType = {
    isActive: boolean;
    index: number;
    onChangeIndex: (index: number) => void;
};

const AccordionContext = createContext<AccordionContextType>({} as AccordionContextType);
function useAccordion(): AccordionContextType {
    const rv = useContext(AccordionContext);
    if (!rv) {
        throw new Error("useAccordion must be used within an Accordion");
    }
    return rv;
}

function Accordion({ children, multiple, defaultIndex }: { children: ReactNode; multiple?: boolean; defaultIndex?: number | number[]; }) {
    const [activeIndex, setActiveIndex] = useState<number | undefined | (number | undefined | number[] | undefined[])[]>(multiple ? [defaultIndex] : defaultIndex);

    function onChangeIndex(index: number) {
        setActiveIndex((currentActiveIndex) => {
            if (!multiple) {
                return index === activeIndex ? -1 : index;
            }

            if (!currentActiveIndex || !Array.isArray(currentActiveIndex)) {
                return;
            }

            if (currentActiveIndex.includes(index)) {
                return currentActiveIndex.filter((i) => i !== index);
            }

            return currentActiveIndex.concat(index);
        });
    }

    return Children.map(children,
        (child, index) => {
            const isActive = multiple && Array.isArray(activeIndex)
                ? activeIndex.includes(index)
                : activeIndex === index;
            return (
                <AccordionContext.Provider value={{ isActive, index, onChangeIndex }}>
                    {child}
                </AccordionContext.Provider>
            );
        }
    );
}

// AccordionItem

function AccordionPanel({ children }) {
    const { isActive } = useAccordion();
    return (
        <AnimatePresence initial={false}>
            {isActive && (
                <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ type: "spring", duration: 0.4, bounce: 0 }}
                >
                    <div className="AccordionPanel p-5">
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function AccordionHeader({ children }) {
    const { isActive, index, onChangeIndex } = useAccordion();
    return (
        <motion.div
            className={`AccordionHeader p-5 transition-colors duration-300 cursor-pointer ${isActive ? "active bg-green-500" : "bg-gray-100"}`}
            onClick={() => onChangeIndex(index)}
        >
            {children}
        </motion.div>
    );
}

function AccordionItem({ children }) {
    return (
        <div className="AccordionItem mb-5 bg-green-100 rounded-lg overflow-hidden">{children}</div>
    );
}
