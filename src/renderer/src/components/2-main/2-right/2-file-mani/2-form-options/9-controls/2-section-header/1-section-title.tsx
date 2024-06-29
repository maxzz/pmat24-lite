export function SectionTitle({ label }: { label: string; }) {
    return (
        <div className="col-span-2 mt-2 first:mt-0 text-sm font-semibold text-end border-b border-border">
            {label}
        </div>
    );
}
