import * as ts from 'typescript';

/**
 * Extract localizable strings from TypeScript/JavaScript source code using AST.
 * This function parses the code and extracts:
 * - String literals that appear to be user-facing
 * - JSX text content with placeholders
 * While filtering out:
 * - Import/export paths
 * - Console statements
 * - CSS class names
 * - Technical strings (GUIDs, URLs, etc.)
 */
export function extractStringsFromAST(
    filePath: string,
    sourceCode: string,
    minLength: number,
    classNameSuffix: string,
    classNameFunctions: string[]
): Record<string, string> {
    const strings: Record<string, string> = {};
    const sourceFile = ts.createSourceFile(
        filePath,
        sourceCode,
        ts.ScriptTarget.Latest,
        true,
        filePath.endsWith('.tsx') || filePath.endsWith('.jsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS
    );

    function visit(node: ts.Node) {
        // Extract string literals
        if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
            const text = node.text;
            
            if (shouldExtractString(text, minLength, node)) {
                const key = generateKey(text);
                strings[key] = text;
            }
        }

        // Extract template literals with placeholders (e.g., `text ${variable}`)
        if (ts.isTemplateExpression(node)) {
            const reconstructedText = reconstructTemplateExpression(node);
            if (reconstructedText && shouldExtractString(reconstructedText, minLength, node)) {
                const key = generateKey(reconstructedText);
                strings[key] = reconstructedText;
            }
            
            // Also recursively visit expressions inside template spans
            // to extract string literals from ternary operators, etc.
            for (const span of node.templateSpans) {
                visit(span.expression);
            }
        }

        // Extract JSX text with placeholders
        if (ts.isJsxText(node)) {
            const text = node.text.trim();
            
            // Check if parent has JSX expressions (placeholders)
            const parent = node.parent;
            const hasPlaceholders = parent && ts.isJsxElement(parent) && parent.children.some(child => 
                ts.isJsxExpression(child)
            );
            
            if (hasPlaceholders && parent && ts.isJsxElement(parent) && text.length >= minLength && /[a-zA-Z]/.test(text)) {
                // Reconstruct the full text with placeholders
                const fullText = reconstructJSXText(parent);
                if (fullText && shouldExtractJSXText(fullText, minLength)) {
                    const key = generateKey(fullText);
                    strings[key] = fullText;
                }
            } else if (text.length >= minLength && /[a-zA-Z]/.test(text)) {
                // Plain JSX text without placeholders
                const wordCount = text.split(/\s+/).filter(w => /[a-zA-Z]/.test(w)).length;
                if (wordCount >= 2) {
                    const key = generateKey(text);
                    strings[key] = text;
                }
            }
        }

        ts.forEachChild(node, visit);
    }

    function shouldExtractString(text: string, minLength: number, node: ts.Node): boolean {
        // Use a lower minimum length for strings inside template expressions
        // (e.g., ternary operators like `${condition ? 'text' : 'password'}`)
        const effectiveMinLength = isInsideTemplateExpression(node) ? 3 : minLength;
        
        if (text.length < effectiveMinLength) return false;
        if (!(/[a-zA-Z]/.test(text))) return false;

        // Check if it's in an import/export statement
        if (isInImportExport(node)) return false;

        // Check if it's in a console statement
        if (isInConsoleStatement(node)) return false;

        // Check if it's in a className function call
        if (isInClassNameFunction(node)) return false;

        // Check if it's in a querySelector/querySelectorAll call
        if (isInQuerySelectorCall(node)) return false;

        // Check if it's in a translation function call (t(), dt())
        if (isInTranslationFunction(node)) return false;

        // Check if it's a className or variable ending with classNameSuffix
        if (isClassName(node, classNameSuffix)) return false;

        // Filter out technical strings
        if (isCodeString(text)) return false;
        if (isSingleWordCamelCase(text)) return false;
        if (isCssClass(text)) return false;
        if (isImportPath(text)) return false;
        if (isUrl(text)) return false;
        if (isGuid(text)) return false;
        if (isSvgPath(text)) return false;
        if (isDirective(text)) return false;

        return true;
    }

    function isInsideTemplateExpression(node: ts.Node): boolean {
        let current: ts.Node | undefined = node.parent;
        while (current) {
            if (ts.isTemplateSpan(current) || ts.isTemplateExpression(current)) {
                return true;
            }
            current = current.parent;
        }
        return false;
    }

    function isInImportExport(node: ts.Node): boolean {
        let current: ts.Node | undefined = node;
        while (current) {
            if (
                ts.isImportDeclaration(current) ||
                ts.isExportDeclaration(current) ||
                ts.isImportEqualsDeclaration(current) ||
                ts.isExportAssignment(current)
            ) {
                return true;
            }
            current = current.parent;
        }
        return false;
    }

    function isInConsoleStatement(node: ts.Node): boolean {
        let current: ts.Node | undefined = node.parent;
        while (current) {
            if (ts.isCallExpression(current)) {
                const expr = current.expression;
                if (ts.isPropertyAccessExpression(expr)) {
                    const obj = expr.expression;
                    const prop = expr.name.text;
                    if (
                        ts.isIdentifier(obj) &&
                        obj.text === 'console' &&
                        ['log', 'warn', 'error', 'debug', 'info', 'group', 'groupCollapsed'].includes(prop)
                    ) {
                        return true;
                    }
                }
            }
            current = current.parent;
        }
        return false;
    }

    function isInClassNameFunction(node: ts.Node): boolean {
        let current: ts.Node | undefined = node.parent;
        while (current) {
            if (ts.isCallExpression(current)) {
                const expr = current.expression;
                // Check for direct function call like classNames() or cn()
                if (ts.isIdentifier(expr) && classNameFunctions.includes(expr.text)) {
                    return true;
                }
            }
            current = current.parent;
        }
        return false;
    }

    function isInQuerySelectorCall(node: ts.Node): boolean {
        let current: ts.Node | undefined = node.parent;
        while (current) {
            if (ts.isCallExpression(current)) {
                const expr = current.expression;
                if (ts.isPropertyAccessExpression(expr)) {
                    const prop = expr.name.text;
                    // Check for querySelector, querySelectorAll, closest, matches, etc.
                    if (['querySelector', 'querySelectorAll', 'closest', 'matches'].includes(prop)) {
                        return true;
                    }
                }
            }
            current = current.parent;
        }
        return false;
    }

    function isInTranslationFunction(node: ts.Node): boolean {
        let current: ts.Node | undefined = node.parent;
        while (current) {
            if (ts.isCallExpression(current)) {
                const expr = current.expression;
                // Check for direct function call like t() or dt()
                if (ts.isIdentifier(expr) && ['t', 'dt'].includes(expr.text)) {
                    return true;
                }
            }
            current = current.parent;
        }
        return false;
    }

    function isSingleWordCamelCase(text: string): boolean {
        // Skip if contains spaces or is empty
        if (!text || text.includes(' ')) {
            return false;
        }
        
        // Check if it's camelCase: starts with lowercase, contains at least one uppercase
        // Pattern: starts with lowercase letter, followed by letters/digits, with at least one uppercase
        const camelCasePattern = /^[a-z][a-zA-Z0-9]*$/;
        const hasUpperCase = /[A-Z]/.test(text);
        
        return camelCasePattern.test(text) && hasUpperCase;
    }

    function isClassName(node: ts.Node, suffix: string): boolean {
        const parent = node.parent;

        // Check for className attribute in JSX
        if (parent && ts.isJsxAttribute(parent)) {
            const attrName = parent.name;
            if (ts.isIdentifier(attrName) && attrName.text === 'className') {
                return true;
            }
        }

        // Check for variable assignment with suffix
        if (parent && ts.isVariableDeclaration(parent)) {
            const name = parent.name;
            if (ts.isIdentifier(name) && name.text.endsWith(suffix)) {
                return true;
            }
        }

        // Check if string is in an object property ending with suffix
        // e.g., { circleClasses: "...", borderClasses: "..." }
        if (parent && ts.isPropertyAssignment(parent)) {
            const propName = parent.name;
            if (ts.isIdentifier(propName) && propName.text.endsWith(suffix)) {
                return true;
            }
        }

        // Check if string is inside an object literal assigned to a variable ending with suffix
        // e.g., const stepClasses = { complete: { circleClasses: "..." } }
        let current: ts.Node | undefined = node;
        while (current) {
            if (ts.isVariableDeclaration(current)) {
                const varName = current.name;
                if (ts.isIdentifier(varName) && varName.text.endsWith(suffix)) {
                    return true;
                }
            }
            current = current.parent;
        }

        return false;
    }

    function reconstructJSXText(element: ts.JsxElement): string | null {
        const parts: string[] = [];
        
        for (const child of element.children) {
            if (ts.isJsxText(child)) {
                const text = child.text.trim();
                if (text) parts.push(text);
            } else if (ts.isJsxExpression(child)) {
                // Extract placeholder name
                const expr = child.expression;
                if (expr && ts.isIdentifier(expr)) {
                    parts.push(`{${expr.text}}`);
                } else if (expr && ts.isPropertyAccessExpression(expr)) {
                    parts.push(`{${expr.getText()}}`);
                } else {
                    // Generic placeholder
                    parts.push('{...}');
                }
            }
        }
        
        const result = parts.join(' ').replace(/\s+/g, ' ').trim();
        return result || null;
    }

    function reconstructTemplateExpression(template: ts.TemplateExpression): string | null {
        const parts: string[] = [];
        const textParts: string[] = []; // Collect only the literal text parts (no placeholders)
        
        // Add the head part (text before first ${...})
        if (template.head.text) {
            parts.push(template.head.text);
            textParts.push(template.head.text);
        }
        
        // Process template spans (${expr}text pairs)
        for (const span of template.templateSpans) {
            // Add placeholder for the expression
            const expr = span.expression;
            if (ts.isIdentifier(expr)) {
                parts.push(`\${${expr.text}}`);
            } else if (ts.isPropertyAccessExpression(expr)) {
                parts.push(`\${${expr.getText()}}`);
            } else {
                // Generic placeholder for complex expressions
                parts.push('${...}');
            }
            
            // Add the literal text after the expression
            if (span.literal.text) {
                parts.push(span.literal.text);
                textParts.push(span.literal.text);
            }
        }
        
        // Skip template literals that contain ONLY placeholders (e.g., `${item.id}`)
        // These are used for type conversion, not localization
        if (textParts.length === 0) {
            return null;
        }
        
        // Skip templates where the text is just punctuation/separators (e.g., `${x}-${y}`, `${a}/${b}`)
        // Join all text parts and check if they contain any letters/words
        const combinedText = textParts.join('');
        const hasLetters = /[a-zA-Z]/.test(combinedText);
        const hasWords = combinedText.trim().length > 0 && /\w{2,}/.test(combinedText); // At least one word with 2+ chars
        
        if (!hasLetters || !hasWords) {
            return null;
        }
        
        const result = parts.join('');
        return result || null;
    }

    function shouldExtractJSXText(text: string, minLength: number): boolean {
        if (text.length < minLength) return false;
        
        const wordCount = text.split(/\s+/).filter(w => /[a-zA-Z]/.test(w)).length;
        if (wordCount < 3) return false;
        
        // Skip if it looks like code
        if (text.includes('return') || text.includes('=>') || 
            text.includes('const ') || text.includes('function')) {
            return false;
        }
        
        return true;
    }

    visit(sourceFile);
    return strings;
}

