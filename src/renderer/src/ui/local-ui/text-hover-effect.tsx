// "use client"; //https://github.com/RexanWONG/text-behind-image/blob/main/components/ui/text-hover-effect.tsx
import { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";

export function TextHoverEffect({ text, duration, }: { text: string; duration?: number; automatic?: boolean; }) {
    const svgRef = useRef<SVGSVGElement>(null);
    const [cursor, setCursor] = useState({ x: 0, y: 0 });
    const [hovered, setHovered] = useState(false);
    const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

    useEffect(
        () => {
            if (svgRef.current && cursor.x !== null && cursor.y !== null) {
                const svgRect = svgRef.current.getBoundingClientRect();
                const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
                const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
                setMaskPosition({
                    cx: `${cxPercentage}%`,
                    cy: `${cyPercentage}%`,
                });
            }
        }, [cursor]
    );

    return (
        <svg
            ref={svgRef} width="100%" height="100%" viewBox="0 0 300 100"
            className="select-none"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
        >
            <defs>
                <linearGradient
                    id="textGradient"
                    gradientUnits="userSpaceOnUse"
                    cx="50%"
                    cy="50%"
                    r="25%"
                    // className="[--yellow-500:#fff400] [--red-500:#ea3939] [--blue-500:#395eea] [--cyan-500:#39ead7]"
                >
                    {hovered && (<>
                        <stop offset="0%" stopColor={"var(--yellow-500)"} />
                        <stop offset="25%" stopColor={"var(--red-500)"} />
                        <stop offset="50%" stopColor={"var(--blue-500)"} />
                        <stop offset="75%" stopColor={"var(--cyan-500)"} />
                        <stop offset="100%" stopColor={"var(--violet-500)"} />
                    </>)}
                </linearGradient>

                <motion.radialGradient
                    id="revealMask"
                    gradientUnits="userSpaceOnUse"
                    r="20%"
                    animate={maskPosition}
                    transition={{ duration: duration ?? 0, ease: "easeOut" }}

                >
                    <stop offset="0%" stopColor="white" />
                    <stop offset="100%" stopColor="black" />
                </motion.radialGradient>
                <mask id="textMask">
                    <rect x="0" y="0" width="100%" height="100%" fill="url(#revealMask)" />
                </mask>
            </defs>
            <text
                x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" strokeWidth="0.3"
                className="font-[helvetica] font-bold stroke-neutral-200 dark:stroke-neutral-800 fill-transparent text-7xl  "
                style={{ opacity: hovered ? 0.7 : 0 }}
            >
                {text}
            </text>
            <motion.text
                x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" strokeWidth="0.3"
                className="font-[helvetica] font-bold fill-transparent text-7xl   stroke-neutral-200 dark:stroke-neutral-800"
                initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
                animate={{
                    strokeDashoffset: 0,
                    strokeDasharray: 1000,
                }}
                transition={{
                    duration: 4,
                    ease: "easeInOut",
                }}
            >
                {text}
            </motion.text>
            <text
                x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" strokeWidth="0.3"
                stroke="url(#textGradient)"
                mask="url(#textMask)"
                className="font-[helvetica] font-bold fill-transparent text-7xl"
            >
                {text}
            </text>
        </svg>
    );
}
