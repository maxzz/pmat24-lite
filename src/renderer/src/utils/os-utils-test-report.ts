// Test report generator for getFilenameAndExt()
import { getFilenameAndExt } from './os-utils';

interface TestCase {
    description: string;
    input: string;
    expected: [string, string];
}

// ANSI color codes
const colors = {
    reset: '\x1b[0m',
    blue: '\x1b[34m',
    yellow: '\x1b[33m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    gray: '\x1b[90m',
    bold: '\x1b[1m',
};

const testCases: TestCase[] = [
    // Basic filename tests
    { description: 'Simple filename with extension', input: 'file.txt', expected: ['file', 'txt'] },
    { description: 'Filename with multiple dots', input: 'file.test.ts', expected: ['file.test', 'ts'] },
    { description: 'Filename without extension', input: 'README', expected: ['', 'README'] },
    { description: 'Hidden file with dot prefix', input: '.gitignore', expected: ['', 'gitignore'] },
    { description: 'Hidden file with extension', input: '.env.local', expected: ['.env', 'local'] },
    { description: 'Empty string', input: '', expected: ['', ''] },
    { description: 'Filename with many dots', input: 'my.file.name.here.txt', expected: ['my.file.name.here', 'txt'] },
    { description: 'Single dot', input: '.', expected: ['', ''] },
    { description: 'Filename with trailing dot', input: 'file.', expected: ['file', ''] },
    { description: 'Double extension', input: 'archive.tar.gz', expected: ['archive.tar', 'gz'] },
    { description: 'Filename with dots in name', input: 'my.document.v2.docx', expected: ['my.document.v2', 'docx'] },
    { description: 'Filename with no name only ext', input: '.txt', expected: ['', 'txt'] },
    { description: 'Complex filename', input: 'file-name_v1.0.final.pdf', expected: ['file-name_v1.0.final', 'pdf'] },
    { description: 'Filename with special chars', input: 'my-file_name (1).txt', expected: ['my-file_name (1)', 'txt'] },
    { description: 'Very long extension', input: 'file.extension', expected: ['file', 'extension'] },
    { description: 'Multiple consecutive dots', input: 'file..txt', expected: ['file.', 'txt'] },
    { description: 'Filename starting with dots', input: '..config', expected: ['.', 'config'] },
    { description: 'Numeric filename with ext', input: '12345.txt', expected: ['12345', 'txt'] },
    { description: 'Filename with uppercase ext', input: 'document.PDF', expected: ['document', 'PDF'] },
    { description: 'Filename with spaces and ext', input: 'my file.txt', expected: ['my file', 'txt'] },
    
    // Path-based tests
    { description: 'Unix absolute path', input: '/home/user/documents/file.txt', expected: ['/home/user/documents/file', 'txt'] },
    { description: 'Windows absolute path', input: 'C:\\Users\\Documents\\file.txt', expected: ['C:\\Users\\Documents\\file', 'txt'] },
    { description: 'Relative path with extension', input: './documents/file.txt', expected: ['./documents/file', 'txt'] },
    { description: 'Path with dots in folders (limitation)', input: '/folder.name/sub.folder/file.txt', expected: ['/folder.name/sub.folder/file', 'txt'] },
    { description: 'Windows path with dots (limitation)', input: 'C:\\My.Documents\\project.v2\\readme.md', expected: ['C:\\My.Documents\\project.v2\\readme', 'md'] },
    { description: 'Unix path with hidden file', input: '/home/user/.gitignore', expected: ['/home/user/', 'gitignore'] },
    { description: 'Windows path no extension', input: 'C:\\Users\\Documents\\README', expected: ['', 'C:\\Users\\Documents\\README'] },
    { description: 'Deep nested Unix path', input: '/var/www/html/public/assets/images/logo.png', expected: ['/var/www/html/public/assets/images/logo', 'png'] },
    { description: 'Windows UNC path', input: '\\\\server\\share\\folder\\document.docx', expected: ['\\\\server\\share\\folder\\document', 'docx'] },
    { description: 'Path with mixed slashes', input: 'C:/Users\\Documents/file.txt', expected: ['C:/Users\\Documents/file', 'txt'] },
    { description: 'Path with double extension', input: '/backup/archive.tar.gz', expected: ['/backup/archive.tar', 'gz'] },
    { description: 'Windows path with spaces', input: 'C:\\Program Files\\My App\\config.json', expected: ['C:\\Program Files\\My App\\config', 'json'] },
];

function runTests() {
    console.log('\n' + colors.gray + '='.repeat(120) + colors.reset);
    console.log(colors.bold + 'getFilenameAndExt() Test Report' + colors.reset);
    console.log(colors.gray + '='.repeat(120) + colors.reset);
    console.log();

    let passed = 0;
    let failed = 0;

    testCases.forEach((testCase, index) => {
        const actual = getFilenameAndExt(testCase.input);
        const isPass = JSON.stringify(actual) === JSON.stringify(testCase.expected);
        
        if (isPass) {
            passed++;
        } else {
            failed++;
        }

        const status = isPass ? colors.green + '✓' : colors.red + '✗';
        const statusIcon = isPass ? '' : '⚠️  ';
        
        console.log(`${statusIcon}${status}${colors.reset} Test ${colors.gray}${(index + 1).toString().padStart(2)}${colors.reset}: ${testCase.description}`);
        console.log(`   Input:    ${colors.blue} "${testCase.input}"${colors.reset}`);
        console.log(`   Result:   ${colors.yellow}[${actual[0] ? `"${actual[0]}"` : '""'}, ${actual[1] ? `"${actual[1]}"` : '""'}]${colors.reset}`);
        
        if (!isPass) {
            console.log(`   Expected: ${colors.red}[${testCase.expected[0] ? `"${testCase.expected[0]}"` : '""'}, ${testCase.expected[1] ? `"${testCase.expected[1]}"` : '""'}]${colors.reset}`);
        }
        
        console.log();
    });

    console.log(colors.gray + '='.repeat(120) + colors.reset);
    console.log(`Summary: ${colors.green}${passed} passed${colors.reset}, ${failed > 0 ? colors.red : colors.green}${failed} failed${colors.reset}, ${testCases.length} total`);
    console.log(colors.gray + '='.repeat(120) + colors.reset);
    console.log();
}

runTests();

