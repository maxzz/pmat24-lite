export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export const isObject = (value: any): boolean => value && typeof value === 'object';
