import { type KeyboardEvent } from "react";
import { useAtom } from "jotai";
import { searchFilterData } from "@/store";
import { Input } from "@/ui";
import { IconSearch } from "@/ui/icons";
import { FilteredFilesList } from "../1-files-list";
import { CheckAscending, DrawerItems } from "../2-right-side-options";

export function DialogFilterBody({ setIsOpen }: { setIsOpen: (v: boolean) => void; }) {
    const [text, setText] = useAtom(searchFilterData.textAtom);

    function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (text) {
            if (e.key === 'Escape') {
                e.preventDefault();
                setText('');
            } else if (e.key === 'Enter') {
                e.preventDefault();
                setIsOpen(false);
            }
        }
    }

    return (
        <div className="text-xs grid gap-4">
            <div className="relative">
                <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 p-px size-4" />

                <Input
                    className="pl-9 h-7 text-xs"
                    value={text}
                    onKeyDown={onKeyDown}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Search for manifests"
                    spellCheck="false"
                />
            </div>

            <div className="grid grid-cols-[1fr_auto] gap-4">
                <div className="flex flex-col gap-0.5">
                    <div className="font-bold">Filter result</div>
                    <FilteredFilesList />
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-0.5">
                        <div className="font-bold">Sort options</div>
                        <CheckAscending />
                    </div>

                    {/* TODO: add accordion */}
                    <div>
                        <div className="pb-0.5 font-bold">Filter modifiers</div>
                        <div className="pb-1.5 text-balance">Use a search prefix to display only logins:</div>

                        <DrawerItems />
                    </div>
                </div>
            </div>
        </div>
    );
}

//TODO: when filter changed or empty, reset right view as well
//TBD: filed catalog is shown allways. That is confusing but correct. Probably need to show it allways as the last item
