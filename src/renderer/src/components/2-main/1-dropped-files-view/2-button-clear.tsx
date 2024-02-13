import { useSetAtom } from 'jotai';
import { filesContentAtom } from '@/store';

export function ButtonClear() {
    const setFilesContent = useSetAtom(filesContentAtom);
    return (
        <button
            className="px-2 py-1 text-green-900 bg-neutral-100/10 border-neutral-900/20 border rounded shadow-sm active:scale-[.97]"
            onClick={() => setFilesContent([])}
        >
            clear
        </button>
    );
}
