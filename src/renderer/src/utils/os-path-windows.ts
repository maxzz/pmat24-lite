// Windows path utilities
// Converted to TypeScript with tree-shakable exports
//
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

/**
 * Windows path object interface for format and parse operations
 */
export interface PathObject {
    root?: string;
    dir?: string;
    base?: string;
    ext?: string;
    name?: string;
}

/**
 * Parsed Windows path object
 */
export interface ParsedPath {
    root: string;      // Root: 'C:\' or '\\server\share\' or '\'
    dir: string;       // Directory path
    base: string;      // File name including extension
    ext: string;       // File extension including dot
    name: string;      // File name without extension
    drive: string;     // Drive letter: 'C:' or empty for UNC/relative
    isUNC: boolean;    // True if UNC path (\\server\share)
}

function assertPath(path: unknown): asserts path is string {
    if (typeof path !== 'string') {
        throw new TypeError('Path must be a string. Received ' + JSON.stringify(path));
    }
}

/**
 * Helper function to check if a character code is a Windows drive letter (A-Z or a-z)
 */
function isWindowsDriveLetter(code: number): boolean {
    return (code >= 65 && code <= 90) || (code >= 97 && code <= 122); // A-Z or a-z
}

/**
 * Helper function to check if a character is a path separator (\ or /)
 */
function isPathSeparator(code: number): boolean {
    return code === 47 /*/*/ || code === 92 /*\*/;
}

// Resolves . and .. elements in a Windows path
function normalizeStringWindows(path: string, allowAboveRoot: boolean): string {
    let res = '';
    let lastSegmentLength = 0;
    let lastSlash = -1;
    let dots = 0;
    let code = 0;
    
    for (let i = 0; i <= path.length; ++i) {
        if (i < path.length)
            code = path.charCodeAt(i);
        else if (isPathSeparator(code))
            break;
        else
            code = 92 /*\*/;
            
        if (isPathSeparator(code)) {
            if (lastSlash === i - 1 || dots === 1) {
                // NOOP
            } else if (lastSlash !== i - 1 && dots === 2) {
                if (res.length < 2 || lastSegmentLength !== 2 || 
                    res.charCodeAt(res.length - 1) !== 46 /*.*/ || 
                    res.charCodeAt(res.length - 2) !== 46 /*.*/) {
                    if (res.length > 2) {
                        const lastSlashIndex = res.lastIndexOf('\\');
                        if (lastSlashIndex !== res.length - 1) {
                            if (lastSlashIndex === -1) {
                                res = '';
                                lastSegmentLength = 0;
                            } else {
                                res = res.slice(0, lastSlashIndex);
                                lastSegmentLength = res.length - 1 - res.lastIndexOf('\\');
                            }
                            lastSlash = i;
                            dots = 0;
                            continue;
                        }
                    } else if (res.length === 2 || res.length === 1) {
                        res = '';
                        lastSegmentLength = 0;
                        lastSlash = i;
                        dots = 0;
                        continue;
                    }
                }
                if (allowAboveRoot) {
                    if (res.length > 0)
                        res += '\\..';
                    else
                        res = '..';
                    lastSegmentLength = 2;
                }
            } else {
                if (res.length > 0)
                    res += '\\' + path.slice(lastSlash + 1, i);
                else
                    res = path.slice(lastSlash + 1, i);
                lastSegmentLength = i - lastSlash - 1;
            }
            lastSlash = i;
            dots = 0;
        } else if (code === 46 /*.*/ && dots !== -1) {
            ++dots;
        } else {
            dots = -1;
        }
    }
    return res;
}

/**
 * Resolves a sequence of paths or path segments into an absolute Windows path.
 * @param paths - A sequence of paths or path segments
 * @returns The resolved absolute path
 */
