// declare namespace tmApi {
//     function sendNotification(message: string): void;
// }
// vs.
// declare var tmApi: {
//     sendNotification: (message: string) => void
// }

type GetFilePathResult = {
    filePath: string;       // full path to file
    isDirectory: boolean;   // true if filePath is a directory
};

type TmApi = {
    callMain: (data: any) => void;
    invokeMain: <TData, TResult>(data: TData) => Promise<TResult>;
    setCbCallFromMain: (callback: (event: /*IpcRendererEvent*/any, data: any) => void) => void;
    getPathForFile: (file: File) => GetFilePathResult;
}

declare var tmApi: TmApi;
