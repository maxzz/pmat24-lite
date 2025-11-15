// v.11.15.25
import { describe, it, expect } from 'vitest';
import { pathWithoutFilename, filenameWithoutPath } from './os-utils';

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
});
