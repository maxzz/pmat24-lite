export function SectionTitle({ label }: { label: string; }) {
    return (
        <div className="mt-2 first:mt-0 text-sm font-semibold">
            {label}
        </div>
    );
}
