const fs = require('fs');

try {
    const content = fs.readFileSync('src/types.ts', 'utf8');
    // Find where export const MOCK_PHONES starts
    const index = content.indexOf('export const MOCK_PHONES');
    if (index !== -1) {
        const newContent = content.substring(0, index) + "export { MOCK_PHONES } from './data';\n";
        fs.writeFileSync('src/types.ts', newContent);
        console.log('Successfully updated src/types.ts');
    } else {
        console.log('MOCK_PHONES not found in src/types.ts');
    }
} catch (e) {
    console.error(e);
}
