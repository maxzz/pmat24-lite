import * as fs from 'fs';

export function extractStringsFromFile(filePath: string, minLength: number, classNameSuffix: string): Record<string, string> {
    let content = fs.readFileSync(filePath, 'utf-8');
    const strings: Record<string, string> = {};

    // Remove import and export statements to avoid extracting their strings
    // This handles single-line and multi-line import/export statements
    content = removeImportExportStatements(content);

    // Remove className attributes and variables ending with specified suffix
    content = removeClassNameStrings(content, classNameSuffix);

    // Remove console.log and console.warn calls to avoid extracting debug messages
    content = removeConsoleStatements(content);

    // Extract JSX text content with placeholders
    // This handles text like: <div>Text with {variable} placeholder</div>
    content = extractJSXTextContent(content, minLength, strings);

    // Match string literals (single/double quotes, template literals without interpolation)
    // Exclude: imports, requires, CSS classes, short identifiers, code-like strings
    const patterns = [
        // Double quotes
        /"([^"\\]*(\\.[^"\\]*)*)"/g,
        // Single quotes
        /'([^'\\]*(\\.[^'\\]*)*)'/g,
        // Template literals without ${...}
        /`([^`$\\]*(\\.[^`$\\]*)*)`/g,
    ];

    const foundStrings = new Set<string>(Object.values(strings));

    for (const pattern of patterns) {
        let match;
        while ((match = pattern.exec(content)) !== null) {
            const str = match[1];

            // Filter out strings that are likely not user-facing
            if (
                str.length < minLength ||
                foundStrings.has(str) ||
                isCodeString(str) ||
                isCssClass(str) ||
                isImportPath(str) ||
                isUrl(str) ||
                isOnlyNumbersOrSymbols(str) ||
                isGuid(str) ||
                isDirectiveOrInterpolation(str) ||
                isSvgPath(str)
            ) {
                continue;
            }

            foundStrings.add(str);
            const key = generateKey(str);
            strings[key] = str;
        }
    }

    return strings;
}

/**
 * Remove import and export statements from source code to prevent extracting module paths.
 * Handles various import/export formats including:
 * - Single-line imports: import { x } from "module";
 * - Multi-line imports: import {\n  x,\n  y\n} from "module";
 * - Type imports: import type { T } from "module";
 * - Side-effect imports: import "module";
 * - Dynamic imports: import("module");
 * - Re-exports: export * from "module";
 * - Named exports: export { x } from "module";
 * - Require statements: require("module");
 */
function removeImportExportStatements(content: string): string {
    // Remove single-line and multi-line import statements
    // Matches: import ... from "...";
    //          import("...");
    //          import type ... from "...";
    //          import { ... } from "...";
    content = content.replace(/import\s+(?:type\s+)?(?:[^;]+?from\s+)?['"`][^'"`]+['"`]\s*;?/g, '');
    content = content.replace(/import\s*\([^)]*\)/g, '');
    
    // Remove multi-line imports with line breaks
    // Matches: import {
    //            something,
    //            other
    //          } from "...";
    content = content.replace(/import\s+(?:type\s+)?(?:\{[^}]*\}|[^;{]*)\s*from\s+['"`][^'"`]+['"`]\s*;?/gs, '');
    
    // Remove side-effect imports: import "...";
    content = content.replace(/import\s+['"`][^'"`]+['"`]\s*;?/g, '');
    
    // Remove export ... from "..." statements (single and multi-line)
    content = content.replace(/export\s+(?:\{[^}]*\}|[^;{]*)\s*from\s+['"`][^'"`]+['"`]\s*;?/gs, '');
    
    // Remove export type ... from "..." statements
    content = content.replace(/export\s+type\s+(?:\{[^}]*\}|[^;{]*)\s*from\s+['"`][^'"`]+['"`]\s*;?/gs, '');
    
    // Remove re-export all: export * from "...";
    content = content.replace(/export\s+\*\s+(?:as\s+\w+\s+)?from\s+['"`][^'"`]+['"`]\s*;?/g, '');
    
    // Remove dynamic imports in export: export { default } from "...";
    content = content.replace(/export\s+\{[^}]*\}\s+from\s+['"`][^'"`]+['"`]\s*;?/gs, '');
    
    // Remove require statements
    content = content.replace(/require\s*\(\s*['"`][^'"`]+['"`]\s*\)/g, '');

    return content;
}

/**
 * Remove className attributes and variables ending with specified suffix.
 * This prevents Tailwind CSS class strings from being extracted.
 * Handles:
 * - className="..." and className='...'
 * - className={...}
 * - Variables like: const exampleClasses = "..."
 * - Template literals in className
 */
function removeClassNameStrings(content: string, classNameSuffix: string): string {
    // Remove className="..." or className='...'
    content = content.replace(/className\s*=\s*["']([^"']*)["']/g, '');
    
    // Remove className={...} with string literals
    content = content.replace(/className\s*=\s*\{[^}]*\}/g, '');
    
    // Remove className={`...`} template literals
    content = content.replace(/className\s*=\s*\{`[^`]*`\}/g, '');
    
    // Create regex to match variable assignments ending with the specified suffix
    // Matches: const exampleClasses = "..." or let buttonClasses = '...' or var myClasses = `...`
    const varRegex = new RegExp(
        `(?:const|let|var)\\s+\\w*${classNameSuffix}\\s*=\\s*["'\`][^"'\`]*["'\`]`,
        'g'
    );
    content = content.replace(varRegex, '');
    
    // Remove template literal assignments to variables ending with suffix
    const templateVarRegex = new RegExp(
        `(?:const|let|var)\\s+\\w*${classNameSuffix}\\s*=\\s*\`[^\`]*\``,
        'gs'
    );
    content = content.replace(templateVarRegex, '');
    
    // Remove multi-line className with template literals
    content = content.replace(/className\s*=\s*\{`[\s\S]*?`\}/g, '');

    return content;
}

/**
 * Remove console.log, console.warn, console.error, and console.debug statements.
 * This prevents debug/logging messages from being extracted as localizable strings.
 * Handles:
 * - console.log("message")
 * - console.warn("message", variable)
 * - console.error(`template ${var}`)
 * - Multi-line console calls
 */
function removeConsoleStatements(content: string): string {
    // Remove console.log, console.warn, console.error, console.debug, console.info
    // Handles single-line and simple multi-line cases
    // Pattern matches: console.method(...)
    content = content.replace(/console\.(log|warn|error|debug|info|group|groupCollapsed)\s*\([^)]*\)\s*;?/g, '');
    
    // Remove multi-line console statements with nested parentheses
    // This handles cases like: console.log(
    //   "message",
    //   obj.method()
    // );
    let previousContent;
    do {
        previousContent = content;
        content = content.replace(/console\.(log|warn|error|debug|info|group|groupCollapsed)\s*\([^()]*(?:\([^()]*\)[^()]*)*\)\s*;?/gs, '');
    } while (content !== previousContent);
    
    return content;
}

/**
 * Extract JSX text content that contains placeholders.
 * Handles text like: <div>Text with {variable} placeholder</div>
 * The text is extracted with {variable} preserved as a localization placeholder.
 */
function extractJSXTextContent(content: string, minLength: number, strings: Record<string, string>): string {
    // Match JSX text content between tags that contains text with {expressions}
    // Pattern: >text content potentially with {expressions}<
    // Must start with letter or whitespace followed by letter to avoid code
    const jsxTextPattern = />(\s*[A-Z][^<>]*\{[^}]+\}[^<>]*)</g;
    
    let match;
    while ((match = jsxTextPattern.exec(content)) !== null) {
        const rawText = match[1].trim();
        
        // Skip if it looks like code (contains newlines, return statements, etc.)
        if (rawText.includes('\n') || rawText.includes('\r') || 
            rawText.includes('return') || rawText.includes('=>') ||
            rawText.includes('const ') || rawText.includes('function') ||
            rawText.length > 200) {
            continue;
        }
        
        // Clean up the text: remove extra whitespace but preserve structure
        const textParts: string[] = [];
        let currentText = '';
        let braceDepth = 0;
        
        for (let i = 0; i < rawText.length; i++) {
            const char = rawText[i];
            
            if (char === '{') {
                if (braceDepth === 0 && currentText.trim()) {
                    textParts.push(currentText.trim());
                    currentText = '';
                }
                braceDepth++;
                currentText += char;
            } else if (char === '}') {
                braceDepth--;
                currentText += char;
                if (braceDepth === 0) {
                    textParts.push(currentText);
                    currentText = '';
                }
            } else {
                currentText += char;
            }
        }
        
        if (currentText.trim()) {
            textParts.push(currentText.trim());
        }
        
        // Reconstruct the full text with placeholders
        const fullText = textParts.join(' ').trim();
        
        // Only extract if it meets criteria and has at least 3 words
        const wordCount = fullText.split(/\s+/).filter(w => /[a-zA-Z]/.test(w)).length;
        
        if (fullText.length >= minLength && 
            wordCount >= 3 &&
            /[a-zA-Z]/.test(fullText) && 
            !isCodeString(fullText)) {
            
            const key = generateKey(fullText);
            strings[key] = fullText;
        }
    }
    
    return content;
}

function isCodeString(str: string): boolean {
    // Skip strings that look like code identifiers, paths, or technical strings
    return (
        /^[a-z_$][a-z0-9_$]*$/i.test(str) || // identifier
        /^[\w-]+\.(js|ts|tsx|jsx|json|css|scss)$/i.test(str) || // filename
        /^@\//.test(str) || // path alias
        /^\w+:/.test(str) || // protocol or CSS property
        /^#[0-9a-f]{3,8}$/i.test(str) || // color hex
        /^\d+(\.\d+)?(px|em|rem|%|vh|vw)$/i.test(str) || // CSS unit
        /^[\w-]+\/[\w-]+/.test(str) // path-like
    );
}

function isCssClass(str: string): boolean {
    // Skip Tailwind/CSS class strings
    return (
        /^[\w-]+([\s]+[\w-]+)*$/.test(str) &&
        (
            str.includes('-') ||
            /^(flex|grid|block|inline|hidden|text|bg|border|rounded|shadow|p|m|w|h|size)/.test(str)
        )
    );
}

function isImportPath(str: string): boolean {
    return str.startsWith('./') || str.startsWith('../') || str.startsWith('@/');
}

function isUrl(str: string): boolean {
    return /^https?:\/\//.test(str);
}

function isOnlyNumbersOrSymbols(str: string): boolean {
    // Skip strings that contain only numbers, symbols, or whitespace (no letters)
    return !/[a-zA-Z]/.test(str);
}

function isGuid(str: string): boolean {
    // Skip GUID/UUID strings (with or without braces/hyphens)
    // Matches patterns like: {c0f864c8-7bbb-422e-98a3-e033d7360c97} or c0f864c8-7bbb-422e-98a3-e033d7360c97
    return /^[{]?[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}[}]?$/i.test(str);
}

/**
 * Check if string is a JavaScript directive or contains template interpolation.
 * Directives are special strings like "use strict", "use client", etc.
 * Interpolations are template literal placeholders like "${varName}".
 * 
 * Note: This does NOT filter strings with {varName} (without $) as those are
 * localization placeholders used in i18n strings within JSX.
 */
function isDirectiveOrInterpolation(str: string): boolean {
    // Check for JavaScript/React directives
    if (/^use\s+(strict|client|server)$/i.test(str)) {
        return true;
    }
    
    // Check for template literal interpolation patterns with $ prefix
    // Matches strings that look like variable interpolations: ${...}
    // This allows {varName} without $ to pass through for i18n placeholders
    if (/\$\{[^}]*\}/.test(str)) {
        return true;
    }
    
    return false;
}

/**
 * Check if string is an SVG path data string.
 * SVG paths contain drawing commands (M, L, C, Q, A, Z, etc.) and coordinates.
 * Examples: "M10 10 L20 20" or "M0,0 L100,100 Z"
 */
function isSvgPath(str: string): boolean {
    // Check for SVG path commands: M, m, L, l, H, h, V, v, C, c, S, s, Q, q, T, t, A, a, Z, z
    // These commands are typically followed by numbers (coordinates)
    const svgPathPattern = /^[MmLlHhVvCcSsQqTtAaZz][\s,\d.-]+/;
    
    // Check if string starts with path commands
    if (svgPathPattern.test(str)) {
        return true;
    }
    
    // Check if string contains multiple path commands (common in complex paths)
    // Pattern: letters followed by numbers, repeated multiple times
    const complexPathPattern = /[MmLlHhVvCcSsQqTtAaZz][\s,\d.-]+[MmLlHhVvCcSsQqTtAaZz]/;
    if (complexPathPattern.test(str)) {
        return true;
    }
    
    // Check if string is predominantly numbers, spaces, commas, and path command letters
    // This catches paths that might not start with a command but are clearly path data
    const pathChars = str.replace(/[MmLlHhVvCcSsQqTtAaZz\s,.\d-]/g, '');
    if (pathChars.length === 0 && /[MmLlHhVvCcSsQqTtAaZz]/.test(str) && /[\d]/.test(str)) {
        return true;
    }
    
    return false;
}

function generateKey(str: string): string {
    // Generate camelCase key from string
    const words = str
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/)
        .filter(w => w.length > 0)
        .slice(0, 5); // max 5 words

    if (words.length === 0) {
        return 'key_' + Math.random().toString(36).substring(2, 9);
    }

    return words
        .map((w, i) => i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1))
        .join('');
}
