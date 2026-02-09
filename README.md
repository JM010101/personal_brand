# Personal Brand Website

A premium, conversion-focused personal brand website built with HTML, CSS, and JavaScript. Designed for speakers, authors, and thought leaders to establish authority, support speaking inquiries, and scale with their brand.

## Features

- **Multi-page Structure**: Six comprehensive pages covering all aspects of a personal brand
- **Responsive Design**: Mobile-first approach with breakpoints for all device sizes
- **SEO Optimized**: Meta tags, Open Graph tags, structured data (JSON-LD), and sitemap
- **Accessibility**: WCAG 2.1 AA compliant with ARIA labels, keyboard navigation, and screen reader support
- **Performance**: Lazy loading, optimized CSS, and efficient JavaScript
- **Conversion Focused**: Clear CTAs, social proof, and strategic layout for maximum impact
- **Modern Design**: Clean, professional aesthetic with smooth animations and transitions

## Project Structure

```
brand/
├── index.html              # Home/Landing page
├── about.html              # About/Bio page
├── speaking.html           # Speaking/Keynotes page
├── services.html           # Services/Offerings page
├── testimonials.html       # Testimonials/Reviews page
├── contact.html            # Contact/Inquiry form page
├── css/
│   ├── main.css           # Main stylesheet
│   ├── responsive.css     # Responsive breakpoints
│   └── utilities.css      # Utility classes
├── js/
│   ├── main.js            # Main JavaScript functionality
│   ├── form-handler.js    # Contact form handling
│   └── navigation.js      # Navigation and smooth scrolling
├── assets/
│   ├── images/            # Image assets
│   └── icons/             # Icon assets
├── robots.txt             # Search engine directives
├── sitemap.xml            # XML sitemap for SEO
└── README.md              # Project documentation
```

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, for development)

### Installation

1. Clone or download this repository
2. Open the project folder in your code editor
3. For local development, you can use a simple HTTP server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (with http-server)
   npx http-server
   
   # PHP
   php -S localhost:8000
   ```
4. Open `http://localhost:8000` in your browser

### Direct File Access

You can also open the HTML files directly in your browser, though some features (like form submission) may require a server.

## Customization Guide

### Changing Brand Name

1. Replace "John Smith" throughout all HTML files:
   - Search and replace in all `.html` files
   - Update meta tags (title, description, Open Graph)
   - Update structured data (JSON-LD)

### Updating Colors

Edit CSS variables in `css/main.css`:

```css
:root {
    --color-primary: #2563eb;      /* Primary brand color */
    --color-primary-dark: #1e40af;  /* Darker shade */
    --color-primary-light: #3b82f6; /* Lighter shade */
    --color-secondary: #64748b;     /* Secondary color */
    --color-accent: #f59e0b;        /* Accent color */
    /* ... more colors */
}
```

### Adding Content

1. **Home Page** (`index.html`): Update hero section, value propositions, and featured content
2. **About Page** (`about.html`): Add personal story, credentials, and mission
3. **Speaking Page** (`speaking.html`): List speaking topics and past events
4. **Services Page** (`services.html`): Describe service offerings
5. **Testimonials Page** (`testimonials.html`): Add client testimonials and case studies
6. **Contact Page** (`contact.html`): Update contact information and form

### Adding Images

1. Place images in `assets/images/` directory
2. Update image `src` attributes in HTML files
3. Ensure all images have descriptive `alt` text for accessibility
4. Optimize images for web (recommended: WebP format, compressed)

### Form Submission

The contact form currently uses a placeholder submission handler. To enable actual form submission:

1. Open `js/form-handler.js`
2. Replace the `simulateFormSubmission` function with your API endpoint:
   ```javascript
   async function submitForm(data) {
       const response = await fetch('/api/contact', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
           },
           body: JSON.stringify(data)
       });
       return response.json();
   }
   ```

### SEO Configuration

1. **Update URLs**: Replace `https://www.example.com` in:
   - `sitemap.xml`
   - `robots.txt`
   - All HTML meta tags (Open Graph, Twitter Cards)

2. **Update Meta Descriptions**: Customize meta descriptions in each HTML file's `<head>` section

3. **Structured Data**: Update JSON-LD structured data in each page's `<head>` section with your actual information

### Analytics

To add analytics tracking:

1. Open `js/main.js`
2. Replace the `initAnalytics` function with your analytics code (Google Analytics, etc.)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimization

- Images are lazy-loaded for better performance
- CSS is organized and optimized
- JavaScript is modular and efficient
- Minimal dependencies (pure HTML/CSS/JS)

## Accessibility Features

- Semantic HTML5 structure
- ARIA labels and roles
- Keyboard navigation support
- Skip navigation links
- Focus indicators
- Screen reader compatibility
- Color contrast compliance (WCAG AA)
- Reduced motion support

## Responsive Breakpoints

- **Mobile**: 320px - 768px
- **Tablet**: 769px - 1024px
- **Desktop**: 1025px+

## File Descriptions

### HTML Files

- **index.html**: Homepage with hero section, value proposition, and featured content
- **about.html**: Personal bio, credentials, and mission statement
- **speaking.html**: Speaking topics, past events, and booking information
- **services.html**: Service offerings and packages
- **testimonials.html**: Client testimonials, logos, and case studies
- **contact.html**: Contact form and contact information

### CSS Files

- **main.css**: Core styles, typography, layout, and components
- **responsive.css**: Media queries and mobile optimizations
- **utilities.css**: Utility classes for spacing, typography, and layout

### JavaScript Files

- **main.js**: Core functionality, lazy loading, scroll animations, and analytics
- **navigation.js**: Mobile menu toggle, smooth scrolling, and active state management
- **form-handler.js**: Form validation, error handling, and submission logic

## Development Notes

- Uses CSS custom properties (variables) for easy theming
- Mobile-first responsive design approach
- Vanilla JavaScript (no frameworks) for performance
- Modular JavaScript with IIFE pattern
- Intersection Observer API for scroll animations and lazy loading

## Future Enhancements

- Backend integration for form submissions
- Blog functionality
- Event calendar integration
- Video gallery
- Newsletter signup
- Social media feed integration
- Multi-language support

## License

This project is provided as-is for personal and commercial use.

## Support

For questions or issues, please refer to the code comments or documentation within each file.

## Credits

Built with modern web standards and best practices for performance, accessibility, and SEO.
