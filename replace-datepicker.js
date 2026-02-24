const fs = require('fs');
const glob = require('glob');

const files = glob.sync('packages/esm-clinic-dashboard/src/app/**/*.html');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('date-time-picker')) {
    // We want to replace `<date-time-picker ... [modelValue]="X" ... (onDateChange)="Y($event)" ...></date-time-picker>`
    // using a regex that handles multiline
    content = content.replace(/<date-time-picker[^>]*>/g, (match) => {
      let modelValue = '';
      let onDateChange = '';
      let id = '';
      
      const modelMatch = match.match(/\[modelValue\]="([^"]+)"/);
      if (modelMatch) modelValue = modelMatch[1];
      
      const changeMatch = match.match(/\(onDateChange\)="([^"]+)"/);
      if (changeMatch) onDateChange = changeMatch[1];
      
      const idMatch = match.match(/id="([^"]+)"/);
      if (idMatch) id = idMatch[1];
      
      return `<input type="date" class="form-control" [ngModel]="${modelValue} | date:'yyyy-MM-dd'" (ngModelChange)="${onDateChange}" ${id ? `id="${id}"` : ''}>`;
    });
    
    content = content.replace(/<\/date-time-picker>/g, '');
    
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});
