# David Podeweltz Portfolio

A modern, responsive, and accessible portfolio website built with Next.js, TypeScript, Tailwind CSS, and Three.js.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js, TypeScript, and Tailwind CSS
- **Responsive Design**: Optimized for all device sizes
- **Dark Mode**: Support for both light and dark themes with system preference detection
- **Accessibility**: WCAG-compliant with keyboard navigation support
- **3D Elements**: Interactive 3D components using Three.js
- **Performance Optimized**: Fast loading times with optimized assets
- **SEO Friendly**: Proper metadata and structured data
- **Clean Code**: Following best practices and coding standards

## 📋 Pages

- **Home**: Introduction and hero section
- **About**: Professional background and skills
- **Projects**: Portfolio of recent work
- **Contact**: Form with validation for inquiries

## 🔧 Technical Details

- Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Framer Motion for animations
- Three.js for 3D components
- Custom hooks and utilities

## 🛠️ Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/davidpodeweltz/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## 🧩 Project Structure

```
├── app/                 # Next.js app router
│   ├── about/           # About page
│   ├── contact/         # Contact page
│   ├── projects/        # Projects page
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── components/          # Reusable components
│   ├── ui/              # UI components (Button, etc.)
│   ├── Scene.tsx        # Three.js scene
│   ├── Model.tsx        # 3D model component
│   ├── ThemeProvider.tsx# Theme context provider
│   └── ThemeToggle.tsx  # Theme toggle button
├── hooks/               # Custom React hooks
│   └── useTheme.ts      # Theme management hook
├── public/              # Static assets
│   └── images/          # Image files
└── utils/               # Utility functions
    ├── placeholder.ts   # Image placeholder utilities
    └── theme.ts         # Theme management utilities
```

## 🎨 Customization

1. **Theming**: Modify the colors in `tailwind.config.js`
2. **Content**: Update personal information in the respective page files
3. **Projects**: Add or modify projects in the `app/projects/page.tsx` file
4. **3D Models**: Replace the models in the `public` directory and update references in `Model.tsx`

## 📱 Responsive Design

The portfolio is built with a mobile-first approach and is fully responsive across:
- Mobile devices
- Tablets
- Desktop screens
- Large displays

## 🌙 Dark Mode

Dark mode can be toggled using the theme switch in the navigation bar. The site also respects the user's system preferences for dark mode.

## ♿ Accessibility

This portfolio follows accessibility best practices:
- Proper semantic HTML
- ARIA attributes where needed
- Keyboard navigation support
- Color contrast compliance
- Screen reader friendly
- Focus management

## 🚀 Deployment

The site is ready to deploy on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdavidpodeweltz%2Fportfolio)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💬 Contact

For any questions or feedback, please reach out to me at david@podeweltz.com.
