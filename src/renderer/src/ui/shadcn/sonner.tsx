import { Toaster as Sonner } from "sonner";
import { SymbolInfo, SymbolWarning } from "../icons";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const toastClasses = "\
group toast \
group-[.toaster]:text-xs \
group-[.toaster]:text-foreground \
group-[.toaster]:bg-background \
group-[.toaster]:border-border \
group-[.toaster]:shadow-lg \
";

const descriptionClasses = "\
group-[.toast]:text-muted-foreground \
";

const closeButtonClasses = "\
[--toast-close-button-start:initial] \
[--toast-close-button-end:0] \
";

const actionButtonClasses = "\
group-[.toast]:text-primary-foreground \
group-[.toast]:bg-primary \
";

const cancelButtonClasses = "\
group-[.toast]:text-muted-foreground \
group-[.toast]:bg-muted \
";

const errorClasses = "\
group-[.toaster]:text-white \
group-[.toaster]:bg-red-700 \
group-[.toaster]:border-red-800 \
group-[.toaster]:shadow-muted-foreground/30 \
group-[.toaster]:shadow-md \
";

const infoClasses = "\
group-[.toaster]:text-blue-800 \
dark:group-[.toaster]:text-blue-400 \
group-[.toaster]:bg-sky-50 \
group-[.toaster]:border-sky-300 \
dark:group-[.toaster]:bg-blue-950 \
dark:group-[.toaster]:border-blue-600 \
group-[.toaster]:shadow-muted-foreground/30 \
group-[.toaster]:shadow-md \
";

const warningClasses = "\
group-[.toaster]:text-orange-600 \
group-[.toaster]:bg-yellow-50 \
group-[.toaster]:border-yellow-500 \
group-[.toaster]:shadow-muted-foreground/30 \
group-[.toaster]:shadow-md \
";

/**
 * To use toast() from anywhere, even wo/ hooks context, simply add <Toaster /> into <App> component.
 * https://sonner.emilkowal.ski - docs
 * https://github.com/emilkowalski/sonner
 * https://github.com/pacocoursey/next-themes
 */
export function Toaster(props: ToasterProps) {
    return (
        <Sonner
            className="toaster group"
            toastOptions={{
                classNames: {
                    toast: toastClasses,
                    closeButton: closeButtonClasses,
                    error: errorClasses,
                    info: infoClasses,
                    warning: warningClasses,
                    description: descriptionClasses,
                    actionButton: actionButtonClasses,
                    cancelButton: cancelButtonClasses,
                },
            }}
            icons={{
                // success: <SuccessIcon />,
                // info: <SymbolInfo className="size-5 text-blue-600" />,
                warning: <SymbolWarning className="size-5 text-orange-600" />,
                // error: <IconError />,
                // loading: <IconLoading />,
            }}
            richColors
            {...props}
        />
    );
}
