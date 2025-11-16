# os-path-windows

A TypeScript implementation of Windows path utilities with full support for drive letters, UNC paths, and backslash separators.

## Features

- 🌳 **Tree-shakable** - Import only what you need
- 📘 **TypeScript** - Full type definitions included
- 🧪 **Well-tested** - 76 comprehensive tests
- 💾 **Windows-compliant** - Full support for Windows path conventions
- 📦 **Zero dependencies** - Lightweight implementation
- 🚀 **Backslashes** - Uses `\` as path separator
- 💿 **Drive letters** - Supports C:, D:, etc.
- 🌐 **UNC paths** - Supports \\\\server\\share

## Installation

```typescript
import { join, resolve, dirname, basename } from './utils/os-path-windows';
```

## API Reference

### Types

#### `PathObject`

```typescript
interface PathObject {
  root?: string;   // Root: 'C:\' or '\\server\share\' or '\'
  dir?: string;    // Directory path
  base?: string;   // File name including extension
  ext?: string;    // File extension including dot
  name?: string;   // File name without extension
}
```

#### `ParsedPath`

```typescript
interface ParsedPath {
  root: string;      // Root: 'C:\' or '\\server\share\' or '\'
  dir: string;       // Directory path
  base: string;      // File name including extension
  ext: string;       // File extension including dot
  name: string;      // File name without extension
  drive: string;     // Drive letter: 'C:' or empty for UNC/relative
  isUNC: boolean;    // True if UNC path (\\server\share)
}
```

---

### Functions

#### `resolve(...paths: string[]): string`

Resolves a sequence of paths or path segments into an absolute Windows path.

**Parameters:**
- `...paths` - A sequence of paths or path segments

**Returns:** The resolved absolute path

**Behavior:**
- Processes paths from right to left
- Handles drive letters (C:, D:, etc.)
- Supports UNC paths (\\\\server\\share)
- Normalizes forward slashes to backslashes
- Uses `process.cwd()` if no absolute path is found

**Examples:**

```typescript
resolve('C:\\Users', 'Documents');
// Returns: 'C:\\Users\\Documents'

resolve('C:\\Users\\John', '..');
// Returns: 'C:\\Users'

resolve('\\\\server\\share', 'folder');
// Returns: '\\\\server\\share\\folder'

resolve('C:/Users', 'John/Documents');
// Returns: 'C:\\Users\\John\\Documents'
```

**Throws:** `TypeError` if any argument is not a string

---

#### `normalize(path: string): string`

Normalizes the given Windows path, resolving `..` and `.` segments.

**Parameters:**
- `path` - The path to normalize

**Returns:** The normalized path with backslashes

**Behavior:**
- Resolves `.` and `..` segments
- Removes duplicate slashes/backslashes
- Converts forward slashes to backslashes
- Preserves trailing backslashes
- Returns `.` for empty paths

**Examples:**

```typescript
normalize('C:\\Users\\\\John\\Documents');
// Returns: 'C:\\Users\\John\\Documents'

normalize('C:/Users/John/Documents');
// Returns: 'C:\\Users\\John\\Documents'

normalize('C:\\Users\\John\\..\\Documents');
// Returns: 'C:\\Users\\Documents'

normalize('\\\\server\\share\\folder\\..');
// Returns: '\\\\server\\share\\'
```

**Throws:** `TypeError` if path is not a string

---

#### `isAbsolute(path: string): boolean`

Determines whether the path is an absolute Windows path.

**Parameters:**
- `path` - The path to test

**Returns:** `true` if the path is absolute, `false` otherwise

**Behavior:**
- Returns `true` for paths starting with `\` or `/`
- Returns `true` for paths with drive letter followed by `:\`
- Returns `false` for relative and drive-relative paths (e.g., `C:file.txt`)

**Examples:**

```typescript
isAbsolute('C:\\Users');
// Returns: true

isAbsolute('\\\\server\\share');
// Returns: true

isAbsolute('\\Users');
// Returns: true

isAbsolute('C:Users');
// Returns: false (drive-relative)

isAbsolute('Users\\John');
// Returns: false
```

**Throws:** `TypeError` if path is not a string

---

#### `join(...paths: string[]): string`

Joins all given Windows path segments together using backslash as a delimiter, then normalizes the resulting path.

**Parameters:**
- `...paths` - A sequence of path segments

**Returns:** The joined and normalized path

**Behavior:**
- Concatenates all segments with `\`
- Normalizes the result
- Preserves UNC paths
- Returns `.` if no arguments provided

**Examples:**

```typescript
join('C:\\Users', 'John', 'Documents');
// Returns: 'C:\\Users\\John\\Documents'

join('C:/Users', 'John', 'Documents');
// Returns: 'C:\\Users\\John\\Documents'

join('C:\\Users', 'John', '..', 'Documents');
// Returns: 'C:\\Users\\Documents'

