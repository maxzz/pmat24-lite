import { HTMLAttributes } from 'react';
import { IconFile, IconFolderClosed } from '@ui/icons/normal/temp2';
import { M4RInvoke } from '@electron/ipc-main';

function CardTitle({ fileContent: { name, fullPath, failed, notOur }, ...rest }: { fileContent: M4RInvoke.FileContent; } & HTMLAttributes<HTMLElement>) {
    return (
        <div className={`px-2 py-2 ${notOur ? 'bg-violet-600 text-violet-100' : failed ? 'bg-red-600' : 'bg-neutral-900/20'}`} {...rest}>
            <div className="flex items-center space-x-1">
                <IconFile className="w-5 h-5 flex-none" />
                <div className="text-xs font-semibold">{name}</div>
            </div>
            <div className="flex items-center space-x-1">
                <IconFolderClosed className="w-5 h-3 flex-none" />
                {/* <IconFolderOpen className="w-5 h-5" /> */}
                <div className="text-[.5rem]">{fullPath}</div>
            </div>
        </div>
    );
}

function CardBody({ fileContent: { cnt, notOur } }: { fileContent: M4RInvoke.FileContent; }) {
    return (
        <div className="flex bg-neutral-100/20">
            <textarea
                className="w-full px-2 py-1 text-[.5rem] bg-neutral-100/20 outline-none cursor-default smallscroll"
                rows={5} value={notOur ? 'Not our file' : cnt} readOnly />
        </div>
    );
}

export function Card({ fileContent }: { fileContent: M4RInvoke.FileContent; }) {
    return (
        <div className="border-neutral-900/20 border rounded shadow overflow-hidden grid grid-rows-2">
            <CardTitle fileContent={fileContent} />
            <CardBody fileContent={fileContent} />
        </div>
    );
}