export function resolve(...paths: string[]): string {
    let resolvedDevice = '';
    let resolvedTail = '';
    let resolvedAbsolute = false;

    for (let i = paths.length - 1; i >= -1; i--) {
        let path: string;
        if (i >= 0) {
            path = paths[i];
        } else if (!resolvedDevice) {
            path = process.cwd();
        } else {
            // Windows has the concept of drive-specific current working directories.
            // This logic would require OS-specific calls which we'll skip for now.
            path = process.cwd();
        }

        assertPath(path);

        if (path.length === 0) {
            continue;
        }

        // Normalize separators
        path = path.replace(/\//g, '\\');

        let rootEnd = 0;
        let device = '';
        let isAbsolute = false;

        const len = path.length;
        const code = path.charCodeAt(0);

        // Try to match a root
        if (len > 1) {
            // Device with path: \\?\ or \\.\
            if (isPathSeparator(code)) {
                // Possible UNC path
                isAbsolute = true;

                if (isPathSeparator(path.charCodeAt(1))) {
                    // Matched double path separator at beginning
                    let j = 2;
                    let last = j;
                    // Match 1 or more non-path separators
                    for (; j < len; ++j) {
                        if (isPathSeparator(path.charCodeAt(j)))
                            break;
                    }
                    if (j < len && j !== last) {
                        const firstPart = path.slice(last, j);
                        // Matched!
                        last = j;
                        // Match 1 or more path separators
                        for (; j < len; ++j) {
                            if (!isPathSeparator(path.charCodeAt(j)))
                                break;
                        }
                        if (j < len && j !== last) {
                            // Matched!
                            last = j;
                            // Match 1 or more non-path separators
                            for (; j < len; ++j) {
                                if (isPathSeparator(path.charCodeAt(j)))
                                    break;
                            }
                            if (j === len) {
                                // We matched a UNC root only
                                device = '\\\\' + firstPart + '\\' + path.slice(last);
                                rootEnd = j;
                            } else if (j !== last) {
                                // We matched a UNC root with leftovers
                                device = '\\\\' + firstPart + '\\' + path.slice(last, j);
                                rootEnd = j;
                            }
                        }
                    }
                } else {
                    rootEnd = 1;
                }
            } else if (isWindowsDriveLetter(code) &&
                path.charCodeAt(1) === 58 /*:*/) {
                // Drive letter
                device = path.slice(0, 2);
                rootEnd = 2;
                if (len > 2) {
                    if (isPathSeparator(path.charCodeAt(2))) {
                        // Absolute path
                        isAbsolute = true;
                        rootEnd = 3;
                    }
                }
            }
        } else if (isPathSeparator(code)) {
            // Root-relative path
            rootEnd = 1;
            isAbsolute = true;
        }

        if (device.length > 0 &&
            resolvedDevice.length > 0 &&
            device.toLowerCase() !== resolvedDevice.toLowerCase()) {
            // This path points to another device so it is not applicable
            continue;
        }

        if (resolvedDevice.length === 0 && device.length > 0) {
            resolvedDevice = device;
        }
        if (!resolvedAbsolute) {
            resolvedTail = path.slice(rootEnd) + '\\' + resolvedTail;
            resolvedAbsolute = isAbsolute;
        }

        if (resolvedAbsolute && resolvedDevice.length > 0) {
            break;
        }
    }

    // Normalize tail
    resolvedTail = normalizeStringWindows(resolvedTail, !resolvedAbsolute);

    if (resolvedAbsolute) {
        if (resolvedDevice.length > 0) {
            return resolvedDevice + '\\' + resolvedTail;
        } else {
            return '\\' + resolvedTail;
        }
    } else if (resolvedDevice.length > 0) {
        return resolvedDevice + (resolvedTail.length > 0 ? '\\' + resolvedTail : '');
    } else if (resolvedTail.length > 0) {
        return resolvedTail;
    } else {
        return '.';
    }
}

/**
 * Normalizes the given Windows path, resolving '..' and '.' segments.
 * @param path - The path to normalize
 * @returns The normalized path
 */
export function normalize(path: string): string {
    assertPath(path);

    if (path.length === 0) return '.';

    // Normalize separators
    path = path.replace(/\//g, '\\');

    const len = path.length;
    let rootEnd = 0;
    let device: string | undefined;
    let isAbsolute = false;
    const code = path.charCodeAt(0);

    // Try to match a root
    if (len > 1) {
        if (isPathSeparator(code)) {
            // Possible UNC root
            isAbsolute = true;

            if (isPathSeparator(path.charCodeAt(1))) {
                // Matched double path separator at beginning
                let j = 2;
                let last = j;
                // Match 1 or more non-path separators
                for (; j < len; ++j) {
                    if (isPathSeparator(path.charCodeAt(j)))
                        break;
                }
                if (j < len && j !== last) {
                    const firstPart = path.slice(last, j);
                    // Matched!
                    last = j;
                    // Match 1 or more path separators
                    for (; j < len; ++j) {
                        if (!isPathSeparator(path.charCodeAt(j)))
                            break;
                    }
                    if (j < len && j !== last) {
                        // Matched!
                        last = j;
                        // Match 1 or more non-path separators
                        for (; j < len; ++j) {
                            if (isPathSeparator(path.charCodeAt(j)))
                                break;
                        }
                        if (j === len) {
                            // We matched a UNC root only
                            // Return the normalized version
                            return '\\\\' + firstPart + '\\' + path.slice(last) + '\\';
                        } else if (j !== last) {
                            // We matched a UNC root with leftovers
                            device = '\\\\' + firstPart + '\\' + path.slice(last, j);
                            rootEnd = j;
                        }
                    }
                }
            } else {
                rootEnd = 1;
            }
        } else if (isWindowsDriveLetter(code) && path.charCodeAt(1) === 58 /*:*/) {
            device = path.slice(0, 2);
            rootEnd = 2;
            if (len > 2) {
                if (isPathSeparator(path.charCodeAt(2))) {
                    isAbsolute = true;
                    rootEnd = 3;
                }
            }
        }
    } else if (isPathSeparator(code)) {
        // Root-relative path
        return '\\';
    }

    let tail: string;
    if (rootEnd < len) {
        tail = normalizeStringWindows(path.slice(rootEnd), !isAbsolute);
    } else {
        tail = '';
    }

    if (tail.length === 0 && !isAbsolute) return '.';

    const trailingSeparator = isPathSeparator(path.charCodeAt(len - 1));
    if (trailingSeparator && tail.length > 0) tail += '\\';

    if (!isAbsolute) {
        return tail;
    } else if (device) {
        return device + '\\' + tail;
    } else {
        return '\\' + tail;
    }
}

/**
 * Determines whether the path is an absolute Windows path.
 * @param path - The path to test
 * @returns true if the path is absolute, false otherwise
 */
export function isAbsolute(path: string): boolean {
    assertPath(path);

    const len = path.length;
    if (len === 0) return false;

    const code = path.charCodeAt(0);

    if (isPathSeparator(code)) {
        return true;
    } else if (isWindowsDriveLetter(code)) {
        if (len > 2 && path.charCodeAt(1) === 58 /*:*/) {
            if (isPathSeparator(path.charCodeAt(2))) {
                return true;
            }
        }
    }
    return false;
}

/**
 * Joins all given Windows path segments together using backslash as a delimiter,
 * then normalizes the resulting path.
 * @param paths - A sequence of path segments
 * @returns The joined path
 */
export function join(...paths: string[]): string {
    if (paths.length === 0)
        return '.';

    let joined: string | undefined;
    let firstPart: string | undefined;
    
    for (let i = 0; i < paths.length; ++i) {
        const arg = paths[i];
        assertPath(arg);
        if (arg.length > 0) {
            if (joined === undefined) {
                joined = firstPart = arg;
            } else {
                joined += '\\' + arg;
            }
        }
    }

    if (joined === undefined)
        return '.';

    // Make sure that the joined path doesn't start with two slashes, because
    // normalize() will mistake it for an UNC path
    let needsReplace = true;
    let slashCount = 0;
    if (firstPart) {
        const code = firstPart.charCodeAt(0);
        if (isPathSeparator(code)) {
            ++slashCount;
            const firstLen = firstPart.length;
            if (firstLen > 1) {
                if (isPathSeparator(firstPart.charCodeAt(1))) {
                    ++slashCount;
                    if (firstLen > 2) {
                        if (isPathSeparator(firstPart.charCodeAt(2)))
                            ++slashCount;
                        else {
                            // We matched a UNC path in the first part
                            needsReplace = false;
                        }
                    }
                }
            }
        }
    }
    if (needsReplace) {
        // Replace multiple slashes with a single slash
        for (; slashCount < joined.length; ++slashCount) {
            if (!isPathSeparator(joined.charCodeAt(slashCount)))
                break;
        }
        if (slashCount >= 2)
            joined = '\\' + joined.slice(slashCount);
    }

    return normalize(joined);
}

/**
 * Solves the relative Windows path from {from} to {to}.
 * @param from - The source path
 * @param to - The destination path
 * @returns The relative path from {from} to {to}
 */
export function relative(from: string, to: string): string {
    assertPath(from);
    assertPath(to);

    if (from === to) return '';

    const fromOrig = resolve(from);
    const toOrig = resolve(to);

    if (fromOrig === toOrig) return '';

    from = fromOrig.toLowerCase();
    to = toOrig.toLowerCase();

    if (from === to) return '';

    // Trim any leading backslashes
    let fromStart = 0;
    for (; fromStart < from.length; ++fromStart) {
        if (from.charCodeAt(fromStart) !== 92 /*\*/)
            break;
    }
    // Trim trailing backslashes (applicable to UNC paths only)
    let fromEnd = from.length;
    for (; fromEnd - 1 > fromStart; --fromEnd) {
        if (from.charCodeAt(fromEnd - 1) !== 92 /*\*/)
            break;
    }
    const fromLen = fromEnd - fromStart;

    // Trim any leading backslashes
    let toStart = 0;
    for (; toStart < to.length; ++toStart) {
        if (to.charCodeAt(toStart) !== 92 /*\*/)
            break;
    }
    // Trim trailing backslashes
    let toEnd = to.length;
    for (; toEnd - 1 > toStart; --toEnd) {
        if (to.charCodeAt(toEnd - 1) !== 92 /*\*/)
            break;
    }
    const toLen = toEnd - toStart;

    // Compare paths to find the longest common path from root
    const length = fromLen < toLen ? fromLen : toLen;
    let lastCommonSep = -1;
    let i = 0;
    for (; i <= length; ++i) {
        if (i === length) {
            if (toLen > length) {
                if (to.charCodeAt(toStart + i) === 92 /*\*/) {
                    // We get here if `from` is the exact base path for `to`.
                    return toOrig.slice(toStart + i + 1);
                } else if (i === 2) {
                    // We get here if `from` is the device root.
                    return toOrig.slice(toStart + i);
                }
            }
            if (fromLen > length) {
                if (from.charCodeAt(fromStart + i) === 92 /*\*/) {
                    // We get here if `to` is the exact base path for `from`.
                    lastCommonSep = i;
                } else if (i === 2) {
                    // We get here if `to` is the device root.
                    lastCommonSep = 3;
                }
            }
            break;
        }
        const fromCode = from.charCodeAt(fromStart + i);
        const toCode = to.charCodeAt(toStart + i);
        if (fromCode !== toCode)
            break;
        else if (fromCode === 92 /*\*/)
            lastCommonSep = i;
    }

    // We found a mismatch before the first common path separator was seen, so
    // return the original `to`.
    if (i !== length && lastCommonSep === -1) {
        return toOrig;
    }

    let out = '';
    if (lastCommonSep === -1)
        lastCommonSep = 0;
        
    // Generate the relative path based on the path difference between `to`
    // and `from`
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
        if (i === fromEnd || from.charCodeAt(i) === 92 /*\*/) {
            if (out.length === 0)
                out += '..';
            else
                out += '\\..';
        }
    }

    // Lastly, append the rest of the destination (`to`) path that comes after
    // the common path parts
    if (out.length > 0)
        return out + toOrig.slice(toStart + lastCommonSep, toEnd);
    else {
        toStart += lastCommonSep;
        if (toOrig.charCodeAt(toStart) === 92 /*\*/)
            ++toStart;
        return toOrig.slice(toStart, toEnd);
    }
}

/**
 * Returns the directory name of a Windows path.
 * @param path - The path to evaluate
 * @returns The directory name
 */
export function dirname(path: string): string {
    assertPath(path);
    const len = path.length;
    if (len === 0) return '.';

    let rootEnd = -1;
    let end = -1;
    let matchedSlash = true;
    let offset = 0;
    const code = path.charCodeAt(0);

    // Try to match a root
    if (len > 1) {
        if (isPathSeparator(code)) {
            // Possible UNC root
            rootEnd = offset = 1;

            if (isPathSeparator(path.charCodeAt(1))) {
                // Matched double path separator at beginning
                let j = 2;
                let last = j;
                // Match 1 or more non-path separators
                for (; j < len; ++j) {
                    if (isPathSeparator(path.charCodeAt(j)))
                        break;
                }
                if (j < len && j !== last) {
                    // Matched!
                    last = j;
                    // Match 1 or more path separators
                    for (; j < len; ++j) {
                        if (!isPathSeparator(path.charCodeAt(j)))
                            break;
                    }
                    if (j < len && j !== last) {
                        // Matched!
                        last = j;
                        // Match 1 or more non-path separators
                        for (; j < len; ++j) {
                            if (isPathSeparator(path.charCodeAt(j)))
                                break;
                        }
                        if (j === len) {
                            // We matched a UNC root only
                            return path;
                        }
                        if (j !== last) {
                            // We matched a UNC root with leftovers
                            rootEnd = offset = j + 1;
                        }
                    }
                }
            }
        } else if (isWindowsDriveLetter(code) && path.charCodeAt(1) === 58 /*:*/) {
            rootEnd = offset = 2;
            if (len > 2) {
                if (isPathSeparator(path.charCodeAt(2)))
                    rootEnd = offset = 3;
            }
        }
    } else if (isPathSeparator(code)) {
        return path;
    }

    for (let i = len - 1; i >= offset; --i) {
        if (isPathSeparator(path.charCodeAt(i))) {
            if (!matchedSlash) {
                end = i;
                break;
            }
        } else {
            // We saw the first non-path separator
            matchedSlash = false;
        }
    }

    if (end === -1) {
        if (rootEnd === -1)
            return '.';
        else
            end = rootEnd;
    }
    return path.slice(0, end);
}

/**
 * Returns the last portion of a Windows path.
 * @param path - The path to evaluate
 * @param ext - An optional file extension to remove from the result
 * @returns The base name
 */
export function basename(path: string, ext?: string): string {
    if (ext !== undefined && typeof ext !== 'string')
        throw new TypeError('"ext" argument must be a string');
    assertPath(path);

    let start = 0;
    let end = -1;
    let matchedSlash = true;
    let i: number;

    // Check for a drive letter prefix so as not to mistake the following
    // path separator as an extra separator at the end of the path that can be
    // disregarded
    if (path.length >= 2) {
        const drive = path.charCodeAt(0);
        if (isWindowsDriveLetter(drive)) {
            if (path.charCodeAt(1) === 58 /*:*/)
                start = 2;
        }
    }

    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
        if (ext.length === path.length && ext === path)
            return '';
        let extIdx = ext.length - 1;
        let firstNonSlashEnd = -1;
        for (i = path.length - 1; i >= start; --i) {
            const code = path.charCodeAt(i);
            if (isPathSeparator(code)) {
                // If we reached a path separator that was not part of a set of path
                // separators at the end of the string, stop now
                if (!matchedSlash) {
                    start = i + 1;
                    break;
                }
            } else {
                if (firstNonSlashEnd === -1) {
                    // We saw the first non-path separator, remember this index in case
                    // we need it if the extension ends up not matching
                    matchedSlash = false;
                    firstNonSlashEnd = i + 1;
                }
                if (extIdx >= 0) {
                    // Try to match the explicit extension
                    if (code === ext.charCodeAt(extIdx)) {
                        if (--extIdx === -1) {
                            // We matched the extension, so mark this as the end of our path
                            // component
                            end = i;
                        }
                    } else {
                        // Extension does not match, so our result is the entire path
                        // component
                        extIdx = -1;
                        end = firstNonSlashEnd;
                    }
                }
            }
        }

        if (start === end) end = firstNonSlashEnd;
        else if (end === -1) end = path.length;
        return path.slice(start, end);
    } else {
        for (i = path.length - 1; i >= start; --i) {
            if (isPathSeparator(path.charCodeAt(i))) {
                // If we reached a path separator that was not part of a set of path
                // separators at the end of the string, stop now
                if (!matchedSlash) {
                    start = i + 1;
                    break;
                }
            } else if (end === -1) {
                // We saw the first non-path separator, mark this as the end of our
                // path component
                matchedSlash = false;
                end = i + 1;
            }
        }

        if (end === -1) return '';
        return path.slice(start, end);
    }
}