join();
// Returns: '.'
```

**Throws:** `TypeError` if any argument is not a string

---

#### `relative(from: string, to: string): string`

Solves the relative Windows path from `from` to `to`.

**Parameters:**
- `from` - The source path
- `to` - The destination path

**Returns:** The relative path from `from` to `to`

**Behavior:**
- Both paths are resolved to absolute paths first
- Case-insensitive comparison (Windows style)
- Returns original `to` path if on different drives
- Returns empty string if paths are the same

**Examples:**

```typescript
relative('C:\\Users\\John', 'C:\\Users\\Jane');
// Returns: '..\\Jane'

relative('C:\\Users\\John', 'C:\\Users\\John\\Documents');
// Returns: 'Documents'

relative('C:\\Users', 'D:\\Documents');
// Returns: 'D:\\Documents' (different drives)
```

**Throws:** `TypeError` if either argument is not a string

---

#### `dirname(path: string): string`

Returns the directory name of a Windows path.

**Parameters:**
- `path` - The path to evaluate

**Returns:** The directory name

**Behavior:**
- Removes the trailing path component
- Returns drive root for paths at drive level
- Returns `.` for relative paths with no directory

**Examples:**

```typescript
dirname('C:\\Users\\John\\file.txt');
// Returns: 'C:\\Users\\John'

dirname('C:\\file.txt');
// Returns: 'C:\\'

dirname('\\\\server\\share\\folder\\file.txt');
// Returns: '\\\\server\\share\\folder'

dirname('Users\\John\\file.txt');
// Returns: 'Users\\John'

dirname('file.txt');
// Returns: '.'
```

**Throws:** `TypeError` if path is not a string

---

#### `basename(path: string, ext?: string): string`

Returns the last portion of a Windows path.

**Parameters:**
- `path` - The path to evaluate
- `ext` (optional) - An optional file extension to remove from the result

**Returns:** The base name (file name)

**Behavior:**
- Returns the last segment of the path
- Optionally removes the specified extension
- Handles both forward and backslashes

**Examples:**

```typescript
basename('C:\\Users\\John\\file.txt');
// Returns: 'file.txt'

basename('C:\\Users\\John\\file.txt', '.txt');
// Returns: 'file'

basename('\\\\server\\share\\file.txt');
// Returns: 'file.txt'

basename('C:/Users/John/file.txt');
// Returns: 'file.txt'
```

**Throws:** 
- `TypeError` if path is not a string
- `TypeError` if ext is provided and is not a string

---

#### `extname(path: string): string`

Returns the extension of a Windows path, from the last `.` to end of string in the last portion of the path.

**Parameters:**
- `path` - The path to evaluate

**Returns:** The file extension (including the dot), or empty string if no extension

**Behavior:**
- Returns extension from the last `.` in the basename
- Returns empty string for hidden files without additional extension
- Handles both forward and backslashes

**Examples:**

```typescript
extname('C:\\Users\\John\\file.txt');
// Returns: '.txt'

extname('C:\\file.tar.gz');
// Returns: '.gz'

extname('C:\\.gitignore');
// Returns: ''

extname('C:\\.bashrc.bak');
// Returns: '.bak'
```

**Throws:** `TypeError` if path is not a string

---

#### `format(pathObject: PathObject | ParsedPath): string`

Returns a Windows path string from an object - the opposite of `parse()`.

**Parameters:**
- `pathObject` - An object with path components

**Returns:** The formatted Windows path string

**Behavior:**
- `base` takes precedence over `name` + `ext`
- `dir` is used if provided, otherwise `root` is used
- Concatenates components with backslashes

**Examples:**

```typescript
format({
  root: 'C:\\',
  dir: 'C:\\Users\\John',
  base: 'file.txt'
});
// Returns: 'C:\\Users\\John\\file.txt'

format({
  dir: 'C:\\Users\\John',
  name: 'file',
  ext: '.txt'
});
// Returns: 'C:\\Users\\John\\file.txt'

format({
  root: '\\\\server\\share\\',
  dir: '\\\\server\\share\\folder',
  base: 'file.txt'
});
// Returns: '\\\\server\\share\\folder\\file.txt'
```

**Throws:** `TypeError` if pathObject is null or not an object

---

#### `parse(path: string): ParsedPath`

Returns an object from a Windows path string - the opposite of `format()`.

**Parameters:**
- `path` - The path to parse

**Returns:** A `ParsedPath` object with Windows-specific components

**Behavior:**
- Extracts all path components
- Identifies drive letters (C:, D:, etc.)
- Detects UNC paths (\\\\server\\share)
- Normalizes forward slashes to backslashes

**Examples:**

```typescript
parse('C:\\Users\\John\\file.txt');
// Returns: {
//   root: 'C:\\',
//   dir: 'C:\\Users\\John',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file',
//   drive: 'C:',
//   isUNC: false
// }

parse('\\\\server\\share\\folder\\file.txt');
// Returns: {
//   root: '\\\\server\\share\\',
//   dir: '\\\\server\\share\\folder',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file',
//   drive: '',
//   isUNC: true
// }

