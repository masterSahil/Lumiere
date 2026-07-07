const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      callback(path.join(dir, f));
    }
  });
}

let count = 0;
walkDir('./app', function(filePath) {
  if (filePath.endsWith('.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // Replace fixed widths (e.g. w-[400px]) with responsive ones (w-full max-w-[400px])
    content = content.replace(/\bw-\[([3-9]\d{2,}|[1-9]\d{3,})px\]/g, (match, p1) => {
      return `w-full max-w-[${p1}px]`;
    });
    
    // Fix overflow-hidden on table wrappers
    content = content.replace(/className=\"([^\"]*)overflow-hidden([^\"]*)\"([>\s]+)<table/g, 'className=\"$1overflow-x-auto$2\"$3<table');

    if (content !== original) {
      fs.writeFileSync(filePath, content);
      count++;
      console.log('Updated: ' + filePath);
    }
  }
});

// Do the same for components
walkDir('./component', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    content = content.replace(/\bw-\[([3-9]\d{2,}|[1-9]\d{3,})px\]/g, (match, p1) => {
      return `w-full max-w-[${p1}px]`;
    });
    
    content = content.replace(/className=\"([^\"]*)overflow-hidden([^\"]*)\"([>\s]+)<table/g, 'className=\"$1overflow-x-auto$2\"$3<table');

    if (content !== original) {
      fs.writeFileSync(filePath, content);
      count++;
      console.log('Updated: ' + filePath);
    }
  }
});
console.log('Total files updated: ' + count);
