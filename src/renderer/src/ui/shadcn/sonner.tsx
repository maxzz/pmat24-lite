import { Toaster as Sonner } from "sonner";

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
group-[.toaster]:bg-red-600 \
group-[.toaster]:border-red-700 \
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
                    error: errorClasses,
                    description: descriptionClasses,
                    actionButton: actionButtonClasses,
                    cancelButton: cancelButtonClasses,
                },
            }}
            richColors
            {...props}
        />
    );
}
