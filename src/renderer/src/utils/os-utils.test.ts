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
    
    it('should split simple filename with extension', () => {
        expect(getFilenameAndExt('file.txt')).toEqual(['file', 'txt']);
    });

    it('should handle filename with multiple dots', () => {
        expect(getFilenameAndExt('file.test.ts')).toEqual(['file.test', 'ts']);
    });

    it('should handle filename without extension', () => {
        expect(getFilenameAndExt('README')).toEqual(['', 'README']);
    });

    it('should handle hidden file with dot prefix', () => {
        expect(getFilenameAndExt('.gitignore')).toEqual(['', 'gitignore']);
    });

    it('should handle hidden file with extension', () => {
        expect(getFilenameAndExt('.env.local')).toEqual(['.env', 'local']);
    });

    it('should handle empty string', () => {
        expect(getFilenameAndExt('')).toEqual(['', '']);
    });

    it('should handle filename with many dots', () => {
        expect(getFilenameAndExt('my.file.name.here.txt')).toEqual(['my.file.name.here', 'txt']);
    });

    it('should handle single dot', () => {
        expect(getFilenameAndExt('.')).toEqual(['', '']);
    });

    it('should handle filename with trailing dot', () => {
        expect(getFilenameAndExt('file.')).toEqual(['file', '']);
    });

    it('should handle double extension', () => {
        expect(getFilenameAndExt('archive.tar.gz')).toEqual(['archive.tar', 'gz']);
    });

    it('should handle filename with dots in name', () => {
        expect(getFilenameAndExt('my.document.v2.docx')).toEqual(['my.document.v2', 'docx']);
    });

    it('should handle filename with no name only extension', () => {
        expect(getFilenameAndExt('.txt')).toEqual(['', 'txt']);
    });

    it('should handle complex filename', () => {
        expect(getFilenameAndExt('file-name_v1.0.final.pdf')).toEqual(['file-name_v1.0.final', 'pdf']);
    });

    it('should handle filename with special characters', () => {
        expect(getFilenameAndExt('my-file_name (1).txt')).toEqual(['my-file_name (1)', 'txt']);
    });

    it('should handle very long extension', () => {
        expect(getFilenameAndExt('file.extension')).toEqual(['file', 'extension']);
    });

    it('should handle multiple consecutive dots', () => {
        expect(getFilenameAndExt('file..txt')).toEqual(['file.', 'txt']);
    });

    it('should handle filename starting with multiple dots', () => {
        expect(getFilenameAndExt('..config')).toEqual(['.', 'config']);
    });

    it('should handle numeric filename with extension', () => {
        expect(getFilenameAndExt('12345.txt')).toEqual(['12345', 'txt']);
    });

    it('should handle filename with uppercase extension', () => {
        expect(getFilenameAndExt('document.PDF')).toEqual(['document', 'PDF']);
    });

    it('should handle filename with spaces and extension', () => {
        expect(getFilenameAndExt('my file.txt')).toEqual(['my file', 'txt']);
    });

    // Tests with full paths
    it('should handle Unix absolute path', () => {
        expect(getFilenameAndExt('/home/user/documents/file.txt')).toEqual(['/home/user/documents/file', 'txt']);
    });

    it('should handle Windows absolute path', () => {
        expect(getFilenameAndExt('C:\\Users\\Documents\\file.txt')).toEqual(['C:\\Users\\Documents\\file', 'txt']);
    });

    it('should handle relative path with extension', () => {
        expect(getFilenameAndExt('./documents/file.txt')).toEqual(['./documents/file', 'txt']);
    });

    it('should handle nested path with multiple dots in folders (limitation: splits on ALL dots)', () => {
        expect(getFilenameAndExt('/folder.name/sub.folder/file.txt')).toEqual(['/folder.name/sub.folder/file', 'txt']);
    });

    it('should handle path with dots in folder names (limitation: splits on ALL dots)', () => {
        expect(getFilenameAndExt('C:\\My.Documents\\project.v2\\readme.md')).toEqual(['C:\\My.Documents\\project.v2\\readme', 'md']);
    });

    it('should handle Unix path with hidden file', () => {
        expect(getFilenameAndExt('/home/user/.gitignore')).toEqual(['/home/user/', 'gitignore']);
    });

    it('should handle Windows path with file without extension', () => {
        expect(getFilenameAndExt('C:\\Users\\Documents\\README')).toEqual(['', 'C:\\Users\\Documents\\README']);
    });

    it('should handle deep nested Unix path', () => {
        expect(getFilenameAndExt('/var/www/html/public/assets/images/logo.png')).toEqual(['/var/www/html/public/assets/images/logo', 'png']);
    });

    it('should handle Windows UNC path', () => {
        expect(getFilenameAndExt('\\\\server\\share\\folder\\document.docx')).toEqual(['\\\\server\\share\\folder\\document', 'docx']);
    });

    it('should handle path with mixed slashes', () => {
        expect(getFilenameAndExt('C:/Users\\Documents/file.txt')).toEqual(['C:/Users\\Documents/file', 'txt']);
    });

    it('should handle path with double extension', () => {
        expect(getFilenameAndExt('/backup/archive.tar.gz')).toEqual(['/backup/archive.tar', 'gz']);
    });

    it('should handle Windows path with spaces', () => {
        expect(getFilenameAndExt('C:\\Program Files\\My App\\config.json')).toEqual(['C:\\Program Files\\My App\\config', 'json']);
    });
});
