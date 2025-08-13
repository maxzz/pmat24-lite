import { type TestInUseFile } from "@shared/ipc-types/9-test-inuse";

export function testInUseStart(files: TestInUseFile[]): Promise<string> {
    return Promise.resolve(files.map(file => file.fullfname).join('\n'));
}

export function testInUseUpdate(files: TestInUseFile[]): Promise<string> {
    return Promise.resolve(files.map(file => file.fullfname).join('\n'));
}

export function testInUseQuit(): Promise<string> {
    return Promise.resolve('');
}
