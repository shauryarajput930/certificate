# Certificate Portfolio

A stunning cyberpunk-themed certificate portfolio website showcasing technical certifications and achievements.

## 🎯 Features

### Visual Design
- **Cyberpunk Theme**: Futuristic design with neon purple accents and matrix rain effects
- **3D Animations**: Interactive certificate cards with perspective transforms
- **Custom Cursor**: Animated cursor with trail effects and click animations
- **Particle System**: Floating particles for visual depth
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Certificate Management
- **11 Certificates**: Displayed in an elegant grid layout
- **Dual Actions**: Download and view options for each certificate
- **Metadata**: Certificate dates and issuing organizations
- **Touch Support**: Optimized interactions for mobile devices

### Technical Stack
- **Pure HTML/CSS/JavaScript**: No external frameworks required
- **CSS Grid**: Modern layout system for responsive design
- **Canvas API**: Matrix rain background animation
- **CSS Animations**: Smooth transitions and hover effects

## 📁 Project Structure

```
certificate/
├── index.html              # Main portfolio page
├── README.md               # Project documentation
└── assets/                 # Certificate files
    ├── Generative AI.jpg
    ├── Generative AI.pdf
    ├── Introduction to Modern AI.jpg
    ├── Introduction to Modern AI.pdf
    ├── JavaScript Essentials 1.jpg
    ├── JavaScript Essentials 1.pdf
    ├── Master Data Management for Beginners.jpg
    ├── Master Data Management for Beginners.pdf
    ├── Programming Fundamentals using Python part 1.jpg
    ├── Programming Fundamentals using Python part 1.pdf
    ├── Programming Fundamentals using Python part 2.jpg
    ├── Programming Fundamentals using Python part 2.pdf
    ├── Python for Data Science.jpg
    ├── Python for Data Science.pdf
    ├── TCS MasterCra TM DataPlus.jpg
    ├── TCS MasterCra TM DataPlus.pdf
    ├── css certificate.jpg
    ├── css certificate.pdf
    ├── International conference.jpg
    └── International conference.pdf
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for testing)

### Installation
1. Clone or download the project
2. Navigate to the project directory
3. Open `index.html` in your browser

### Local Development
For local development with a web server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## 🎨 Customization

### Adding New Certificates
1. Add certificate image and PDF to the `assets/` folder
2. Copy and modify this template in `index.html`:

```html
<div class="certificate-card cyber-border">
    <div class="certificate-image">
        <img src="./assets/your-certificate.jpg" alt="Certificate Name">
    </div>
    <div class="certificate-info">
        <h3>Certificate Name</h3>
        <p>via Organization</p>
        <div class="certificate-actions">
            <a href="./assets/your-certificate.pdf" target="_blank" class="view-button">
                <i class="fas fa-download"></i> Download
            </a>
            <a href="./assets/your-certificate.pdf" target="_blank" class="view-button">
                <i class="fas fa-expand"></i> View
            </a>
        </div>
        <div class="certificate-meta">
            <span class="certificate-date">DD Month YYYY</span>
        </div>
    </div>
</div>
```

### Theme Customization
Modify CSS variables in the `:root` section:

```css
:root {
    --bg-dark: #0a0a18;
    --bg-gradient: linear-gradient(45deg, #0f0c29, #302b63, #24243e);
    --neon-accent: #7d5fff;
    --text-light: #f8f9fa;
    --card-bg: rgba(31, 31, 56, 0.95);
    --glow: 0 0 20px rgba(125, 95, 255, 0.4);
}
```

## 🎯 Certifications Included

### AI & Machine Learning
- **Generative AI** - AWS Training & Certification (Dec 2025)
- **Introduction to Modern AI** - Cisco (Dec 2025)

### Programming
- **JavaScript Essentials 1** - Cisco (Dec 2025)
- **Programming Fundamentals using Python Part 1** - Infosys (Sep 2025)
- **Programming Fundamentals using Python Part 2** - Infosys (Sep 2025)
- **CSS** - HackerRank (Sep 2025)

### Data Science
- **Python for Data Science** - Infosys (Feb 2026)

### Data Management
- **DataPlus Overview Course** - TCS MasterCraft DataPlus (Dec 2025)
- **Master Data Management for Beginners** - TCS (Dec 2025)

### Academic
- **International Conference** - PSIT (Feb 2025)

## 🛠️ Technical Details

### Performance Features
- **Lazy Loading**: Images load as needed
- **Optimized Animations**: GPU-accelerated CSS transforms
- **Mobile Optimization**: Reduced effects on touch devices
- **Responsive Images**: Scales appropriately for all screen sizes

### Browser Compatibility
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

### Accessibility
- Semantic HTML5 structure
- ARIA labels where appropriate
- Keyboard navigation support
- High contrast color scheme

## 🔧 Configuration Options

### Animation Settings
```javascript
// Matrix rain speed (milliseconds)
setInterval(drawMatrix, 50);

// Particle count
for(let i = 0; i < 100; i++) // Adjust particle count

// Cursor trail frequency
if (trailDelay % 3 === 0) // Adjust trail density
```

### Responsive Breakpoints
```css
/* Tablet */
@media (max-width: 768px)

/* Mobile */
@media (max-width: 480px)

/* Touch devices */
@media (hover: none) and (pointer: coarse)
```

## 📱 Mobile Features

### Touch Optimizations
- Disabled custom cursor on touch devices
- Simplified hover effects
- Touch-friendly button sizes
- Optimized layout for small screens

### Performance
- Reduced particle effects
- Simplified animations
- Optimized image loading

## 🚀 Future Enhancements

### Planned Features
- [ ] Search and filter functionality
- [ ] Category-based organization
- [ ] Certificate verification links
- [ ] Social sharing capabilities
- [ ] Dark/light theme toggle
- [ ] Certificate progress tracking
- [ ] Export to PDF functionality

### Technical Improvements
- [ ] Image optimization (WebP format)
- [ ] Service worker for offline access
- [ ] Progressive Web App (PWA) features
- [ ] SEO optimization
- [ ] Analytics integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Shaurya Rajput**
- Location: Kanpur, Uttar Pradesh, India
- Portfolio: [shauryarajput.in](https://shauryarajput.in)
- Alternative Portfolio: [shauryarajput930.netlify.app](https://shauryarajput930.netlify.app/)
- Certificate Showcase: This project

## 📞 Contact

For questions or suggestions regarding this project, please reach out through the repository issues or contact channels.

---

⭐ If you find this project helpful, consider giving it a star!
