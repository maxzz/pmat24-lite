// v.11.15.25
import { describe, it, expect } from 'vitest';
import { pathWithoutFilename, filenameWithoutPath, getFilenameAndExt } from './os-utils';

describe('pathWithoutFilename', () => {
    type TestCase = {
        fn: (input: string | undefined) => string;
        description: string;
        in: string | undefined;
        toBe: string;
    };

    const testCases: TestCase[] = [
        { fn: pathWithoutFilename, description: 'should remove filename from Unix path', in: '/home/user/documents/file.txt', toBe: 'home/user/documents' },
        { fn: pathWithoutFilename, description: 'should remove filename from Windows path', in: 'C:\\Users\\Documents\\file.txt', toBe: 'C:/Users/Documents' },
        { fn: pathWithoutFilename, description: 'should handle path with trailing slash', in: '/home/user/documents/', toBe: 'home/user' },
        { fn: pathWithoutFilename, description: 'should handle path with multiple trailing slashes', in: '/home/user/documents///', toBe: 'home/user' },
        { fn: pathWithoutFilename, description: 'should handle path with trailing whitespace', in: '/home/user/documents/file.txt   ', toBe: 'home/user/documents' },
        { fn: pathWithoutFilename, description: 'should handle mixed slashes', in: 'C:/Users\\Documents/file.txt', toBe: 'C:/Users/Documents' },
        { fn: pathWithoutFilename, description: 'should handle single filename without path', in: 'file.txt', toBe: '' },
        { fn: pathWithoutFilename, description: 'should handle empty string', in: '', toBe: '' },
        { fn: pathWithoutFilename, description: 'should handle undefined', in: undefined, toBe: '' },
        { fn: pathWithoutFilename, description: 'should handle path with only slashes', in: '///', toBe: '' },
        { fn: pathWithoutFilename, description: 'should handle root directory file', in: '/file.txt', toBe: '' },
        { fn: pathWithoutFilename, description: 'should handle deep nested path', in: '/a/b/c/d/e/f/file.txt', toBe: 'a/b/c/d/e/f' },
        { fn: pathWithoutFilename, description: 'should handle path with spaces in folder names', in: '/my folder/sub folder/file.txt', toBe: 'my folder/sub folder' },
        { fn: pathWithoutFilename, description: 'should handle UNC network path', in: '//server/share/folder/file.txt', toBe: '/server/share/folder' },
        { fn: pathWithoutFilename, description: 'should handle UNC network path with backslashes', in: '\\\\server\\share\\folder\\file.txt', toBe: '//server/share/folder' },
        { fn: pathWithoutFilename, description: 'should handle UNC network path with trailing slash', in: '//server/share/folder/', toBe: '/server/share' },
    ];
    testCases.forEach((testCase) => {
        it(testCase.description, () => {
            expect(testCase.fn(testCase.in)).toBe(testCase.toBe);
        });
    });
});

