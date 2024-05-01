type ParsedFnameParams = {
    fname: string;
    large?: boolean;
};

const partClasses = {
    container: "text-[0.7rem] overflow-hidden whitespace-nowrap overflow-ellipsis", //text-primary-300/80
    sm: "opacity-50 font-sans text-[0.5rem]",
    xs: "opacity-30",
    lg: "px-px text-[0.72rem] text-primary-400 opacity-100 border-b border-dotted border-primary-500",
    l2: "px-1 text-[.65rem] font-bold text-gray-600 opacity-100", // large for ManiInfoTooltip
};

const reFilenameMatch = /^\{([0-9A-Za-z]{3,3})(.*)([0-9A-Za-z]{3,3})\}\.dpm$/; //TODO: handle '{guid} + extra.dpm' filenames

export function ManiFilenameParts({ fname, large }: ParsedFnameParams) {
    const { container, sm, xs, lg: large1, l2: large2 } = partClasses;

    const match = (fname || '').match(reFilenameMatch);
    if (!match) {
        return (
            <div className={container}>
                <span className={sm}>
                    {fname}
                </span>
            </div>
        );
    }

    const lg = large ? large2 : large1;

    return (
        <div className={container}>
            <span className={xs}>{'{'}</span>
            <span className={lg}>{match[1]}</span>
            <span className={sm}>{match[2]}</span>
            <span className={lg}>{match[3]}</span>
            <span className={xs}>{'}.dpm'}</span>
        </div>
    );
}
