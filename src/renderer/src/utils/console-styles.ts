export class ConsoleStyles {
    colors: string[] = [];
    items: string[] = [];

    defaultColorName = 'color: gray';
    defaultColorValue = 'color: #d58e00';
    
    constructor(colorName?: string, colorValue?: string) {
        this.defaultColorName = colorName || this.defaultColorName;
        this.defaultColorValue = colorValue || this.defaultColorValue;
    }

    toFormated(label: string): string[] {
        return [`${label}${this.items.join('')}`, ...this.colors];
    }

    toFormat(): string {
        return this.items.join('');
    }

    toStyles(): string[] {
        return this.colors;
    }

    add({ name, value, colorValue, colorName }: { name: string; value: string; colorValue?: string; colorName?: string; }) {
        this.items.push(`%c${name}%c${value}`);
        this.colors.push(colorName || this.defaultColorName);
        this.colors.push(colorValue || this.defaultColorValue);
    }
}