describe('filenameWithoutPath', () => {
    type TestCase = {
        fn: (input: string | undefined) => string;
        description: string;
        in: string | undefined;
        toBe: string;
    };

    const testCases: TestCase[] = [
        { fn: filenameWithoutPath, description: 'should extract filename from Unix path', in: '/home/user/documents/file.txt', toBe: 'file.txt' },
        { fn: filenameWithoutPath, description: 'should extract filename from Windows path', in: 'C:\\Users\\Documents\\file.txt', toBe: 'file.txt' },
        { fn: filenameWithoutPath, description: 'should handle path with trailing slash', in: '/home/user/documents/', toBe: 'documents' },
        { fn: filenameWithoutPath, description: 'should handle path with multiple trailing slashes', in: '/home/user/documents///', toBe: 'documents' },
        { fn: filenameWithoutPath, description: 'should handle path with trailing whitespace', in: '/home/user/documents/file.txt   ', toBe: 'file.txt' },
        { fn: filenameWithoutPath, description: 'should handle mixed slashes', in: 'C:/Users\\Documents/file.txt', toBe: 'file.txt' },
        { fn: filenameWithoutPath, description: 'should return filename when no path', in: 'file.txt', toBe: 'file.txt' },
        { fn: filenameWithoutPath, description: 'should handle empty string', in: '', toBe: '' },
        { fn: filenameWithoutPath, description: 'should handle undefined', in: undefined, toBe: '' },
        { fn: filenameWithoutPath, description: 'should handle path with only slashes', in: '///', toBe: '' },
        { fn: filenameWithoutPath, description: 'should handle leading slashes', in: '/file.txt', toBe: 'file.txt' },
        { fn: filenameWithoutPath, description: 'should handle filename with dots', in: '/path/to/file.test.ts', toBe: 'file.test.ts' },
        { fn: filenameWithoutPath, description: 'should handle filename without extension', in: '/path/to/README', toBe: 'README' },
        { fn: filenameWithoutPath, description: 'should handle deep nested path', in: '/a/b/c/d/e/f/file.txt', toBe: 'file.txt' },
        { fn: filenameWithoutPath, description: 'should handle path with spaces in filename', in: '/my folder/my file.txt', toBe: 'my file.txt' },
        { fn: filenameWithoutPath, description: 'should handle Windows drive letter only', in: 'C:\\', toBe: 'C:' },
        { fn: filenameWithoutPath, description: 'should return last folder name when path ends with slash', in: '/home/user/projects/', toBe: 'projects' },
        { fn: filenameWithoutPath, description: 'should handle UNC network path', in: '//server/share/folder/file.txt', toBe: 'file.txt' },
        { fn: filenameWithoutPath, description: 'should handle UNC network path with backslashes', in: '\\\\server\\share\\folder\\file.txt', toBe: 'file.txt' },
        { fn: filenameWithoutPath, description: 'should handle UNC network path root', in: '//server/share', toBe: 'share' },
        { fn: filenameWithoutPath, description: 'should handle UNC network path with trailing slash', in: '//server/share/folder/', toBe: 'folder' },
    ];
    testCases.forEach((testCase) => {
        it(testCase.description, () => {
            expect(testCase.fn(testCase.in)).toBe(testCase.toBe);
        });
    });
});

