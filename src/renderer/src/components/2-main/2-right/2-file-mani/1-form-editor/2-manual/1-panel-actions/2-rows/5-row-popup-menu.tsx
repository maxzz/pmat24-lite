import { useState, useRef } from "react";
import { useClickAway } from "react-use";
import { classNames } from "@/utils";
import { IconArrowUp, IconArrowDown, IconTrash24, IconClose, IconMenuHamburger5 } from "@/ui/icons";

export type PopupMenuItemState = {
    hasUp: boolean;
    hasDn: boolean;
    onDelete: (event: React.MouseEvent) => void;
    onUp: (event: React.MouseEvent) => void;
    onDn: (event: React.MouseEvent) => void;
};

export function RowMenuButton({ menuState }: { menuState: PopupMenuItemState; }) {
    const btnRef = useRef(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const onClose = (event: React.MouseEvent) => { event.preventDefault(); setMenuOpen((v) => !v); };

    useClickAway(btnRef, () => setMenuOpen(false));

    return (
        <button ref={btnRef} className={classNames("relative mr-1 outline-none")} tabIndex={-1}>
            <IconMenuHamburger5 className={IconMenuClasses} onClick={onClose} />

            {menuOpen && (
                <FloatingMenuButtons onClose={onClose} menuState={menuState} />
            )}
        </button>
    );
}

function FloatingMenuButtons({ menuState, onClose }: { menuState: PopupMenuItemState; onClose: (event: React.MouseEvent) => void; }) {
    const { onDelete, onUp, onDn, hasUp, hasDn } = menuState;
    return (
        <div className={FloatingMenuButtonsClasses}>
            <IconArrowUp className={classNames(submenuIconClasses, !hasUp && "invisible")} title="Move item up" onClick={onUp} />
            <IconArrowDown className={classNames(submenuIconClasses, !hasDn && "invisible")} title="Move item down" onClick={onDn} />
            <IconTrash24 className={submenuDelClasses} title="Delete item" onClick={onDelete} />
            <IconClose className={submenuIconClasses} onClick={onClose} />
        </div>
    );
}

const FloatingMenuButtonsClasses = "\
absolute -right-2 -top-[5px] px-2 py-1 \
\
text-primary-800 dark:text-primary-200 \
bg-primary-100 dark:bg-primary-800 \
\
border-primary-500/50 dark:border-primary-100/50 \
border shadow rounded \
flex \
\
animate-slideLeftAndFade";

const submenuIconClasses = "p-1 size-5 hover:bg-primary-300 dark:hover:bg-primary-400 rounded";
const submenuDelClasses = "p-1 size-5 hover:text-white hover:bg-red-600 rounded";

const IconMenuClasses = "p-1 size-5 hover:text-primary-700 hover:bg-primary-400/50 dark:hover:text-white dark:hover:bg-primary-500 rounded";
