/**
 * Utility functions for creating placeholder images
 */

/**
 * Creates an SVG data URL for a placeholder
 * 
 * @param width - Width of the image
 * @param height - Height of the image
 * @param text - Text to display on the image
 * @param bgColor - Background color as a hex value
 * @param textColor - Text color as a hex value
 * @returns A data URL containing an SVG placeholder image
 */
export function getSvgPlaceholder(
  width: number = 400,
  height: number = 300,
  text: string = 'Image',
  bgColor: string = '#f3f4f6',
  textColor: string = '#6b7280'
): string {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${bgColor}"/>
      <text 
        x="50%" 
        y="50%" 
        dominant-baseline="middle" 
        text-anchor="middle" 
        font-family="system-ui, -apple-system, sans-serif" 
        font-size="${Math.min(width, height) * 0.1}px" 
        fill="${textColor}"
      >
        ${text}
      </text>
    </svg>
  `;
  
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg.trim())}`;
}

/**
 * Creates a sunset beach scene with camper SVG placeholder
 * similar to the user's profile image
 * 
 * @param width - Width of the image
 * @param height - Height of the image
 * @returns A data URL containing an SVG sunset beach scene
 */
export function getSunsetPlaceholder(
  width: number = 400,
  height: number = 300
): string {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <!-- Sky gradient -->
      <defs>
        <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#94a3b8" />
          <stop offset="40%" stop-color="#fb923c" />
          <stop offset="60%" stop-color="#f97316" />
          <stop offset="80%" stop-color="#ef4444" />
        </linearGradient>
      </defs>
      
      <!-- Background sky -->
      <rect width="100%" height="60%" fill="url(#skyGradient)" />
      
      <!-- Ocean -->
      <rect x="0" y="${height * 0.6}" width="100%" height="${height * 0.4}" fill="#475569" />
      
      <!-- Sun -->
      <circle cx="${width * 0.7}" cy="${height * 0.6}" r="${Math.min(width, height) * 0.1}" fill="#f59e0b" opacity="0.8" />
      
      <!-- Ground/beach -->
      <rect x="0" y="${height * 0.75}" width="100%" height="${height * 0.25}" fill="#78716c" />
      
      <!-- Mountain/cliff on left -->
      <polygon points="0,${height * 0.5} ${width * 0.2},${height * 0.75} 0,${height * 0.75}" fill="#44403c" />
      
      <!-- Camper van -->
      <rect x="${width * 0.15}" y="${height * 0.65}" width="${width * 0.2}" height="${height * 0.15}" rx="5" fill="#e5e5e5" />
      <rect x="${width * 0.15 + width * 0.05}" y="${height * 0.7}" width="${width * 0.1}" height="${height * 0.05}" fill="#64748b" />
      <circle cx="${width * 0.2}" cy="${height * 0.8}" r="${height * 0.03}" fill="#1e293b" />
      <circle cx="${width * 0.3}" cy="${height * 0.8}" r="${height * 0.03}" fill="#1e293b" />
    </svg>
  `;
  
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg.trim())}`;
}

/**
 * Generates a placeholder URL for images
 * Note: Now uses SVG data URLs instead of via.placeholder.com which has become unreliable
 * 
 * @param width - The width of the image in pixels
 * @param height - The height of the image in pixels
 * @param text - Optional text to display on the image
 * @param bgColor - Optional background color (hex value)
 * @param textColor - Optional text color (hex value)
 * @returns A data URL for a SVG placeholder image
 */
export function getPlaceholderImage(
  width: number = 400, 
  height: number = 300, 
  text: string = '', 
  bgColor: string = '#222222', 
  textColor: string = '#ffffff'
): string {
  return getSvgPlaceholder(width, height, text, bgColor, textColor);
}

/**
 * Generates a realistic abstract placeholder
 * 
 * @param width - Width of the image
 * @param height - Height of the image
 * @returns URL string for a SVG placeholder image with abstract pattern
 */
export function getAbstractPlaceholder(width: number = 400, height: number = 300): string {
  const gradientId = `grad-${Math.random().toString(36).substring(2, 9)}`;
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f0f9ff" />
          <stop offset="100%" stop-color="#a5f3fc" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#${gradientId})" />
      <circle cx="${width * 0.2}" cy="${height * 0.3}" r="${Math.min(width, height) * 0.1}" fill="#0ea5e9" opacity="0.6" />
      <circle cx="${width * 0.7}" cy="${height * 0.7}" r="${Math.min(width, height) * 0.15}" fill="#0284c7" opacity="0.4" />
    </svg>
  `;
  
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg.trim())}`;
}

/**
 * Generates a project-specific placeholder with customized appearance
 * 
 * @param projectType - The type of project (e.g. 'web', 'mobile', '3d')
 * @param width - Width of the image
 * @param height - Height of the image
 * @returns Data URL string for a themed placeholder image
 */
export function getProjectPlaceholder(
  projectType: 'web' | 'mobile' | '3d' | 'ai' | 'data', 
  width: number = 400, 
  height: number = 300
): string {
  const themes = {
    web: {
      bg: '#3b82f6',
      text: 'Web Project', 
      color: '#ffffff'
    },
    mobile: {
      bg: '#8b5cf6', 
      text: 'Mobile App', 
      color: '#ffffff'
    },
    '3d': {
      bg: '#22c55e', 
      text: '3D Experience', 
      color: '#ffffff'
    },
    ai: {
      bg: '#ef4444', 
      text: 'AI Solution', 
      color: '#ffffff'
    },
    data: {
      bg: '#f59e0b', 
      text: 'Data Dashboard', 
      color: '#ffffff'
    }
  };
  
  const theme = themes[projectType];
  return getSvgPlaceholder(width, height, theme.text, theme.bg, theme.color);
}

/**
 * Utility function to create image sources for Next.js Image component
 * Returns either a placeholder URL or a path to a local image based on availability
 * 
 * @param imagePath - The path to the actual image (e.g. '/images/projects/my-project.jpg')
 * @returns A URL string to either the real image or a placeholder
 */
export function getImageSrc(imagePath: string): string {
  // In a real application, you might want to check if the image exists
  // Here we're just returning the path, but the placeholder functions are available
  // when needed during development
  
  // Example usage with fallback:
  // if (!imageExists(imagePath)) {
  //   return getProjectPlaceholder('web');
  // }
  
  return imagePath;
} 