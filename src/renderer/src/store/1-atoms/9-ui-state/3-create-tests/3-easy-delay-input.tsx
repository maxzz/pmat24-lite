export const easyDelayInputTitle = "delay will be 100...10000 in ms or 1..100 in sec.";

export function easyDelayInput(value: number): number {
    if (value > 0 && value < 100) {
        return value * 1000;
    }
    return value;
}
