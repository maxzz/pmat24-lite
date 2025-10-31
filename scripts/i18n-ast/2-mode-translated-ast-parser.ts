import * as ts from "typescript";
import { type Config } from "./7-config-types";

/**
 * Collect already-translated strings from t() and dt() function calls.
 * This function parses the code and extracts string arguments from:
 * - t(key) or t('literal string')
 * - dt(key) or dt('literal string')
 */
export function collectTranslatedStrings(filePath: string, sourceCode: string, config: Config): Record<string, string> {
    const strings: Record<string, string> = {};

    const sourceFile = ts.createSourceFile(
        filePath,
        sourceCode,
        ts.ScriptTarget.Latest,
        true,
        filePath.endsWith('.tsx') || filePath.endsWith('.jsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS
    );

    function visit(node: ts.Node) {
        // Look for call expressions like t('string') or dt('string')
        if (ts.isCallExpression(node)) {
            const { expression, arguments: args } = node;

            // Check if it's a call to t() or dt()
            if (ts.isIdentifier(expression) && (expression.text === 't' || expression.text === 'dt')) {
                // Extract the first argument if it's a string literal
                if (args.length > 0 && (ts.isStringLiteral(args[0]) || ts.isNoSubstitutionTemplateLiteral(args[0]))) {
                    const text = args[0].text;
                    if (text.length >= config.minStringLength) {
                        const key = generateKey(text);
                        strings[key] = text;
                    }
                }
            }
        }

        ts.forEachChild(node, visit);
    }

    visit(sourceFile);
    return strings;
}

function generateKey(text: string): string {
    // Simple key generation - use the first 50 chars, normalized
    return text.substring(0, 50).replace(/\s+/g, ' ').trim();
}
