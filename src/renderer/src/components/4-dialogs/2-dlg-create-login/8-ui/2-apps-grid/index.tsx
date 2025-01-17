export function AppsGrid() {
    return (
        <div className="grid grid-cols-1 gap-4 p-4 1debug">
            <div className="flex flex-col gap-4">
                <div className="text-sm font-semibold">Apps</div>
                <div className="text-xs">Select apps to train</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                    <div className="text-sm font-semibold">Apps</div>
                    <div className="text-xs">Select apps to train</div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="text-sm font-semibold">Apps</div>
                    <div className="text-xs">Select apps to train</div>
                </div>
            </div>
        </div>
    );
}
