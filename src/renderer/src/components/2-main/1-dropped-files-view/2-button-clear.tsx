import { useSetAtom } from 'jotai';
import { filesContentAtom } from '@/store';
import { Button } from '@/ui';

export function ButtonClear() {
    const setFilesContent = useSetAtom(filesContentAtom);
    return (
        <Button variant="outline" size="sm" onClick={() => setFilesContent([])}>
            Clear
        </Button>
    );
}