parse('C:/Users/John/file.txt');
// Returns: {
//   root: 'C:\\',
//   dir: 'C:\\Users\\John',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file',
//   drive: 'C:',
//   isUNC: false
// }
```

**Throws:** `TypeError` if path is not a string

---

### Constants

#### `sep: string`

The Windows path segment separator.

**Value:** `'\\'` (backslash)

**Example:**

```typescript
import { sep } from './utils/os-path-windows';

const parts = ['Users', 'John', 'Documents'];
const path = 'C:' + sep + parts.join(sep);
// Returns: 'C:\\Users\\John\\Documents'
```

---

#### `delimiter: string`

The Windows path delimiter used to separate paths in environment variables.

**Value:** `';'` (semicolon)

**Example:**

```typescript
import { delimiter } from './utils/os-path-windows';

const paths = ['C:\\Program Files', 'C:\\Windows', 'C:\\Windows\\System32'];
const pathEnv = paths.join(delimiter);
// Returns: 'C:\\Program Files;C:\\Windows;C:\\Windows\\System32'
```

---

## Usage Examples

### Working with Drive Letters

```typescript
import { parse, join, resolve } from './utils/os-path-windows';

// Parse drive paths
const parsed = parse('C:\\Users\\John\\file.txt');
console.log(parsed.drive);  // 'C:'
console.log(parsed.root);   // 'C:\\'

// Join with drives
join('C:\\Users', 'John', 'Documents');
// Returns: 'C:\\Users\\John\\Documents'

// Resolve relative to drive
resolve('C:\\Users', 'John', '..', 'Public');
// Returns: 'C:\\Users\\Public'
```

### Working with UNC Paths

```typescript
import { parse, normalize, join } from './utils/os-path-windows';

// Parse UNC paths
const parsed = parse('\\\\server\\share\\folder\\file.txt');
console.log(parsed.isUNC);  // true
console.log(parsed.root);   // '\\\\server\\share\\'

// Normalize UNC paths
normalize('\\\\server\\share\\folder\\..');
// Returns: '\\\\server\\share\\'

// Join UNC segments
join('\\\\server\\share', 'folder', 'file.txt');
// Returns: '\\\\server\\share\\folder\\file.txt'
```

### Handling Mixed Separators

```typescript
import { normalize, parse } from './utils/os-path-windows';

// Forward slashes are normalized to backslashes
normalize('C:/Users/John/Documents');
// Returns: 'C:\\Users\\John\\Documents'

// Parse handles mixed separators
parse('C:/Users\\John/Documents/file.txt');
// Returns: {
//   root: 'C:\\',
//   dir: 'C:\\Users\\John\\Documents',
//   ...
// }
```

### Getting File Information

```typescript
import { basename, dirname, extname } from './utils/os-path-windows';

const filePath = 'C:\\Users\\John\\Documents\\report.pdf';

basename(filePath);         // 'report.pdf'
basename(filePath, '.pdf'); // 'report'
dirname(filePath);          // 'C:\\Users\\John\\Documents'
extname(filePath);          // '.pdf'
```

---

## Error Handling

All functions validate their inputs and throw `TypeError` for invalid arguments:

```typescript
import { join, basename, format } from './utils/os-path-windows';

// These will throw TypeError
join('C:\\Users', 123);      // path must be string
basename(null);              // path must be string
basename('C:\\file', 123);   // ext must be string
format('string');            // pathObject must be object
format(null);                // pathObject must be object
```

---

## Windows Path Specifics

### Drive Letters

- Supports all drive letters A-Z (case-insensitive)
- Absolute paths: `C:\path` (with backslash after colon)
- Drive-relative paths: `C:path` (no backslash, relative to current directory on that drive)

### UNC Paths

- Format: `\\server\share\path`
- Server and share are required
- Treated as absolute paths
- Root is `\\server\share\`

### Path Separators

- Primary: `\` (backslash)
- Also accepts: `/` (forward slash, converted to backslash)
- Mixed separators are normalized

---

## Testing

The module includes 76 comprehensive tests covering:
- ✅ All public functions
- ✅ Drive letter handling
- ✅ UNC path support
- ✅ Mixed separator handling
- ✅ Error handling and type validation
- ✅ Edge cases (spaces, special characters, long paths)
- ✅ Format/Parse symmetry
- ✅ Windows compliance

Run tests:

```bash
npm test os-path-windows
```

---

## Performance Considerations

- **Lightweight**: No external dependencies
- **Efficient**: Optimized for Windows path conventions
- **Tree-shakable**: Unused functions are eliminated during bundling

---

## License

MIT License - Based on Node.js path module

Copyright Joyent, Inc. and other Node contributors.

See the full license text in the source file.

---

## See Also

- [Node.js Path Documentation](https://nodejs.org/api/path.html)
- [Windows Path Formats](https://docs.microsoft.com/en-us/windows/win32/fileio/naming-a-file#maximum-path-length-limitation)
- Test file: `os-path-windows.test.ts`
- POSIX version: `os-path-posix.ts`

