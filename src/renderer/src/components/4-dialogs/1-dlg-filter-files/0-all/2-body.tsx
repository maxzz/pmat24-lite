import { type KeyboardEvent } from "react";
import { useAtom } from "jotai";
import { searchFilterData } from "@/store";
import { Input } from "@/ui";
import { IconSearch } from "@/ui/icons";
import { FilteredFilesList } from "../1-files-list";
import { FilterOptions } from "../2-right-side-options";
import { OptionsDrawer } from "../2-right-side-options/2-drawer";
import { CheckAscending } from "../2-right-side-options/3-order";
import { CheckSortBy } from "../2-right-side-options/4-sort-by";

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
                    className="pl-9 text-xs"
                    value={text}
                    onKeyDown={onKeyDown}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Search for manifests"
                />
            </div>

            <div className="grid grid-cols-[1fr_auto] gap-4">
                <FilteredFilesList />

                <div className="flex flex-col gap-2">
                    <OptionsDrawer />

                    <CheckAscending />
                    <CheckSortBy />

                    {/* <Button variant="outline" className="font-normal">
                        Sort options
                    </Button> */}
                </div>

            </div>

        </div>
    );
}
