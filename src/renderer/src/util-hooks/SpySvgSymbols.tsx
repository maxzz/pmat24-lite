import { useEffect, useState } from 'react';

export function SpySvgSymbols({ fontID = 'svgfont' }: { fontID?: string; }) {

    const [ids, setIds] = useState<string[]>([]);

    useEffect(
        () => {
            const fontElChildren = document.querySelector(`#${fontID} > defs`)?.children;
            const ids = (fontElChildren ? [...fontElChildren] : []).map(item => item.id);
            setIds(ids);
        }, []
    );

    if (!ids.length) {
        return null;
    }

    return (
        <div className="mx-auto mt-4 py-4 w-[80vw] grid grid-cols-[repeat(auto-fill,minmax(0,64px))] gap-2">
            {ids.map(
                (id, idx) => (
                    <div key={idx}>
                        <div className="size-16 bg-[#6c7a6a] border-gray-700 border-4 rounded">
                            <svg className="w-full h-full fill-[#deb8f7] stroke-black stroke-[.5]">
                                <title>{`${id}`}</title>
                                <use xlinkHref={`#${id}`} />
                            </svg>
                        </div>

                        <div className="min-h-[2rem] text-[.65rem] text-foreground text-center">
                            {id}
                        </div>
                    </div>
                ))
            }
        </div>
    );
}
