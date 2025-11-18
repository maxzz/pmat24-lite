import { Toaster as Sonner } from "sonner";
import { IconStopCircle, SymbolInfo, SymbolWarning } from "../../icons";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const defaultToastClasses = "\
group toast \
group-[.toaster]:text-xs \
group-[.toaster]:text-slate-600 \
group-[.toaster]:bg-slate-100 \
group-[.toaster]:border-slate-400 \
dark:group-[.toaster]:text-slate-200 \
dark:group-[.toaster]:bg-background \
dark:group-[.toaster]:border-slate-500 \
group-[.toaster]:shadow-muted-foreground/30 \
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

const successClasses = "\
group-[.toaster]:text-green-600! \
group-[.toaster]:bg-green-50! \
group-[.toaster]:border-green-400! \
group-[.toaster]:shadow-muted-foreground/30 \
group-[.toaster]:shadow-md \
";

const errorClasses = "\
group-[.toaster]:text-red-500! \
group-[.toaster]:bg-red-100! \
group-[.toaster]:border-red-400! \
group-[.toaster]:shadow-muted-foreground/30 \
group-[.toaster]:shadow-md \
";

const infoClasses = "\
group-[.toaster]:text-blue-800! \
dark:group-[.toaster]:text-blue-400! \
group-[.toaster]:bg-sky-50! \
group-[.toaster]:border-sky-300! \
dark:group-[.toaster]:bg-blue-950! \
dark:group-[.toaster]:border-blue-600! \
group-[.toaster]:shadow-muted-foreground/30 \
group-[.toaster]:shadow-md \
";

const warningClasses = "\
group-[.toaster]:text-orange-600! \
group-[.toaster]:bg-yellow-50! \
group-[.toaster]:border-yellow-500! \
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
                    // toast: defaultToastClasses,
                    success: successClasses,
                    error: errorClasses,
                    info: infoClasses,
                    warning: warningClasses,
                    
                    description: descriptionClasses,
                    actionButton: actionButtonClasses,
                    cancelButton: cancelButtonClasses,
                    closeButton: closeButtonClasses,
                },
            }}
            icons={{
                // success: <SuccessIcon />,
                // info: <SymbolInfo className="size-5 text-blue-600" />,
                warning: <SymbolWarning className="size-5 text-orange-600" />,
                error: <SymbolInfo className="size-5 text-orange-600" />,
                // error: <IconStopCircle className="size-5 text-orange-600" />,
                // error: <SymbolWarning className="size-5 text-orange-600" />,
                // loading: <IconLoading />,
            }}
            richColors
            {...props}
        />
    );
}
