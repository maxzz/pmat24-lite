import { describe, it, expect } from 'vitest';
import {
  resolve,
  normalize,
  isAbsolute,
  join,
  relative,
  dirname,
  basename,
  extname,
  format,
  parse,
  sep,
  delimiter,
  type PathObject,
  type ParsedPath,
} from './os-path-windows';

describe('os-path-windows', () => {
  describe('resolve', () => {
    it('should resolve absolute path with drive', () => {
      expect(resolve('C:\\Users', 'Documents')).toContain('C:\\Users\\Documents');
    });

    it('should handle forward slashes', () => {
      const result = resolve('C:/Users', 'Documents');
      expect(result).toContain('C:\\Users\\Documents');
    });

    it('should handle UNC paths', () => {
      const result = resolve('\\\\server\\share', 'folder');
      expect(result).toContain('\\\\server\\share\\folder');
    });

    it('should resolve dots', () => {
      expect(resolve('C:\\Users\\John', '..')).toContain('C:\\Users');
    });
  });

  describe('normalize', () => {
    it('should normalize Windows paths', () => {
      expect(normalize('C:\\Users\\\\John\\Documents')).toBe('C:\\Users\\John\\Documents');
    });

    it('should handle forward slashes', () => {
      expect(normalize('C:/Users/John/Documents')).toBe('C:\\Users\\John\\Documents');
    });

    it('should handle mixed separators', () => {
      expect(normalize('C:/Users\\John/Documents')).toBe('C:\\Users\\John\\Documents');
    });

    it('should normalize dots', () => {
      expect(normalize('C:\\Users\\John\\..\\Documents')).toBe('C:\\Users\\Documents');
      expect(normalize('C:\\Users\\.\\John')).toBe('C:\\Users\\John');
    });

    it('should handle UNC paths', () => {
      expect(normalize('\\\\server\\share\\folder\\..')).toBe('\\\\server\\share\\');
    });

    it('should handle trailing backslash', () => {
      expect(normalize('C:\\Users\\John\\')).toBe('C:\\Users\\John\\');
    });

    it('should handle empty path', () => {
      expect(normalize('')).toBe('.');
    });

    it('should handle single backslash', () => {
      expect(normalize('\\')).toBe('\\');
    });
  });

  describe('isAbsolute', () => {
    it('should return true for absolute paths with drive', () => {
      expect(isAbsolute('C:\\Users')).toBe(true);
      expect(isAbsolute('D:\\Documents')).toBe(true);
    });

    it('should return true for UNC paths', () => {
      expect(isAbsolute('\\\\server\\share')).toBe(true);
    });

    it('should return true for root-relative paths', () => {
      expect(isAbsolute('\\Users')).toBe(true);
    });

    it('should return false for relative paths', () => {
      expect(isAbsolute('Users\\John')).toBe(false);
      expect(isAbsolute('C:Users')).toBe(false); // Drive-relative
      expect(isAbsolute('.\\Users')).toBe(false);
      expect(isAbsolute('')).toBe(false);
    });

    it('should handle forward slashes', () => {
      expect(isAbsolute('C:/Users')).toBe(true);
      expect(isAbsolute('Users/John')).toBe(false);
    });
  });

  describe('join', () => {
    it('should join Windows paths', () => {
      expect(join('C:\\Users', 'John', 'Documents')).toBe('C:\\Users\\John\\Documents');
    });

    it('should handle forward slashes', () => {
      expect(join('C:/Users', 'John', 'Documents')).toBe('C:\\Users\\John\\Documents');
    });

    it('should handle empty segments', () => {
      expect(join('C:\\Users', '', 'John')).toBe('C:\\Users\\John');
    });

    it('should normalize result', () => {
      expect(join('C:\\Users', 'John', '..', 'Documents')).toBe('C:\\Users\\Documents');
    });

    it('should return dot for no arguments', () => {
      expect(join()).toBe('.');
    });

    it('should handle UNC paths', () => {
      expect(join('\\\\server\\share', 'folder', 'file.txt')).toBe('\\\\server\\share\\folder\\file.txt');
    });
  });

  describe('relative', () => {
    it('should compute relative path', () => {
      expect(relative('C:\\Users\\John', 'C:\\Users\\Jane')).toBe('..\\Jane');
    });

    it('should handle same paths', () => {
      expect(relative('C:\\Users\\John', 'C:\\Users\\John')).toBe('');
    });

    it('should handle nested paths', () => {
      expect(relative('C:\\Users\\John', 'C:\\Users\\John\\Documents')).toBe('Documents');
      expect(relative('C:\\Users\\John\\Documents', 'C:\\Users\\John')).toBe('..');
    });

    it('should handle different drives', () => {
      const result = relative('C:\\Users', 'D:\\Documents');
      expect(result).toBe('D:\\Documents');
    });

    it('should handle UNC paths', () => {
      expect(relative('\\\\server\\share\\folder1', '\\\\server\\share\\folder2')).toBe('..\\folder2');
    });
  });

  describe('dirname', () => {
    it('should return directory name', () => {
      expect(dirname('C:\\Users\\John\\file.txt')).toBe('C:\\Users\\John');
    });

    it('should handle drive root', () => {
      expect(dirname('C:\\file.txt')).toBe('C:\\');
      expect(dirname('C:\\')).toBe('C:\\');
    });

    it('should handle UNC paths', () => {
      expect(dirname('\\\\server\\share\\folder\\file.txt')).toBe('\\\\server\\share\\folder');
      expect(dirname('\\\\server\\share')).toBe('\\\\server\\share');
    });

    it('should handle relative paths', () => {
      expect(dirname('Users\\John\\file.txt')).toBe('Users\\John');
      expect(dirname('file.txt')).toBe('.');
    });

    it('should handle empty path', () => {
      expect(dirname('')).toBe('.');
    });

    it('should handle forward slashes', () => {
      expect(dirname('C:/Users/John/file.txt')).toBe('C:/Users/John');
    });
  });

  describe('basename', () => {
    it('should return base name', () => {
      expect(basename('C:\\Users\\John\\file.txt')).toBe('file.txt');
    });

    it('should handle extension parameter', () => {
      expect(basename('C:\\Users\\John\\file.txt', '.txt')).toBe('file');
      expect(basename('C:\\Users\\John\\file.txt', '.js')).toBe('file.txt');
    });

    it('should handle drive root', () => {
      expect(basename('C:\\')).toBe('');
      expect(basename('C:\\file.txt')).toBe('file.txt');
    });

    it('should handle UNC paths', () => {
      expect(basename('\\\\server\\share\\file.txt')).toBe('file.txt');
    });

    it('should handle relative paths', () => {
      expect(basename('Users\\John\\file.txt')).toBe('file.txt');
      expect(basename('file.txt')).toBe('file.txt');
    });

    it('should handle trailing backslash', () => {
      expect(basename('C:\\Users\\John\\')).toBe('John');
    });

    it('should handle empty path', () => {
      expect(basename('')).toBe('');
    });

    it('should throw for non-string extension', () => {
      expect(() => basename('file.txt', 123 as any)).toThrow(TypeError);
    });
  });

  describe('extname', () => {
    it('should return extension', () => {
      expect(extname('C:\\Users\\John\\file.txt')).toBe('.txt');
      expect(extname('C:\\file.tar.gz')).toBe('.gz');
    });

    it('should return empty for no extension', () => {
      expect(extname('C:\\Users\\John\\file')).toBe('');
      expect(extname('C:\\.gitignore')).toBe('');
    });

    it('should handle hidden files with extension', () => {
      expect(extname('C:\\.bashrc.bak')).toBe('.bak');
    });

    it('should handle UNC paths', () => {
      expect(extname('\\\\server\\share\\file.txt')).toBe('.txt');
    });

    it('should handle forward slashes', () => {
      expect(extname('C:/Users/John/file.txt')).toBe('.txt');
    });
  });

  describe('format', () => {
    it('should format Windows path object', () => {
      const pathObject: PathObject = {
        root: 'C:\\',
        dir: 'C:\\Users\\John',
        base: 'file.txt',
      };
      expect(format(pathObject)).toBe('C:\\Users\\John\\file.txt');
    });

    it('should handle name and ext', () => {
      const pathObject: PathObject = {
        dir: 'C:\\Users\\John',
        name: 'file',
        ext: '.txt',
      };
      expect(format(pathObject)).toBe('C:\\Users\\John\\file.txt');
    });

    it('should format UNC path', () => {
      const pathObject: PathObject = {
        root: '\\\\server\\share\\',
        dir: '\\\\server\\share\\folder',
        base: 'file.txt',
      };
      expect(format(pathObject)).toBe('\\\\server\\share\\folder\\file.txt');
    });

    it('should handle root only', () => {
      const pathObject: PathObject = {
        root: 'C:\\',
        base: 'file.txt',
      };
      expect(format(pathObject)).toBe('C:\\file.txt');
    });

    it('should handle base only', () => {
      const pathObject: PathObject = {
        base: 'file.txt',
      };
      expect(format(pathObject)).toBe('file.txt');
    });

    it('should prefer base over name and ext', () => {
      const pathObject: PathObject = {
        dir: 'C:\\Users',
        base: 'file.txt',
        name: 'other',
        ext: '.js',
      };
      expect(format(pathObject)).toBe('C:\\Users\\file.txt');
    });

    it('should throw for non-object', () => {
      expect(() => format(null as any)).toThrow(TypeError);
      expect(() => format('string' as any)).toThrow(TypeError);
    });
  });

  describe('parse', () => {
    it('should parse absolute path with drive letter', () => {
      const result = parse('C:\\Users\\John\\file.txt');
      expect(result).toEqual({
        root: 'C:\\',
        dir: 'C:\\Users\\John',
        base: 'file.txt',
        ext: '.txt',
        name: 'file',
        drive: 'C:',
        isUNC: false,
      });
    });

    it('should parse path with forward slashes', () => {
      const result = parse('C:/Users/John/file.txt');
      expect(result).toEqual({
        root: 'C:\\',
        dir: 'C:\\Users\\John',
        base: 'file.txt',
        ext: '.txt',
        name: 'file',
        drive: 'C:',
        isUNC: false,
      });
    });

    it('should parse mixed separators', () => {
      const result = parse('C:\\Users/John\\Documents/file.txt');
      expect(result).toEqual({
        root: 'C:\\',
        dir: 'C:\\Users\\John\\Documents',
        base: 'file.txt',
        ext: '.txt',
        name: 'file',
        drive: 'C:',
        isUNC: false,
      });
    });

    it('should parse drive letter only', () => {
      const result = parse('C:');
      expect(result).toEqual({
        root: 'C:',
        dir: 'C:',
        base: '',
        ext: '',
        name: '',
        drive: 'C:',
        isUNC: false,
      });
    });

    it('should parse drive with file', () => {
      const result = parse('C:file.txt');
      expect(result).toEqual({
        root: 'C:',
        dir: 'C:',
        base: 'file.txt',
        ext: '.txt',
        name: 'file',
        drive: 'C:',
        isUNC: false,
      });
    });

    it('should parse relative path', () => {
      const result = parse('folder\\file.txt');
      expect(result).toEqual({
        root: '',
        dir: 'folder',
        base: 'file.txt',
        ext: '.txt',
        name: 'file',
        drive: '',
        isUNC: false,
      });
    });

    it('should parse file only', () => {
      const result = parse('file.txt');
      expect(result).toEqual({
        root: '',
        dir: '',
        base: 'file.txt',
        ext: '.txt',
        name: 'file',
        drive: '',
        isUNC: false,
      });
    });

    it('should parse empty string', () => {
      const result = parse('');
      expect(result).toEqual({
        root: '',
        dir: '',
        base: '',
        ext: '',
        name: '',
        drive: '',
        isUNC: false,
      });
    });

    it('should parse UNC path with file', () => {
      const result = parse('\\\\server\\share\\folder\\file.txt');
      expect(result).toEqual({
        root: '\\\\server\\share\\',
        dir: '\\\\server\\share\\folder',
        base: 'file.txt',
        ext: '.txt',
        name: 'file',
        drive: '',
        isUNC: true,
      });
    });

    it('should parse UNC path with forward slashes', () => {
      const result = parse('//server/share/folder/file.txt');
      expect(result).toEqual({
        root: '\\\\server\\share\\',
        dir: '\\\\server\\share\\folder',
        base: 'file.txt',
        ext: '.txt',
        name: 'file',
        drive: '',
        isUNC: true,
      });
    });

    it('should parse UNC path with mixed slashes', () => {
      const result = parse('\\\\server/share\\folder/file.txt');
      expect(result).toEqual({
        root: '\\\\server\\share\\',
        dir: '\\\\server\\share\\folder',
        base: 'file.txt',
        ext: '.txt',
        name: 'file',
        drive: '',
        isUNC: true,
      });
    });

    it('should parse UNC root only', () => {
      const result = parse('\\\\server\\share');
      expect(result.root).toBe('\\\\server\\share');
      expect(result.isUNC).toBe(true);
    });

    it('should parse UNC with trailing backslash', () => {
      const result = parse('\\\\server\\share\\');
      expect(result.root).toBe('\\\\server\\share\\');
      expect(result.isUNC).toBe(true);
    });

    it('should parse path without extension', () => {
      const result = parse('C:\\Users\\John\\file');
      expect(result).toEqual({
        root: 'C:\\',
        dir: 'C:\\Users\\John',
        base: 'file',
        ext: '',
        name: 'file',
        drive: 'C:',
        isUNC: false,
      });
    });

    it('should parse path with multiple extensions', () => {
      const result = parse('C:\\archive.tar.gz');
      expect(result).toEqual({
        root: 'C:\\',
        dir: 'C:\\',
        base: 'archive.tar.gz',
        ext: '.gz',
        name: 'archive.tar',
        drive: 'C:',
        isUNC: false,
      });
    });

    it('should parse path with spaces', () => {
      const result = parse('C:\\Program Files\\My App\\file.exe');
      expect(result).toEqual({
        root: 'C:\\',
        dir: 'C:\\Program Files\\My App',
        base: 'file.exe',
        ext: '.exe',
        name: 'file',
        drive: 'C:',
        isUNC: false,
      });
    });

    it('should parse path with trailing backslash', () => {
      const result = parse('C:\\Users\\John\\Documents\\');
      expect(result).toEqual({
        root: 'C:\\',
        dir: 'C:\\Users\\John',
        base: 'Documents',
        ext: '',
        name: 'Documents',
        drive: 'C:',
        isUNC: false,
      });
    });

    it('should parse root-relative path', () => {
      const result = parse('\\Users\\file.txt');
      expect(result).toEqual({
        root: '\\',
        dir: '\\Users',
        base: 'file.txt',
        ext: '.txt',
        name: 'file',
        drive: '',
        isUNC: false,
      });
    });

    it('should parse hidden file', () => {
      const result = parse('C:\\.gitignore');
      expect(result).toEqual({
        root: 'C:\\',
        dir: 'C:\\',
        base: '.gitignore',
        ext: '',
        name: '.gitignore',
        drive: 'C:',
        isUNC: false,
      });
    });

    it('should parse different drive letters', () => {
      const resultD = parse('D:\\folder\\file.txt');
      expect(resultD.drive).toBe('D:');
      expect(resultD.root).toBe('D:\\');

      const resultZ = parse('Z:\\data.json');
      expect(resultZ.drive).toBe('Z:');
      expect(resultZ.root).toBe('Z:\\');
    });

    it('should handle lowercase drive letters', () => {
      const result = parse('c:\\users\\john\\file.txt');
      expect(result).toEqual({
        root: 'c:\\',
        dir: 'c:\\users\\john',
        base: 'file.txt',
        ext: '.txt',
        name: 'file',
        drive: 'c:',
        isUNC: false,
      });
    });
  });

  describe('format and parse symmetry', () => {
    it('should be symmetric for drive paths', () => {
      const path = 'C:\\Users\\John\\file.txt';
      const parsed = parse(path);
      const formatted = format(parsed);
      expect(formatted).toBe(path);
    });

    it('should be symmetric for UNC paths', () => {
      const path = '\\\\server\\share\\folder\\file.txt';
      const parsed = parse(path);
      const formatted = format(parsed);
      expect(formatted).toBe(path);
    });

    it('should be symmetric for relative paths', () => {
      const path = 'folder\\subfolder\\file.txt';
      const parsed = parse(path);
      const formatted = format(parsed);
      expect(formatted).toBe(path);
    });

    it('should normalize forward slashes to backslashes', () => {
      const path = 'C:/Users/John/file.txt';
      const parsed = parse(path);
      const formatted = format(parsed);
      expect(formatted).toBe('C:\\Users\\John\\file.txt');
    });
  });

  describe('constants', () => {
    it('should have correct separator', () => {
      expect(sep).toBe('\\');
    });

    it('should have correct delimiter', () => {
      expect(delimiter).toBe(';');
    });
  });

  describe('error handling', () => {
    it('should throw for non-string paths in resolve', () => {
      expect(() => resolve(123 as any)).toThrow(TypeError);
      expect(() => resolve(null as any)).toThrow(TypeError);
      expect(() => resolve(undefined as any)).toThrow(TypeError);
    });

    it('should throw for non-string paths in normalize', () => {
      expect(() => normalize(123 as any)).toThrow(TypeError);
      expect(() => normalize(null as any)).toThrow(TypeError);
    });

    it('should throw for non-string paths in isAbsolute', () => {
      expect(() => isAbsolute(123 as any)).toThrow(TypeError);
      expect(() => isAbsolute(null as any)).toThrow(TypeError);
    });

    it('should throw for non-string paths in join', () => {
      expect(() => join('C:\\Users', 123 as any)).toThrow(TypeError);
      expect(() => join(null as any)).toThrow(TypeError);
    });

    it('should throw for non-string paths in relative', () => {
      expect(() => relative(123 as any, 'C:\\Users')).toThrow(TypeError);
      expect(() => relative('C:\\Users', 123 as any)).toThrow(TypeError);
    });

    it('should throw for non-string paths in dirname', () => {
      expect(() => dirname(123 as any)).toThrow(TypeError);
    });

    it('should throw for non-string paths in basename', () => {
      expect(() => basename(123 as any)).toThrow(TypeError);
    });

    it('should throw for non-string paths in extname', () => {
      expect(() => extname(123 as any)).toThrow(TypeError);
    });

    it('should throw for non-string paths in parse', () => {
      expect(() => parse(123 as any)).toThrow(TypeError);
    });
  });

  describe('edge cases', () => {
    it('should handle very long paths', () => {
      const longPath = 'C:\\' + 'folder\\'.repeat(50) + 'file.txt';
      const parsed = parse(longPath);
      expect(parsed.base).toBe('file.txt');
    });

    it('should handle paths with dots', () => {
      expect(normalize('C:\\Users\\.\\John')).toBe('C:\\Users\\John');
      expect(normalize('C:\\Users\\John\\..\\Jane')).toBe('C:\\Users\\Jane');
    });

    it('should handle mixed case drive letters', () => {
      expect(parse('c:\\file.txt').drive).toBe('c:');
      expect(parse('D:\\file.txt').drive).toBe('D:');
    });

    it('should handle paths with special characters', () => {
      expect(normalize('C:\\Users\\John@Doe\\file#1.txt')).toBe('C:\\Users\\John@Doe\\file#1.txt');
      expect(basename('C:\\Users\\file-name_2024.txt')).toBe('file-name_2024.txt');
    });
  });
});

