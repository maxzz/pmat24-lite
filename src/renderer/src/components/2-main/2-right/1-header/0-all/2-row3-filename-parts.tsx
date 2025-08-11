type Row3FnamePartsParams = {
    fname: string;
    fpath: string;
    large?: boolean;
};

export function Row3_FnameParts({ fname, fpath, large }: Row3FnamePartsParams) {
    const { container, sm, xs, lg: large1, l2: large2 } = partClasses;

    const location = `Folder: ${fpath}`;

    const matchToParts = (fname || '').match(reFilenameMatch);
    if (!matchToParts) {
        return (
            <div className={container}>
                <span className={sm} title={location}>
                    {fname}
                </span>
            </div>
        );
    }

    const lg = large ? large2 : large1;

    return (
        <div className={container} title={location}>
            Filename:{' '}
            <span className={xs}>{'{'}</span>
            <span className={lg}>{matchToParts[1]}</span>
            <span className={sm}>{matchToParts[2]}</span>
            <span className={lg}>{matchToParts[3]}</span>
            <span className={xs}>{'}.dpm'}</span>
        </div>
    );
}

const reFilenameMatch = /^\{([0-9A-Za-z]{3,3})(.*)([0-9A-Za-z]{3,3})\}\.dpm$/; //TODO: handle '{guid} + extra.dpm' filenames

const partClasses = {
    container: /**/ "text-[0.7rem] truncate", //text-primary-300/80
    sm:        /**/ "font-sans text-[0.6rem] opacity-50",
    xs:        /**/ "opacity-20",
    lg:        /**/ "px-px text-[0.7rem] text-foreground opacity-50 border-b border-dotted border-primary-500",
    l2:        /**/ "px-1 text-[.7rem] font-bold text-foreground opacity-70", // large for ManiInfoTooltip
};

//TODO: add tooltip with filename path - done
    // const location = `Folder: ${fpath.length > 40 ? `${fpath.substring(0, 40)}...` : fpath}`; 
    // TODO: add shorten path like 'name/.../last-part' for electron
    
//TODO: add button copy filename (with or without path) to clipboard
//TODO: reveal filename in explorer
