// Script para corrigir responsividade em todas as páginas
const fs = require('fs');
const path = require('path');

const fixes = [
  // Padrão antigo -> Padrão novo responsivo
  {
    old: 'className="container py-10 space-y-10"',
    new: 'className="container px-4 sm:px-6 lg:px-8 py-8 md:py-10 space-y-8 md:space-y-10"'
  },
  {
    old: 'className="container py-10"',
    new: 'className="container px-4 sm:px-6 lg:px-8 py-8 md:py-10"'
  },
  {
    old: 'className="container py-10 max-w-3xl"',
    new: 'className="container px-4 sm:px-6 lg:px-8 py-8 md:py-10 max-w-3xl"'
  },
  {
    old: 'className="container py-10 max-w-4xl"',
    new: 'className="container px-4 sm:px-6 lg:px-8 py-8 md:py-10 max-w-4xl"'
  },
  {
    old: 'className="text-4xl font-bold tracking-tight',
    new: 'className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight'
  },
  {
    old: 'className="text-3xl font-bold tracking-tight',
    new: 'className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight'
  },
  {
    old: 'className="text-xl text-muted-foreground"',
    new: 'className="text-base sm:text-lg md:text-xl text-muted-foreground"'
  },
  {
    old: 'className="grid gap-6 md:grid-cols-2"',
    new: 'className="grid gap-4 sm:gap-6 md:grid-cols-2"'
  },
  {
    old: 'className="grid gap-8 md:grid-cols-2"',
    new: 'className="grid gap-4 sm:gap-6 md:gap-8 md:grid-cols-2"'
  }
];

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  fixes.forEach(fix => {
    if (content.includes(fix.old)) {
      content = content.replaceAll(fix.old, fix.new);
      modified = true;
    }
  });
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed: ${filePath}`);
    return true;
  }
  return false;
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  let count = 0;
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (!filePath.includes('node_modules') && !filePath.includes('.next')) {
        count += walkDir(filePath);
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      if (fixFile(filePath)) {
        count++;
      }
    }
  });
  
  return count;
}

console.log('🔧 Fixing responsiveness in all pages...\n');
const fixed = walkDir('./app');
console.log(`\n✅ Fixed ${fixed} files!`);
