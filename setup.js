const fs = require('fs');
const path = require('path');

const directories = [
  'app/about',
  'app/contact',
  'app/projects',
  'components/3d',
  'components/ui',
  'components/sections',
  'components/animations',
  'public/images',
  'public/models',
  'styles'
];

const files = [
  'app/page.tsx',
  'app/layout.tsx',
  'app/about/page.tsx',
  'app/contact/page.tsx',
  'app/projects/page.tsx',
  'components/3d/Scene.tsx',
  'components/3d/Model.tsx',
  'components/ui/Navbar.tsx',
  'components/ui/Footer.tsx',
  'components/ui/Button.tsx',
  'components/sections/Hero.tsx',
  'components/sections/About.tsx',
  'components/sections/Projects.tsx',
  'components/sections/Contact.tsx',
  'components/animations/AnimatedText.tsx',
  'styles/globals.css'
];

// Create directories
directories.forEach(dir => {
  fs.mkdirSync(dir, { recursive: true });
  console.log(`Created directory: ${dir}`);
});

// Create files
files.forEach(file => {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, '');
    console.log(`Created file: ${file}`);
  }
});

console.log('Project structure created successfully!');