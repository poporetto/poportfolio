# poportfolio
poporetto's portfolio

A modern, responsive UX/UI designer portfolio website built with semantic HTML, CSS, and Bootstrap 5.

## Features

- ✅ Responsive design (mobile-friendly)
- ✅ Semantic HTML structure
- ✅ Bootstrap 5 integration
- ✅ Orange-yellow color theme
- ✅ 6 project thumbnails linking to Figma
- ✅ 8 client logo showcase section
- ✅ Working contact form (Formspree integration)
- ✅ GSAP animation ready
- ✅ Hero section with illustration placeholder

## Setup Instructions

### Contact Form Setup

The contact form uses Formspree for form submissions. To enable it:

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form and copy your form ID
3. Open `index.html` and find the contact form
4. Replace `YOUR_FORM_ID` in the form action attribute with your Formspree form ID:
   ```html
   <form class="contact-form" id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

### Adding Client Logos

1. Add your client logo images to the `images/clients/` directory
2. Name them as `client-1.png`, `client-2.png`, etc. (up to `client-8.png`)
3. Recommended size: 150x150px to 300x300px
4. Format: PNG (with transparency) or SVG works best
5. If an image is missing, a placeholder will be displayed automatically

### Adding Your Hero Illustration

Replace the SVG placeholder in the hero section with your own illustration. The placeholder is located in the `.hero-illustration` div.

### Customizing Project Links

Update the Figma links in the project cards by modifying the `href` attributes in each project card.

## File Structure

```
poportfolio/
├── index.html          # Main HTML file
├── styles.css          # Custom CSS styles
├── script.js           # JavaScript functionality
├── images/
│   └── clients/       # Client logo images
└── README.md           # This file
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

See LICENSE file for details.
