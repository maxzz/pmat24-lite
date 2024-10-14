export const rowClasses = "px-2 py-px col-start-2 flex items-center space-x-2";

export const col1Classes = "w-[4ch] text-right";
export const col2Classes = "w-[1.5rem] flex items-center justify-center gap-x-2 leading-[18px]";
export const col3Classes = "w-[41%] flex items-center gap-x-2 leading-[18px]";
export const col4Classes = "w-[44%] whitespace-nowrap font-mono text-[.6rem]";

const tableHeaderClasses = "\
ml-1 mb-2 text-[.65rem] \
\
text-primary-400 \
border-primary-100 \
border-b \
select-none";

export function TableHeader() {
    return (
        <div className={rowClasses}>
            <div className={`${col1Classes} ${tableHeaderClasses}`}>#</div>
            <div className={`${col2Classes} ${tableHeaderClasses}`}>Type</div>
            <div className={`${col3Classes} ${tableHeaderClasses}`}>Name</div>
            <div className={`${col4Classes} ${tableHeaderClasses}`}>ID</div>
        </div>
    );
}
