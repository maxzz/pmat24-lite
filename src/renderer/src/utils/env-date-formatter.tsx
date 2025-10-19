export const dateFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    // second: '2-digit',
});

export function envModifiedDate(): string {
    const date = new Date(import.meta.env.VITE_MODIFIED || '1001-01-01T00:00:00.000Z');
    const formattedDate = dateFormatter.format(date);//.replace(/\//g, '.');
    return formattedDate;
}

export function envBuildVersion(): string {
    return import.meta.env.VITE_BUILD || '0.0.0';
}
