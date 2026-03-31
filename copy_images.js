const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\Asus\\.gemini\\antigravity\\brain\\522fa2b5-4106-43d7-9dab-d440e1441c2d';
const destDir = 'c:\\celestis\\public';

if (!fs.existsSync(destDir)){
    fs.mkdirSync(destDir, { recursive: true });
}

// Map of source file to destination file
const files = {
  'media__1774950926549.jpg': 'dragon.jpg',
  'media__1774950964813.jpg': 'bird_tiger.jpg',
  'media__1774950971870.jpg': 'tortoise.jpg'
};

for (const [srcFile, destFile] of Object.entries(files)) {
  const srcPath = path.join(srcDir, srcFile);
  const destPath = path.join(destDir, destFile);
  
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${srcFile} to ${destFile}`);
  } else {
    console.log(`Source file ${srcPath} does not exist`);
  }
}
