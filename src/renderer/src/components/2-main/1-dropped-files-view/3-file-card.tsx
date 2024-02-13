import { HTMLAttributes } from 'react';
import { IconFile, IconFolderClosed } from '@ui/icons/normal/temp2';
import { M4RInvoke } from '@electron/ipc-main';
import { Textarea, fixTextareaResizeClasses } from '@/ui';

function CardTitle({ fileContent: { name, fullPath, failed, notOur }, ...rest }: { fileContent: M4RInvoke.FileContent; } & HTMLAttributes<HTMLElement>) {
    return (
        <div className={`px-2 py-2 ${notOur ? 'bg-accent' : failed ? 'bg-red-600' : 'bg-accent'} text-muted-foreground`} {...rest}>
            <div className="flex items-center space-x-1">
                <IconFile className="size-5 flex-none" />

                <div className="text-xs font-semibold">
                    {name}
                </div>
            </div>

            <div className="flex items-center space-x-1">
                <IconFolderClosed className="size-4 flex-none" />

                <div className="text-[.5rem]">
                    {fullPath}
                </div>
            </div>
        </div>
    );
}

function CardBody({ fileContent: { cnt, notOur } }: { fileContent: M4RInvoke.FileContent; }) {
    return (
        <div className="flex">
            <Textarea
                className={`w-full px-2 py-1 text-[.5rem] bg-background outline-none cursor-default ${fixTextareaResizeClasses}`}
                value={notOur ? 'Not our file' : cnt}
                rows={5}
                readOnly
            />
        </div>
    );
}

export function Card({ fileContent }: { fileContent: M4RInvoke.FileContent; }) {
    return (
        <div className="border-border border rounded shadow overflow-hidden grid grid-rows-2">
            <CardTitle fileContent={fileContent} />
            <CardBody fileContent={fileContent} />
        </div>
    );
}
