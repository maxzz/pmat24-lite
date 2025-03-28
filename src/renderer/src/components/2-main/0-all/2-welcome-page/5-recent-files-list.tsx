export function RecentFilesList() {
    const hasRecent = true;
    return (<>
        {hasRecent && (
            <div className="text-xs space-y-1">
                <div className="font-semibold">
                    Recent
                </div>
                <div className="">
                    Folder 1 (placeholder)
                </div>
                <div className="">
                    Folder 2 (placeholder)
                </div>
            </div>
        )}
    </>);
}
