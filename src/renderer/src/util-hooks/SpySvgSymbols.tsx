import { useEffect, useState } from 'react';

export function SpySvgSymbols({ fontID = 'svgfont' }: { fontID?: string; }) {
    const [ids, setIds] = useState<string[]>([]);

    useEffect(() => {
        const fontElChildren = document.querySelector(`#${fontID} > defs`)?.children;
        const ids = (fontElChildren ? [...fontElChildren] : []).map(item => item.id);
        setIds(ids);
    }, []);

    if (!ids.length) {
        return null;
    }

    return (
        <div className="mx-auto mt-4 py-4 w-[80vw] grid grid-cols-[repeat(auto-fill,minmax(0,64px))] gap-2">
            {ids.map((id, idx) => (
                <div key={idx}>
                    <div className="w-16 h-16 bg-primary-300 border-primary-700 border-4 rounded">
                        <svg className="w-full h-full fill-[#c3b2d3] stroke-black stroke-[.5]">
                            <title>{`${id}`}</title>
                            <use xlinkHref={`#${id}`} />
                        </svg>
                    </div>
                    <div className="min-h-[2rem] text-[.65rem] text-primary-100 text-center">{id}</div>
                </div>
            ))}
        </div>
    );
}
