import { type HTMLAttributes } from 'react';
import { useAtomValue } from 'jotai';
import { rightPanelAtom } from '@/store';
import { FcViewBody } from './1-cat-body';

export function Body_Cat({ className, ...rest }: {} & HTMLAttributes<HTMLDivElement>) {
    const fileUsAtom = useAtomValue(rightPanelAtom);
    if (!fileUsAtom) {
        return null;
    }
    return (
        <FcViewBody fileUsAtom={fileUsAtom} />
    );
}
