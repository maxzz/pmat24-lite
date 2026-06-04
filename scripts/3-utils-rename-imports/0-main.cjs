/**
 * Date: May 24, 2026
 * Helper script to bulk rename 2-file-mani-atoms to 1-file-mani-atoms by gemini-3.5-flash
 * ```bash
 * node scripts/3-rename-imports/0-main.cjs
 * ```
 */

const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            if (!file.includes('node_modules') && !file.includes('.git') && !file.includes('out') && !file.includes('dist')) {
                results = results.concat(walk(file));
            }
        } else {
            if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.json') || file.endsWith('.json5') || file.endsWith('.md')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('.');
let count = 0;

files.forEach(file => {
    try {
        const content = fs.readFileSync(file, 'utf8');
        if (content.includes('2-file-mani-atoms')) {
            const updated = content.replaceAll('2-file-mani-atoms', '1-file-mani-atoms');
            fs.writeFileSync(file, updated, 'utf8');
            console.log(`Updated: ${file}`);
            count++;
        }
    } catch (e) {
        console.error(`Error reading/writing ${file}:`, e);
    }
});

console.log(`Successfully updated ${count} files.`);
