import { useState } from "react";
import { a, config, useTransition } from "@react-spring/web";
import * as Dialog from '@radix-ui/react-dialog';
import { Meta } from "@/store/manifest";
import { createUiAtoms, debouncedCombinedResultFromAtoms } from "./0-create-ui-atoms";
import { PolicyEditorBody } from "./2-editor-body";
import { Button } from "@/ui";

export function PolicyEditorDlg({ field }: { field: Meta.Field; }) {
    const [open, setOpen] = useState(false);

    const transitions = useTransition(Number(open), {
        from: { opacity: 0, y: -10, scale: 0.97 },
        enter: { opacity: 1, y: 0, scale: 1 },
        leave: { opacity: 0, y: 10, scale: 0.97 },
        config: config.stiff,
    });

    const atoms = useState(() => createUiAtoms(field.mani.policy || field.mani.policy2, ({ get, set }) => debouncedCombinedResultFromAtoms(atoms, get, set)))[0];

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger className="px-4 py-3 h-full active:scale-[.97] select-none" asChild>
                <Button size="lg">Edit</Button>
            </Dialog.Trigger>

            {transitions((styles, item) => (
                !item
                    ? null
                    : <>
                        <Dialog.Portal container={document.getElementById('portal')}>
                            <a.div className="fixed inset-0 bg-primary-900/80" style={{ opacity: styles.opacity, }} />

                            <Dialog.Content forceMount asChild className="fixed inset-0 flex justify-center items-center">
                                <a.div style={styles}>
                                    <PolicyEditorBody atoms={atoms} />
                                </a.div>
                            </Dialog.Content>

                        </Dialog.Portal>
                    </>
            ))}
        </Dialog.Root>
    );
}
