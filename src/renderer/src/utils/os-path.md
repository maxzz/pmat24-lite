# os-path

A TypeScript implementation of POSIX path utilities, extracted from Node.js v8.11.1 and converted to tree-shakable ES modules.

**Source:** [path-browserify](https://github.com/browserify/path-browserify/blob/master/index.js)

## Features

- 🌳 **Tree-shakable** - Import only what you need
- 📘 **TypeScript** - Full type definitions included
- 🧪 **Well-tested** - 89 comprehensive tests
- 🔧 **POSIX-compliant** - Consistent behavior across platforms
- 📦 **Zero dependencies** - Lightweight implementation

## Installation

```typescript
import { join, resolve, dirname, basename } from './utils/os-path';
```

## API Reference

### Types

#### `PathObject`

```typescript
interface PathObject {
  root?: string;   // Root of the path (e.g., '/')
  dir?: string;    // Directory path
  base?: string;   // File name including extension
  ext?: string;    // File extension including dot
  name?: string;   // File name without extension
}
```

#### `ParsedPath`

```typescript
interface ParsedPath {
  root: string;   // Root of the path
  dir: string;    // Directory path
  base: string;   // File name including extension
  ext: string;    // File extension including dot
  name: string;   // File name without extension
}
```

---

### Functions

#### `resolve(...paths: string[]): string`

Resolves a sequence of paths or path segments into an absolute path.

**Parameters:**
- `...paths` - A sequence of paths or path segments

**Returns:** The resolved absolute path

**Behavior:**
- Processes paths from right to left
- Prepends each path until an absolute path is constructed
- Uses `process.cwd()` if no absolute path is found
- Normalizes the result (removes `.` and `..`)

**Examples:**

```typescript
resolve('/foo/bar', './baz');
// Returns: '/foo/bar/baz'

resolve('/foo/bar', '/tmp/file/');
// Returns: '/tmp/file'

resolve('wwwroot', 'static_files/png/', '../gif/image.gif');
// Returns: '{cwd}/wwwroot/static_files/gif/image.gif'

resolve('/foo', 'bar', 'baz/asdf', 'quux', '..');
// Returns: '/foo/bar/baz/asdf'
```

**Throws:** `TypeError` if any argument is not a string

---

#### `normalize(path: string): string`

Normalizes the given path, resolving `..` and `.` segments.

**Parameters:**
- `path` - The path to normalize

**Returns:** The normalized path

**Behavior:**
- Resolves `.` (current directory) segments
- Resolves `..` (parent directory) segments
- Removes duplicate slashes
- Preserves trailing slashes
- Returns `.` for empty paths

**Examples:**

```typescript
normalize('/foo/bar//baz/asdf/quux/..');
// Returns: '/foo/bar/baz/asdf'

normalize('foo/bar//baz');
// Returns: 'foo/bar/baz'

normalize('./foo/bar');
// Returns: 'foo/bar'

normalize('foo/../bar');
// Returns: 'bar'

normalize('');
// Returns: '.'
```

**Throws:** `TypeError` if path is not a string

---

#### `isAbsolute(path: string): boolean`

Determines whether the path is an absolute path.

**Parameters:**
- `path` - The path to test

**Returns:** `true` if the path is absolute, `false` otherwise

**Behavior:**
- A path is absolute if it starts with `/`

**Examples:**

```typescript
isAbsolute('/foo/bar');
// Returns: true

isAbsolute('/baz/..');
// Returns: true

isAbsolute('foo/bar');
// Returns: false

isAbsolute('.');
// Returns: false
```

**Throws:** `TypeError` if path is not a string

---

#### `join(...paths: string[]): string`

Joins all given path segments together using `/` as a delimiter, then normalizes the resulting path.

**Parameters:**
- `...paths` - A sequence of path segments

**Returns:** The joined and normalized path

**Behavior:**
- Concatenates all segments with `/`
- Normalizes the result
- Returns `.` if no arguments provided or all segments are empty

**Examples:**

```typescript
join('/foo', 'bar', 'baz/asdf', 'quux', '..');
// Returns: '/foo/bar/baz/asdf'

join('foo', 'bar', 'baz');
// Returns: 'foo/bar/baz'

join('foo', '', 'bar');
// Returns: 'foo/bar'

join();
// Returns: '.'
```

**Throws:** `TypeError` if any argument is not a string

---

#### `relative(from: string, to: string): string`

Solves the relative path from `from` to `to`.

**Parameters:**
- `from` - The source path
- `to` - The destination path

**Returns:** The relative path from `from` to `to`

**Behavior:**
- Both paths are resolved to absolute paths first
- Returns empty string if paths are the same
- Calculates the minimum traversal needed

**Examples:**

```typescript
relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb');
// Returns: '../../impl/bbb'

relative('/foo/bar', '/foo/bar');
// Returns: ''

relative('/foo/bar', '/foo/bar/baz');
// Returns: 'baz'

relative('/foo/bar/baz', '/foo/bar');
// Returns: '..'
```

**Throws:** `TypeError` if either argument is not a string

---

#### `dirname(path: string): string`

Returns the directory name of a path.

**Parameters:**
- `path` - The path to evaluate

**Returns:** The directory name

**Behavior:**
- Removes the trailing path component
- Returns `/` for root-level paths
- Returns `.` for paths with no directory component

**Examples:**

```typescript
dirname('/foo/bar/baz.txt');
// Returns: '/foo/bar'

dirname('/foo');
// Returns: '/'

dirname('foo/bar/baz.txt');
// Returns: 'foo/bar'

dirname('foo');
// Returns: '.'

dirname('');
// Returns: '.'
```

**Throws:** `TypeError` if path is not a string

---

#### `basename(path: string, ext?: string): string`

Returns the last portion of a path.

**Parameters:**
- `path` - The path to evaluate
- `ext` (optional) - An optional file extension to remove from the result

**Returns:** The base name (file name)

**Behavior:**
- Returns the last segment of the path
- Optionally removes the specified extension
- Returns empty string for root path

**Examples:**

```typescript
basename('/foo/bar/baz.txt');
// Returns: 'baz.txt'

basename('/foo/bar/baz.txt', '.txt');
// Returns: 'baz'

basename('/foo/bar/baz.txt', '.html');
// Returns: 'baz.txt' (extension doesn't match)

basename('file.tar.gz', '.gz');
// Returns: 'file.tar'

basename('/');
// Returns: ''
```

**Throws:** 
- `TypeError` if path is not a string
- `TypeError` if ext is provided and is not a string

---

#### `extname(path: string): string`

Returns the extension of the path, from the last `.` to end of string in the last portion of the path.

**Parameters:**
- `path` - The path to evaluate

**Returns:** The file extension (including the dot), or empty string if no extension

**Behavior:**
- Returns extension from the last `.` in the basename
- Returns empty string if no extension exists
- Returns empty string for hidden files without additional extension (e.g., `.bashrc`)
- Includes the dot in the extension

**Examples:**

```typescript
extname('index.html');
// Returns: '.html'

extname('index.coffee.md');
// Returns: '.md'

extname('index.');
// Returns: '.'

extname('index');
// Returns: ''

extname('.bashrc');
// Returns: ''

extname('.bashrc.bak');
// Returns: '.bak'

extname('/foo/bar/baz.txt');
// Returns: '.txt'
```

**Throws:** `TypeError` if path is not a string

---

#### `format(pathObject: PathObject): string`

Returns a path string from an object - the opposite of `parse()`.

**Parameters:**
- `pathObject` - An object with path components

**Returns:** The formatted path string

**Behavior:**
- `base` takes precedence over `name` + `ext`
- `dir` is used if provided, otherwise `root` is used
- Concatenates components appropriately

**Priority:**
1. `pathObject.base` OR
2. `pathObject.name` + `pathObject.ext`

**Examples:**

```typescript
format({
  root: '/',
  dir: '/home/user',
  base: 'file.txt'
});
// Returns: '/home/user/file.txt'

format({
  dir: '/home/user',
  name: 'file',
  ext: '.txt'
});
// Returns: '/home/user/file.txt'

format({
  root: '/',
  base: 'file.txt'
});
// Returns: '/file.txt'

format({
  base: 'file.txt'
});
// Returns: 'file.txt'
```

**Throws:** `TypeError` if pathObject is null or not an object

---

#### `parse(path: string): ParsedPath`

Returns an object from a path string - the opposite of `format()`.

**Parameters:**
- `path` - The path to parse

**Returns:** A `ParsedPath` object with components

**Behavior:**
- Extracts all path components
- Identifies root, directory, basename, name, and extension
- Returns empty strings for missing components

**Examples:**

```typescript
parse('/home/user/dir/file.txt');
// Returns: {
//   root: '/',
//   dir: '/home/user/dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file'
// }

parse('dir/file.txt');
// Returns: {
//   root: '',
//   dir: 'dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file'
// }

parse('/home/user/file.tar.gz');
// Returns: {
//   root: '/',
//   dir: '/home/user',
//   base: 'file.tar.gz',
//   ext: '.gz',
//   name: 'file.tar'
// }

parse('');
// Returns: {
//   root: '',
//   dir: '',
//   base: '',
//   ext: '',
//   name: ''
// }
```

**Throws:** `TypeError` if path is not a string

---

### Constants

#### `sep: string`

The platform-specific path segment separator.

**Value:** `'/'` (POSIX separator)

**Example:**

```typescript
import { sep } from './utils/os-path';

const parts = ['foo', 'bar', 'baz'];
const path = parts.join(sep);
// Returns: 'foo/bar/baz'
```

---

#### `delimiter: string`

The platform-specific path delimiter used to separate paths in environment variables.

**Value:** `':'` (POSIX delimiter)

**Example:**

```typescript
import { delimiter } from './utils/os-path';

const paths = ['/usr/bin', '/usr/local/bin', '/bin'];
const pathEnv = paths.join(delimiter);
// Returns: '/usr/bin:/usr/local/bin:/bin'
```

---

## Usage Examples

### Common Use Cases

#### Building file paths

```typescript
import { join } from './utils/os-path';

const configPath = join('config', 'settings.json');
// Returns: 'config/settings.json'

const absolutePath = join('/app', 'public', 'images', 'logo.png');
// Returns: '/app/public/images/logo.png'
```

#### Getting file information

```typescript
import { basename, dirname, extname } from './utils/os-path';

const filePath = '/home/user/documents/report.pdf';

basename(filePath);         // 'report.pdf'
basename(filePath, '.pdf'); // 'report'
dirname(filePath);          // '/home/user/documents'
extname(filePath);          // '.pdf'
```

#### Working with relative paths

```typescript
import { relative, resolve } from './utils/os-path';

const from = '/data/projects/app';
const to = '/data/projects/lib/utils';

relative(from, to);
// Returns: '../lib/utils'

resolve(from, relative(from, to));
// Returns: '/data/projects/lib/utils'
```

#### Parsing and formatting paths

```typescript
import { parse, format } from './utils/os-path';

// Parse a path
const parsed = parse('/home/user/file.txt');
console.log(parsed);
// {
//   root: '/',
//   dir: '/home/user',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file'
// }

// Modify and format back
const modified = {
  ...parsed,
  name: 'newfile',
  ext: '.md'
};
format(modified);
// Returns: '/home/user/newfile.md'
```

#### Normalizing user input

```typescript
import { normalize } from './utils/os-path';

const userPath = 'foo//bar/../baz/./qux';
normalize(userPath);
// Returns: 'foo/baz/qux'
```

---

## Error Handling

All functions validate their inputs and throw `TypeError` for invalid arguments:

```typescript
import { join, basename, format } from './utils/os-path';

// These will throw TypeError
join('/foo', 123);           // path must be string
basename(null);              // path must be string
basename('/foo', 123);       // ext must be string
format('string');            // pathObject must be object
format(null);                // pathObject must be object
```

Always ensure inputs are strings (or objects for `format()`).

---

## Differences from Node.js `path`

This implementation:
- **POSIX-only**: No Windows path support (no `path.win32`)
- **No `process.cwd()` polyfill**: Uses Node.js/environment `process.cwd()` when available
- **Browser-compatible**: Works in environments with `process` polyfill
- **Tree-shakable**: Individual functions can be imported

---

## Testing

The module includes 89 comprehensive tests covering:
- ✅ All public functions
- ✅ Error handling and type validation
- ✅ Edge cases (empty strings, special characters, long paths)
- ✅ Format/Parse symmetry
- ✅ POSIX compliance

Run tests:

```bash
npm test os-path
```

---

## Performance Considerations

- **Lightweight**: No external dependencies
- **Efficient**: Direct string manipulation without regex where possible
- **Tree-shakable**: Unused functions are eliminated during bundling

---

## License

MIT License - Extracted from Node.js path module

Copyright Joyent, Inc. and other Node contributors.

See the full license text in the source file.

---

## See Also

- [Node.js Path Documentation](https://nodejs.org/api/path.html)
- [path-browserify on GitHub](https://github.com/browserify/path-browserify)
- Test file: `os-path.test.ts`