/**
 * Returns the extension of a Windows path, from the last '.' to end of string in the last portion of the path.
 * @param path - The path to evaluate
 * @returns The file extension
 */
export function extname(path: string): string {
    assertPath(path);
    let start = 0;
    let startDot = -1;
    let startPart = 0;
    let end = -1;
    let matchedSlash = true;
    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    let preDotState = 0;

    // Check for a drive letter prefix so as not to mistake the following
    // path separator as an extra separator at the end of the path that can be
    // disregarded
    if (path.length >= 2 &&
        path.charCodeAt(1) === 58 /*:*/ &&
        isWindowsDriveLetter(path.charCodeAt(0))) {
        start = startPart = 2;
    }

    for (let i = path.length - 1; i >= start; --i) {
        const code = path.charCodeAt(i);
        if (isPathSeparator(code)) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
                startPart = i + 1;
                break;
            }
            continue;
        }
        if (end === -1) {
            // We saw the first non-path separator, mark this as the end of our
            // extension
            matchedSlash = false;
            end = i + 1;
        }
        if (code === 46 /*.*/) {
            // If this is our first dot, mark it as the start of our extension
            if (startDot === -1)
                startDot = i;
            else if (preDotState !== 1)
                preDotState = 1;
        } else if (startDot !== -1) {
            // We saw a non-dot and non-path separator before our dot, so we should
            // have a good chance at having a non-empty extension
            preDotState = -1;
        }
    }

    if (startDot === -1 ||
        end === -1 ||
        // We saw a non-dot character immediately before the dot
        preDotState === 0 ||
        // The (right-most) trimmed path component is exactly '..'
        (preDotState === 1 &&
            startDot === end - 1 &&
            startDot === startPart + 1)) {
        return '';
    }
    return path.slice(startDot, end);
}

