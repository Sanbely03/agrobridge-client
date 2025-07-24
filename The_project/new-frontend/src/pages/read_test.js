const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'shared', 'Header.tsx');

console.log(`Attempting to read file: ${filePath}`);

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  console.log('File read successfully!');
  // console.log('File content (first 100 chars):', data.substring(0, 100)); // Optional: show content
});