import { DialogContent, DialogHeader, DialogCloseButton } from "@/ui/shadcn/dialog";

export function DialogTitleHeader({ title, className, children, onDlgClose, modal }: DialogTitleHeaderProps) {
    return (
        <DialogContent
            className={className}
            overlayClasses="bg-background/10 backdrop-blur-[1px]"
            hiddenTitle={title}
            noClose
            modal={modal}
        >
            <DialogHeader className="relative pl-4 pr-2 py-1 text-sm font-bold border-border border-b flex flex-row items-center justify-between space-y-0">
                <div>
                    {title}
                </div>
                <DialogCloseButton className="relative! right-0! top-0! p-2 hover:text-white hover:bg-red-500 hover:opacity-100" tabIndex={-1} onClick={() => onDlgClose(false)} />
            </DialogHeader>

            {children}

        </DialogContent>
    );
}

type DialogTitleHeaderProps = {
    title: string;
    className: string;
    children: React.ReactNode;
    onDlgClose: (ok: boolean) => void;
    modal?: boolean;
};
