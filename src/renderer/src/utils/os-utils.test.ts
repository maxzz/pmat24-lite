// v.11.15.25
import { describe, it, expect } from 'vitest';
import { pathWithoutFilename, filenameWithoutPath, getFilenameAndExt } from './os-utils';

describe('pathWithoutFilename', () => {
    it('should remove filename from Unix path', () => {
        expect(pathWithoutFilename('/home/user/documents/file.txt')).toBe('home/user/documents');
    });

    it('should remove filename from Windows path', () => {
        expect(pathWithoutFilename('C:\\Users\\Documents\\file.txt')).toBe('C:/Users/Documents');
    });

    it('should handle path with trailing slash', () => {
        expect(pathWithoutFilename('/home/user/documents/')).toBe('home/user');
    });

    it('should handle path with multiple trailing slashes', () => {
        expect(pathWithoutFilename('/home/user/documents///')).toBe('home/user');
    });

    it('should handle path with trailing whitespace', () => {
        expect(pathWithoutFilename('/home/user/documents/file.txt   ')).toBe('home/user/documents');
    });

    it('should handle mixed slashes', () => {
        expect(pathWithoutFilename('C:/Users\\Documents/file.txt')).toBe('C:/Users/Documents');
    });

    it('should handle single filename without path', () => {
        expect(pathWithoutFilename('file.txt')).toBe('');
    });

    it('should handle empty string', () => {
        expect(pathWithoutFilename('')).toBe('');
    });

    it('should handle undefined', () => {
        expect(pathWithoutFilename(undefined)).toBe('');
    });

    it('should handle path with only slashes', () => {
        expect(pathWithoutFilename('///')).toBe('');
    });

    it('should handle root directory file', () => {
        expect(pathWithoutFilename('/file.txt')).toBe('');
    });

    it('should handle deep nested path', () => {
        expect(pathWithoutFilename('/a/b/c/d/e/f/file.txt')).toBe('a/b/c/d/e/f');
    });

    it('should handle path with spaces in folder names', () => {
        expect(pathWithoutFilename('/my folder/sub folder/file.txt')).toBe('my folder/sub folder');
    });

    it('should handle UNC network path', () => {
        expect(pathWithoutFilename('//server/share/folder/file.txt')).toBe('/server/share/folder');
    });

    it('should handle UNC network path with backslashes', () => {
        expect(pathWithoutFilename('\\\\server\\share\\folder\\file.txt')).toBe('//server/share/folder');
    });

    it('should handle UNC network path with trailing slash', () => {
        expect(pathWithoutFilename('//server/share/folder/')).toBe('/server/share');
    });
});

describe('filenameWithoutPath', () => {
    it('should extract filename from Unix path', () => {
        expect(filenameWithoutPath('/home/user/documents/file.txt')).toBe('file.txt');
    });

    it('should extract filename from Windows path', () => {
        expect(filenameWithoutPath('C:\\Users\\Documents\\file.txt')).toBe('file.txt');
    });

    it('should handle path with trailing slash', () => {
        expect(filenameWithoutPath('/home/user/documents/')).toBe('documents');
    });

    it('should handle path with multiple trailing slashes', () => {
        expect(filenameWithoutPath('/home/user/documents///')).toBe('documents');
    });

    it('should handle path with trailing whitespace', () => {
        expect(filenameWithoutPath('/home/user/documents/file.txt   ')).toBe('file.txt');
    });

    it('should handle mixed slashes', () => {
        expect(filenameWithoutPath('C:/Users\\Documents/file.txt')).toBe('file.txt');
    });

    it('should return filename when no path', () => {
        expect(filenameWithoutPath('file.txt')).toBe('file.txt');
    });

    it('should handle empty string', () => {
        expect(filenameWithoutPath('')).toBe('');
    });

    it('should handle undefined', () => {
        expect(filenameWithoutPath(undefined)).toBe('');
    });

    it('should handle path with only slashes', () => {
        expect(filenameWithoutPath('///')).toBe('');
    });

    it('should handle leading slashes', () => {
        expect(filenameWithoutPath('/file.txt')).toBe('file.txt');
    });

    it('should handle filename with dots', () => {
        expect(filenameWithoutPath('/path/to/file.test.ts')).toBe('file.test.ts');
    });

    it('should handle filename without extension', () => {
        expect(filenameWithoutPath('/path/to/README')).toBe('README');
    });

    it('should handle deep nested path', () => {
        expect(filenameWithoutPath('/a/b/c/d/e/f/file.txt')).toBe('file.txt');
    });

    it('should handle path with spaces in filename', () => {
        expect(filenameWithoutPath('/my folder/my file.txt')).toBe('my file.txt');
    });

    it('should handle Windows drive letter only', () => {
        expect(filenameWithoutPath('C:\\')).toBe('C:');
    });

    it('should return last folder name when path ends with slash', () => {
        expect(filenameWithoutPath('/home/user/projects/')).toBe('projects');
    });

    it('should handle UNC network path', () => {
        expect(filenameWithoutPath('//server/share/folder/file.txt')).toBe('file.txt');
    });

    it('should handle UNC network path with backslashes', () => {
        expect(filenameWithoutPath('\\\\server\\share\\folder\\file.txt')).toBe('file.txt');
    });

    it('should handle UNC network path root', () => {
        expect(filenameWithoutPath('//server/share')).toBe('share');
    });

    it('should handle UNC network path with trailing slash', () => {
        expect(filenameWithoutPath('//server/share/folder/')).toBe('folder');
    });
});

describe('getFilenameAndExt', () => {
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
});
