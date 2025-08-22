import { type ComponentPropsWithoutRef } from "react";
import { useSnapshot } from "valtio";
import { appSettings } from "@/store/9-ui-state";
import { classNames, type ThemeMode } from "@/utils";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./dropdown-menu";
import { Button } from "./button";
import { IconDark, IconLight, IconSystem } from "../icons/normal";
import { IconL_ChevronDown, IconL_Check } from "@/ui/icons";

export function ThemeSwitch({ className, heightClasses = "h-6", ...rest }: ComponentPropsWithoutRef<"div"> & { heightClasses?: string; }) {
    const { theme: snapTheme } = useSnapshot(appSettings).appUi;
    const isDark = snapTheme === "dark";
    const isSystem = snapTheme === "system";
    const isLight = !isDark && !isSystem;
    return (
        <div className={classNames("focus-within:ring-1 focus-within:ring-ring rounded-md flex items-center", className)} {...rest}>
            <Button
                variant="ghost"
                size="xs"
                tabIndex={-1}
                className={classNames(heightClasses, "py-0 border-y border-l border-input rounded-r-none")}
                onClick={() => appSettings.appUi.theme = appSettings.appUi.theme === 'dark' ? 'light' : 'dark'}
            >
                {isSystem && <IconSystem className="size-4" />}
                {isLight && <IconLight className="size-4" />}
                {isDark && <IconDark className="size-4 p-0.5" />}
            </Button>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="xs" className={classNames(heightClasses, "px-1 py-0 border border-input rounded-l-none focus-visible:ring-0")}>
                        <IconL_ChevronDown className="size-3" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    <MenuItem label="Light" theme="light" current={snapTheme} />
                    <MenuItem label="Dark" theme="dark" current={snapTheme} />
                    <MenuItem label="System" theme="system" current={snapTheme} />
                </DropdownMenuContent>

            </DropdownMenu>
        </div>
    );
}

function MenuItem({ label, theme, current }: { label: string; theme: ThemeMode; current: ThemeMode; }) {
    return (
        <DropdownMenuItem className="text-xs grid grid-cols-[16px_1fr] items-center gap-x-2" onClick={() => appSettings.appUi.theme = theme}>
            {current === theme && <IconL_Check className="size-4" />}

            <div className="col-start-2">
                {label}
            </div>
        </DropdownMenuItem>
    );
}