describe('getFilenameAndExt', () => {
    type TestCase = {
        fn: (input: string) => string[];
        description: string;
        in: string;
        toBe: string[];
    };

    const testCases: TestCase[] = [
        { fn: getFilenameAndExt, description: 'should split simple filename with extension',                                              /**/ in: 'file.txt', toBe: ['file', 'txt'] },
        { fn: getFilenameAndExt, description: 'should handle filename with multiple dots',                                                /**/ in: 'file.test.ts', toBe: ['file.test', 'ts'] },
        { fn: getFilenameAndExt, description: 'should handle filename without extension',                                                 /**/ in: 'README', toBe: ['', 'README'] },
        { fn: getFilenameAndExt, description: 'should handle hidden file with dot prefix',                                                /**/ in: '.gitignore', toBe: ['', 'gitignore'] },
        { fn: getFilenameAndExt, description: 'should handle hidden file with extension',                                                 /**/ in: '.env.local', toBe: ['.env', 'local'] },
        { fn: getFilenameAndExt, description: 'should handle empty string',                                                               /**/ in: '', toBe: ['', ''] },
        { fn: getFilenameAndExt, description: 'should handle filename with many dots',                                                    /**/ in: 'my.file.name.here.txt', toBe: ['my.file.name.here', 'txt'] },
        { fn: getFilenameAndExt, description: 'should handle single dot',                                                                 /**/ in: '.', toBe: ['', ''] },
        { fn: getFilenameAndExt, description: 'should handle filename with trailing dot',                                                 /**/ in: 'file.', toBe: ['file', ''] },
        { fn: getFilenameAndExt, description: 'should handle double extension',                                                           /**/ in: 'archive.tar.gz', toBe: ['archive.tar', 'gz'] },
        { fn: getFilenameAndExt, description: 'should handle filename with dots in name',                                                 /**/ in: 'my.document.v2.docx', toBe: ['my.document.v2', 'docx'] },
        { fn: getFilenameAndExt, description: 'should handle filename with no name only extension',                                       /**/ in: '.txt', toBe: ['', 'txt'] },
        { fn: getFilenameAndExt, description: 'should handle complex filename',                                                           /**/ in: 'file-name_v1.0.final.pdf', toBe: ['file-name_v1.0.final', 'pdf'] },
        { fn: getFilenameAndExt, description: 'should handle filename with special characters',                                           /**/ in: 'my-file_name (1).txt', toBe: ['my-file_name (1)', 'txt'] },
        { fn: getFilenameAndExt, description: 'should handle very long extension',                                                        /**/ in: 'file.extension', toBe: ['file', 'extension'] },
        { fn: getFilenameAndExt, description: 'should handle multiple consecutive dots',                                                  /**/ in: 'file..txt', toBe: ['file.', 'txt'] },
        { fn: getFilenameAndExt, description: 'should handle filename starting with multiple dots',                                       /**/ in: '..config', toBe: ['.', 'config'] },
        { fn: getFilenameAndExt, description: 'should handle numeric filename with extension',                                            /**/ in: '12345.txt', toBe: ['12345', 'txt'] },
        { fn: getFilenameAndExt, description: 'should handle filename with uppercase extension',                                          /**/ in: 'document.PDF', toBe: ['document', 'PDF'] },
        { fn: getFilenameAndExt, description: 'should handle filename with spaces and extension',                                         /**/ in: 'my file.txt', toBe: ['my file', 'txt'] },
        { fn: getFilenameAndExt, description: 'should handle Unix absolute path',                                                         /**/ in: '/home/user/documents/file.txt', toBe: ['/home/user/documents/file', 'txt'] },
        { fn: getFilenameAndExt, description: 'should handle Windows absolute path',                                                      /**/ in: 'C:\\Users\\Documents\\file.txt', toBe: ['C:\\Users\\Documents\\file', 'txt'] },
        { fn: getFilenameAndExt, description: 'should handle relative path with extension',                                               /**/ in: './documents/file.txt', toBe: ['./documents/file', 'txt'] },
        { fn: getFilenameAndExt, description: 'should handle nested path with multiple dots in folders (limitation: splits on ALL dots)', /**/ in: '/folder.name/sub.folder/file.txt', toBe: ['/folder.name/sub.folder/file', 'txt'] },
        { fn: getFilenameAndExt, description: 'should handle path with dots in folder names (limitation: splits on ALL dots)',            /**/ in: 'C:\\My.Documents\\project.v2\\readme.md', toBe: ['C:\\My.Documents\\project.v2\\readme', 'md'] },
        { fn: getFilenameAndExt, description: 'should handle Unix path with hidden file',                                                 /**/ in: '/home/user/.gitignore', toBe: ['/home/user/', 'gitignore'] },
        { fn: getFilenameAndExt, description: 'should handle Windows path with file without extension',                                   /**/ in: 'C:\\Users\\Documents\\README', toBe: ['', 'C:\\Users\\Documents\\README'] },
        { fn: getFilenameAndExt, description: 'should handle deep nested Unix path',                                                      /**/ in: '/var/www/html/public/assets/images/logo.png', toBe: ['/var/www/html/public/assets/images/logo', 'png'] },
        { fn: getFilenameAndExt, description: 'should handle Windows UNC path',                                                           /**/ in: '\\\\server\\share\\folder\\document.docx', toBe: ['\\\\server\\share\\folder\\document', 'docx'] },
        { fn: getFilenameAndExt, description: 'should handle path with mixed slashes',                                                    /**/ in: 'C:/Users\\Documents/file.txt', toBe: ['C:/Users\\Documents/file', 'txt'] },
        { fn: getFilenameAndExt, description: 'should handle path with double extension',                                                 /**/ in: '/backup/archive.tar.gz', toBe: ['/backup/archive.tar', 'gz'] },
        { fn: getFilenameAndExt, description: 'should handle Windows path with spaces',                                                   /**/ in: 'C:\\Program Files\\My App\\config.json', toBe: ['C:\\Program Files\\My App\\config', 'json'] },
    ];
    testCases.forEach((testCase) => {
        it(testCase.description, () => {
            expect(testCase.fn(testCase.in)).toEqual(testCase.toBe);
        });
    });
});