// Filter functions

function isCodeString(str: string): boolean {
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

function isGuid(str: string): boolean {
    return /^[{]?[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}[}]?$/i.test(str);
}

function isSvgPath(str: string): boolean {
    // SVG paths must start with a command letter
    const svgPathPattern = /^[MmLlHhVvCcSsQqTtAaZz][\s,\d.-]+/;
    if (!svgPathPattern.test(str)) return false;
    
    // Check if string has a high ratio of digits to letters
    // SVG paths should have many more digits than letters
    const digits = (str.match(/\d/g) || []).length;
    const letters = (str.match(/[a-zA-Z]/g) || []).length;
    
    // SVG path should have at least 3 digits and more digits than letters
    if (digits < 3) return false;
    if (digits <= letters) return false;
    
    // Check that remaining characters after removing SVG path chars are minimal
    const pathChars = str.replace(/[MmLlHhVvCcSsQqTtAaZz\s,.\d-]/g, '');
    if (pathChars.length > 2) return false; // Allow a couple of unexpected chars
    
    return true;
}

function isDirective(str: string): boolean {
    return /^use\s+(strict|client|server)$/i.test(str);
}

function generateKey(str: string): string {
    const words = str
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/)
        .filter(w => w.length > 0)
        .slice(0, 5);

    if (words.length === 0) {
        return 'key_' + Math.random().toString(36).substring(2, 9);
    }

    return words
        .map((w, i) => i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1))
        .join('');
}
