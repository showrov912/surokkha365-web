const fs = require('fs');
const path = 'd:/antigravity/surokkha365/web/src/context/WebsiteContext.tsx';
let code = fs.readFileSync(path, 'utf8');

const dbData = require('./all_debug.json');

// We need to inject dbData as the defaultState.
// We must make sure it matches the TypeScript types.
// The types require blogsData to be BlogData[], etc.

// Let's find the start and end of defaultState
const startIndex = code.indexOf('const defaultState: WebsiteContextType = {');
if (startIndex === -1) {
  // Try another signature
  const altStartIndex = code.indexOf('const defaultState = {');
  if (altStartIndex === -1) {
    console.error("Could not find defaultState definition");
    process.exit(1);
  }
}

// We will replace defaultState with the JSON data, except we have to cast some things or just let it infer.
// Because it's TypeScript, we'll format it as a valid TS object.
const newStateString = 'const defaultState = ' + JSON.stringify(dbData, null, 2) + ' as any;';

// Regex to replace the whole `const defaultState = { ... };` block.
// It's tricky to regex match a huge nested block, so we'll do it by counting braces.

let start = code.indexOf('const defaultState');
let braceStart = code.indexOf('{', start);
let braceCount = 1;
let end = braceStart + 1;

while(braceCount > 0 && end < code.length) {
  if (code[end] === '{') braceCount++;
  if (code[end] === '}') braceCount--;
  end++;
}

// if there is a trailing semicolon or ` as any;`, let's just replace up to the brace.
const newCode = code.substring(0, start) + newStateString + code.substring(end + (code[end] === ';' ? 1 : 0));

fs.writeFileSync(path, newCode);
console.log("Successfully replaced defaultState.");
