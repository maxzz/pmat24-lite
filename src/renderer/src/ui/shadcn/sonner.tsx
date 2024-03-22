// import { useTheme } from "next-themes";
import { classNames } from "@/utils";
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from "lucide-react";
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
bg-red-500 \
";

/**
 * To use toast() from anywhere, even wo/ hooks context, simply add <Toaster /> into <App> component.
 * https://sonner.emilkowal.ski - docs
 * https://github.com/emilkowalski/sonner
 * https://github.com/pacocoursey/next-themes
 */
// export function Toaster(props: ToasterProps) {
//     // const { theme = "system" } = useTheme();
//     const theme = "system";
//     return (
//         <Sonner
//             theme={theme as ToasterProps["theme"]}
//             className="toaster group"
//             toastOptions={{
//                 classNames: {
//                     toast: toastClasses,
//                     error: errorClasses,
//                     description: descriptionClasses,
//                     actionButton: actionButtonClasses,
//                     cancelButton: cancelButtonClasses,
//                 },
//             }}
//             richColors
//             {...props}
//         />
//     );
// }

//https://github.com/ballerine-io/ballerine/blob/dev/apps/backoffice-v2/src/common/components/organisms/Toaster/Toaster.tsx
export const Toaster = ({ className, toastOptions, ...props }: ToasterProps) => {
    return (
        <Sonner
            className={classNames('toaster group', className)}
            richColors
            icons={{
                success: <CheckCircle2 size="16" />,
                info: <Info size="16" />,
                error: <AlertCircle size="16" />,
                warning: <AlertTriangle size="16" />,
            }}
            // toastOptions={{
            //     ...toastOptions,
            //     classNames: {
            //         toast: 'group toast group-[.toaster]:shadow-lg font-inter',
            //         actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
            //         cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
            //     },
            // }}
            {...props}
        />
    );
};