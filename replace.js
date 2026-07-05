import fs from 'fs';
import path from 'path';

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? 
      walkDir(dirPath, callback) : callback(dirPath);
  });
}

function camelCaseToPascal(str) {
  return str.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
}

const customMap = {
  'receipt_long': 'Receipt',
  'restaurant': 'Utensils',
  'account_balance_wallet': 'Wallet',
  'local_shipping': 'Truck',
  'person': 'User',
  'location_on': 'MapPin',
  'payments': 'CreditCard',
  'psychiatry': 'Brain',
  'palette': 'Palette',
  'volunteer_activism': 'HeartHandshake',
  'calendar_month': 'CalendarDays',
  'expand_more': 'ChevronDown',
  'call': 'Phone',
  'mail': 'Mail',
  'event_busy': 'CalendarX',
  'public': 'Globe',
  'share': 'Share2',
  'check_circle': 'CheckCircle',
  'shopping_bag': 'ShoppingBag',
  'search': 'Search',
  'remove': 'Minus',
  'add': 'Plus',
  'delete': 'Trash2',
  'schedule': 'Clock',
  'verified_user': 'ShieldCheck',
  'notifications': 'Bell',
  'settings': 'Settings',
  'add_circle': 'PlusCircle',
  'chevron_right': 'ChevronRight',
  'star': 'Star',
  'menu': 'Menu',
  'shopping_cart': 'ShoppingCart',
  'check': 'Check',
  'lock': 'Lock',
  'credit_card': 'CreditCard',
  'receipt': 'ReceiptText'
};

walkDir('./app', processFile);
walkDir('./component', processFile);

function processFile(filePath) {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.jsx')) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  
  let importedIcons = new Set();
  
  // Replace <span className="material-symbols-outlined...">icon_name</span>
  let regex = /<span\s+([^>]*)className="[^"]*material-symbols-outlined[^"]*"([^>]*)>\s*([a-z_]+)\s*<\/span>/g;
  content = content.replace(regex, (match, beforeClass, afterClass, iconName) => {
    let lucideName = customMap[iconName] || camelCaseToPascal(iconName);
    importedIcons.add(lucideName);
    
    let classMatch = match.match(/className="([^"]+)"/);
    let classes = classMatch ? classMatch[1].replace('material-symbols-outlined', '').trim() : '';
    
    let props = beforeClass.trim() + " " + afterClass.trim();
    return `<${lucideName} ${props} className="${classes}" />`.replace(/\s+/g, ' ').replace(' >', '>');
  });

  // Replace react-icons imports with lucide-react (if it's Lu... just remove Lu)
  let reactIconRegex = /import\s+\{([^}]+)\}\s+from\s+['"]react-icons\/lu['"];?/g;
  content = content.replace(reactIconRegex, (match, icons) => {
    let names = icons.split(',').map(n => n.trim());
    names.forEach(n => {
      let lName = n.replace(/^Lu/, '');
      importedIcons.add(lName);
    });
    return ''; 
  });

  // Replace <LuChefHat /> with <ChefHat />
  content = content.replace(/<Lu([A-Z][a-zA-Z0-9_]*)/g, (match, p1) => {
    importedIcons.add(p1);
    return `<${p1}`;
  });

  // Remove other react-icons that we will manually fix or don't need
  let otherReactIconRegex = /import\s+\{([^}]+)\}\s+from\s+['"]react-icons\/[a-z]{2}['"];?/g;
  content = content.replace(otherReactIconRegex, (match, icons) => {
    return ''; 
  });

  if (importedIcons.size > 0 && content !== original) {
    let importStr = `import { ${Array.from(importedIcons).join(', ')} } from 'lucide-react';\n`;
    
    if (content.includes("'use client'")) {
      content = content.replace("'use client'", "'use client'\n" + importStr);
    } else if (content.includes('"use client"')) {
      content = content.replace('"use client"', '"use client"\n' + importStr);
    } else {
      content = importStr + content;
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}