/**
 * Returns a Windows path string from an object - the opposite of parse().
 * @param pathObject - The path object to format
 * @returns The formatted path string
 */
export function format(pathObject: PathObject | ParsedPath): string {
    if (pathObject === null || typeof pathObject !== 'object') {
        throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
    }

    const dir = pathObject.dir || pathObject.root;
    const base = pathObject.base || (pathObject.name || '') + (pathObject.ext || '');

    if (!dir) {
        return base;
    }
    if (dir === pathObject.root) {
        return dir + base;
    }
    return dir + '\\' + base;
}

/**
 * Returns an object from a Windows path string - the opposite of format().
 * @param path - The path to parse
 * @returns The parsed path object
 */
export function parse(path: string): ParsedPath {
    assertPath(path);

    const ret: ParsedPath = {
        root: '',
        dir: '',
        base: '',
        ext: '',
        name: '',
        drive: '',
        isUNC: false,
    };

    if (path.length === 0) return ret;

    // Normalize separators to backslash for consistent processing
    const normalizedPath = path.replace(/\//g, '\\');
    const len = normalizedPath.length;
    let rootEnd = 0;
    let code = normalizedPath.charCodeAt(0);

    // Try to match a root
    if (len > 1) {
        // Check for UNC path: \\server\share
        if (isPathSeparator(code)) {
            ret.isUNC = false;
            if (isPathSeparator(normalizedPath.charCodeAt(1))) {
                // Matched double path separator at beginning
                let j = 2;
                let last = j;
                // Match 1 or more non-path separators
                for (; j < len; ++j) {
                    if (isPathSeparator(normalizedPath.charCodeAt(j)))
                        break;
                }
                if (j < len && j !== last) {
                    const firstPart = normalizedPath.slice(last, j);
                    // Matched!
                    last = j;
                    // Match 1 or more path separators
                    for (; j < len; ++j) {
                        if (!isPathSeparator(normalizedPath.charCodeAt(j)))
                            break;
                    }
                    if (j < len && j !== last) {
                        // Matched!
                        last = j;
                        // Match 1 or more non-path separators
                        for (; j < len; ++j) {
                            if (isPathSeparator(normalizedPath.charCodeAt(j)))
                                break;
                        }
                        if (j === len) {
                            // We matched a UNC root only
                            ret.root = normalizedPath;
                            ret.dir = normalizedPath;
                            ret.isUNC = true;
                            return ret;
                        } else if (j !== last) {
                            // We matched a UNC root with leftovers
                            ret.root = normalizedPath.slice(0, j) + '\\';
                            ret.isUNC = true;
                            rootEnd = j + 1;
                        }
                    }
                }
            } else {
                rootEnd = 1;
                ret.root = '\\';
            }
        } else if (isWindowsDriveLetter(code) &&
            normalizedPath.charCodeAt(1) === 58 /*:*/) {
            ret.drive = normalizedPath.slice(0, 2);
            rootEnd = 2;
            if (len > 2) {
                if (isPathSeparator(normalizedPath.charCodeAt(2))) {
                    // Absolute path
                    ret.root = normalizedPath.slice(0, 3);
                    rootEnd = 3;
                } else {
                    ret.root = ret.drive;
                }
            } else {
                ret.root = ret.drive;
            }
        }
    } else if (isPathSeparator(code)) {
        // Root-relative path
        ret.root = '\\';
        rootEnd = 1;
    }

    // Now parse the basename, extension, and name
    let startDot = -1;
    let startPart = rootEnd;
    let end = -1;
    let matchedSlash = true;
    let preDotState = 0;

    // Work backwards from the end
    for (let i = len - 1; i >= rootEnd; --i) {
        code = normalizedPath.charCodeAt(i);
        if (isPathSeparator(code)) {
            if (!matchedSlash) {
                startPart = i + 1;
                break;
            }
            continue;
        }
        if (end === -1) {
            matchedSlash = false;
            end = i + 1;
        }
        if (code === 46 /*.*/) {
            if (startDot === -1) {
                startDot = i;
            } else if (preDotState !== 1) {
                preDotState = 1;
            }
        } else if (startDot !== -1) {
            preDotState = -1;
        }
    }

    if (startDot === -1 || end === -1 ||
        preDotState === 0 ||
        (preDotState === 1 && startDot === end - 1 && startDot === startPart + 1)) {
        if (end !== -1) {
            ret.base = ret.name = normalizedPath.slice(startPart, end);
        }
    } else {
        ret.name = normalizedPath.slice(startPart, startDot);
        ret.base = normalizedPath.slice(startPart, end);
        ret.ext = normalizedPath.slice(startDot, end);
    }

    // Set the directory
    if (startPart > 0 && startPart !== rootEnd) {
        ret.dir = normalizedPath.slice(0, startPart - 1);
    } else if (rootEnd > 0) {
        ret.dir = ret.root;
    }

    return ret;
}

/**
 * The Windows path segment separator
 */
export const sep = '\\';

/**
 * The Windows path delimiter
 */
export const delimiter = ';';

