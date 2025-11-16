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
} from './os-path';

describe('os-path', () => {
  describe('resolve', () => {
    it('should resolve to absolute path', () => {
      expect(resolve('/foo/bar', './baz')).toBe('/foo/bar/baz');
      expect(resolve('/foo/bar', '/tmp/file/')).toBe('/tmp/file');
    });

    it('should resolve multiple path segments', () => {
      expect(resolve('/foo', 'bar', 'baz/asdf', 'quux', '..')).toBe('/foo/bar/baz/asdf');
    });

    it('should handle empty string', () => {
      // resolve('') uses process.cwd() to resolve to absolute path
      const result = resolve('');
      expect(result).toBeTruthy();
      expect(typeof result).toBe('string');
    });

    it('should resolve relative paths', () => {
      // When no absolute path is provided, resolve() uses process.cwd()
      const result = resolve('wwwroot', 'static_files/png/', '../gif/image.gif');
      expect(result).toContain('wwwroot/static_files/gif/image.gif');
    });

    it('should handle single path', () => {
      expect(resolve('/foo')).toBe('/foo');
      // relative path will be resolved against process.cwd()
      const result = resolve('foo');
      expect(result).toContain('foo');
    });

    it('should handle dots', () => {
      expect(resolve('/foo/bar', '../../baz')).toBe('/baz');
    });
  });

  describe('normalize', () => {
    it('should normalize paths with dots', () => {
      expect(normalize('/foo/bar//baz/asdf/quux/..')).toBe('/foo/bar/baz/asdf');
    });

    it('should normalize relative paths', () => {
      expect(normalize('foo/bar//baz')).toBe('foo/bar/baz');
      expect(normalize('./foo/bar')).toBe('foo/bar');
    });

    it('should handle multiple slashes', () => {
      expect(normalize('foo///bar')).toBe('foo/bar');
      expect(normalize('///foo///bar')).toBe('/foo/bar');
    });

    it('should handle empty string', () => {
      expect(normalize('')).toBe('.');
    });

    it('should handle single dot', () => {
      expect(normalize('.')).toBe('.');
      // Trailing slash is preserved in normalize
      expect(normalize('./')).toBe('./');
    });

    it('should handle double dots', () => {
      expect(normalize('..')).toBe('..');
      expect(normalize('../..')).toBe('../..');
      expect(normalize('foo/../bar')).toBe('bar');
    });

    it('should preserve trailing slash', () => {
      expect(normalize('/foo/bar/')).toBe('/foo/bar/');
      expect(normalize('foo/bar/')).toBe('foo/bar/');
    });

    it('should handle root path', () => {
      expect(normalize('/')).toBe('/');
      expect(normalize('//')).toBe('/');
    });
  });

  describe('isAbsolute', () => {
    it('should return true for absolute paths', () => {
      expect(isAbsolute('/foo/bar')).toBe(true);
      expect(isAbsolute('/baz/..')).toBe(true);
      expect(isAbsolute('/')).toBe(true);
    });

    it('should return false for relative paths', () => {
      expect(isAbsolute('foo/bar')).toBe(false);
      expect(isAbsolute('./baz')).toBe(false);
      expect(isAbsolute('..')).toBe(false);
      expect(isAbsolute('.')).toBe(false);
      expect(isAbsolute('')).toBe(false);
    });
  });

  describe('join', () => {
    it('should join path segments', () => {
      expect(join('/foo', 'bar', 'baz/asdf', 'quux', '..')).toBe('/foo/bar/baz/asdf');
    });

    it('should handle empty segments', () => {
      expect(join('foo', '', 'bar')).toBe('foo/bar');
    });

    it('should return dot for no arguments', () => {
      expect(join()).toBe('.');
    });

    it('should normalize the result', () => {
      expect(join('foo', '..', 'bar')).toBe('bar');
      expect(join('foo', '.', 'bar')).toBe('foo/bar');
    });

    it('should handle multiple slashes', () => {
      expect(join('foo/', '/bar')).toBe('foo/bar');
    });

    it('should handle relative paths', () => {
      expect(join('foo', 'bar', 'baz')).toBe('foo/bar/baz');
      expect(join('./foo', './bar')).toBe('foo/bar');
    });

    it('should handle absolute paths', () => {
      expect(join('/foo', 'bar')).toBe('/foo/bar');
      expect(join('/foo', '/bar')).toBe('/foo/bar');
    });
  });

  describe('relative', () => {
    it('should compute relative path', () => {
      expect(relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb')).toBe('../../impl/bbb');
    });

    it('should handle same paths', () => {
      expect(relative('/foo/bar', '/foo/bar')).toBe('');
    });

    it('should handle root paths', () => {
      expect(relative('/', '/foo')).toBe('foo');
      expect(relative('/foo', '/')).toBe('..');
    });

    it('should handle relative to relative', () => {
      expect(relative('foo/bar', 'foo/baz')).toBe('../baz');
    });

    it('should handle nested paths', () => {
      expect(relative('/foo/bar/baz', '/foo/bar')).toBe('..');
      expect(relative('/foo/bar', '/foo/bar/baz')).toBe('baz');
    });

    it('should handle completely different paths', () => {
      expect(relative('/foo/bar', '/baz/qux')).toBe('../../baz/qux');
    });
  });

  describe('dirname', () => {
    it('should return directory name', () => {
      expect(dirname('/foo/bar/baz.txt')).toBe('/foo/bar');
      expect(dirname('/foo/bar/baz')).toBe('/foo/bar');
    });

    it('should handle root directory', () => {
      expect(dirname('/foo')).toBe('/');
      expect(dirname('/')).toBe('/');
    });

    it('should handle relative paths', () => {
      expect(dirname('foo/bar/baz.txt')).toBe('foo/bar');
      expect(dirname('foo')).toBe('.');
    });

    it('should handle empty string', () => {
      expect(dirname('')).toBe('.');
    });

    it('should handle trailing slashes', () => {
      expect(dirname('/foo/bar/')).toBe('/foo');
    });

    it('should handle multiple slashes', () => {
      expect(dirname('//foo')).toBe('//');
      // Three or more leading slashes are treated as '//'
      expect(dirname('///foo')).toBe('//');
    });

    it('should handle dots', () => {
      expect(dirname('./foo')).toBe('.');
      expect(dirname('../foo')).toBe('..');
    });
  });

  describe('basename', () => {
    it('should return base name', () => {
      expect(basename('/foo/bar/baz.txt')).toBe('baz.txt');
      expect(basename('/foo/bar/baz')).toBe('baz');
    });

    it('should handle extension parameter', () => {
      expect(basename('/foo/bar/baz.txt', '.txt')).toBe('baz');
      expect(basename('/foo/bar/baz.txt', '.html')).toBe('baz.txt');
    });

    it('should handle root path', () => {
      expect(basename('/')).toBe('');
      expect(basename('/foo')).toBe('foo');
    });

    it('should handle relative paths', () => {
      expect(basename('foo/bar/baz.txt')).toBe('baz.txt');
      expect(basename('foo')).toBe('foo');
    });

    it('should handle empty string', () => {
      expect(basename('')).toBe('');
    });

    it('should handle trailing slashes', () => {
      expect(basename('/foo/bar/')).toBe('bar');
      expect(basename('foo/')).toBe('foo');
    });

    it('should handle extension same as basename', () => {
      expect(basename('baz.txt', 'baz.txt')).toBe('');
    });

    it('should handle complex extensions', () => {
      expect(basename('file.tar.gz', '.gz')).toBe('file.tar');
      expect(basename('file.tar.gz', '.tar.gz')).toBe('file');
    });

    it('should throw error for non-string extension', () => {
      expect(() => basename('/foo/bar', 123 as any)).toThrow(TypeError);
    });
  });

  describe('extname', () => {
    it('should return extension', () => {
      expect(extname('index.html')).toBe('.html');
      expect(extname('index.coffee.md')).toBe('.md');
      expect(extname('index.')).toBe('.');
    });

    it('should return empty for no extension', () => {
      expect(extname('index')).toBe('');
      expect(extname('.index')).toBe('');
      expect(extname('.index.')).toBe('.');
    });

    it('should handle paths', () => {
      expect(extname('/foo/bar/baz.txt')).toBe('.txt');
      expect(extname('/foo/bar/baz')).toBe('');
    });

    it('should handle dots in directory names', () => {
      expect(extname('/foo.bar/baz')).toBe('');
      expect(extname('/foo.bar/baz.txt')).toBe('.txt');
    });

    it('should handle hidden files', () => {
      expect(extname('.bashrc')).toBe('');
      expect(extname('.bashrc.bak')).toBe('.bak');
    });

    it('should handle double dots', () => {
      expect(extname('..')).toBe('');
      expect(extname('../')).toBe('');
      // '..file' is treated as a file with extension '.file'
      expect(extname('..file')).toBe('.file');
      expect(extname('..file.txt')).toBe('.txt');
    });

    it('should handle trailing slashes', () => {
      expect(extname('file.txt/')).toBe('.txt');
    });
  });

  describe('format', () => {
    it('should format path object', () => {
      const pathObject: PathObject = {
        root: '/',
        dir: '/home/user',
        base: 'file.txt',
      };
      expect(format(pathObject)).toBe('/home/user/file.txt');
    });

    it('should handle name and ext', () => {
      const pathObject: PathObject = {
        dir: '/home/user',
        name: 'file',
        ext: '.txt',
      };
      expect(format(pathObject)).toBe('/home/user/file.txt');
    });

    it('should handle root only', () => {
      const pathObject: PathObject = {
        root: '/',
        base: 'file.txt',
      };
      expect(format(pathObject)).toBe('/file.txt');
    });

    it('should handle base only', () => {
      const pathObject: PathObject = {
        base: 'file.txt',
      };
      expect(format(pathObject)).toBe('file.txt');
    });

    it('should prefer base over name and ext', () => {
      const pathObject: PathObject = {
        dir: '/home/user',
        base: 'file.txt',
        name: 'other',
        ext: '.js',
      };
      expect(format(pathObject)).toBe('/home/user/file.txt');
    });

    it('should handle empty object', () => {
      expect(format({})).toBe('');
    });

    it('should throw error for non-object', () => {
      expect(() => format(null as any)).toThrow(TypeError);
      expect(() => format('string' as any)).toThrow(TypeError);
    });
  });

  describe('parse', () => {
    it('should parse absolute path', () => {
      const result = parse('/home/user/dir/file.txt');
      expect(result).toEqual({
        root: '/',
        dir: '/home/user/dir',
        base: 'file.txt',
        ext: '.txt',
        name: 'file',
      });
    });

    it('should parse relative path', () => {
      const result = parse('dir/file.txt');
      expect(result).toEqual({
        root: '',
        dir: 'dir',
        base: 'file.txt',
        ext: '.txt',
        name: 'file',
      });
    });

    it('should parse path without extension', () => {
      const result = parse('/home/user/file');
      expect(result).toEqual({
        root: '/',
        dir: '/home/user',
        base: 'file',
        ext: '',
        name: 'file',
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
      });
    });

    it('should parse root', () => {
      const result = parse('/');
      expect(result).toEqual({
        root: '/',
        dir: '/',
        base: '',
        ext: '',
        name: '',
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
      });
    });

    it('should parse hidden files', () => {
      const result = parse('.bashrc');
      expect(result).toEqual({
        root: '',
        dir: '',
        base: '.bashrc',
        ext: '',
        name: '.bashrc',
      });
    });

    it('should parse hidden files with extension', () => {
      const result = parse('.bashrc.bak');
      expect(result).toEqual({
        root: '',
        dir: '',
        base: '.bashrc.bak',
        ext: '.bak',
        name: '.bashrc',
      });
    });

    it('should parse multiple extensions', () => {
      const result = parse('/home/user/file.tar.gz');
      expect(result).toEqual({
        root: '/',
        dir: '/home/user',
        base: 'file.tar.gz',
        ext: '.gz',
        name: 'file.tar',
      });
    });

    it('should handle trailing slashes', () => {
      const result = parse('/home/user/dir/');
      expect(result).toEqual({
        root: '/',
        dir: '/home/user',
        base: 'dir',
        ext: '',
        name: 'dir',
      });
    });

    it('should handle double dots', () => {
      const result = parse('..');
      expect(result).toEqual({
        root: '',
        dir: '',
        base: '..',
        ext: '',
        name: '..',
      });
    });
  });

  describe('format and parse symmetry', () => {
    it('should be symmetric for absolute paths', () => {
      const path = '/home/user/dir/file.txt';
      const parsed = parse(path);
      const formatted = format(parsed);
      expect(formatted).toBe(path);
    });

    it('should be symmetric for relative paths', () => {
      const path = 'dir/file.txt';
      const parsed = parse(path);
      const formatted = format(parsed);
      expect(formatted).toBe(path);
    });

    it('should be symmetric for files without extension', () => {
      const path = '/home/user/file';
      const parsed = parse(path);
      const formatted = format(parsed);
      expect(formatted).toBe(path);
    });
  });

  describe('constants', () => {
    it('should have correct separator', () => {
      expect(sep).toBe('/');
    });

    it('should have correct delimiter', () => {
      expect(delimiter).toBe(':');
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
      expect(() => join('foo', 123 as any)).toThrow(TypeError);
      expect(() => join(null as any)).toThrow(TypeError);
    });

    it('should throw for non-string paths in relative', () => {
      expect(() => relative(123 as any, '/foo')).toThrow(TypeError);
      expect(() => relative('/foo', 123 as any)).toThrow(TypeError);
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
      const longPath = '/a'.repeat(100);
      expect(normalize(longPath)).toBe(longPath);
      expect(isAbsolute(longPath)).toBe(true);
    });

    it('should handle paths with only dots', () => {
      expect(normalize('././.')).toBe('.');
      expect(normalize('../../..')).toBe('../../..');
      expect(join('.', '.', '.')).toBe('.');
    });

    it('should handle mixed slashes', () => {
      expect(normalize('/foo//bar///baz')).toBe('/foo/bar/baz');
      expect(join('/foo//', '//bar', '///baz')).toBe('/foo/bar/baz');
    });

    it('should handle paths with spaces', () => {
      expect(normalize('/foo bar/baz')).toBe('/foo bar/baz');
      expect(basename('/foo bar/baz.txt')).toBe('baz.txt');
      expect(dirname('/foo bar/baz.txt')).toBe('/foo bar');
    });

    it('should handle paths with special characters', () => {
      expect(normalize('/foo-bar_baz/file.txt')).toBe('/foo-bar_baz/file.txt');
      expect(basename('/foo@bar/file#1.txt')).toBe('file#1.txt');
    });
  });
});

