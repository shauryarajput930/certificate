# Certificate Portfolio

A state-of-the-art cyberpunk-themed technical certificate portfolio and full-stack admin command console built with pure HTML5, CSS3, JavaScript, Node.js (Express 5), and Multer.

![CyberVault Banner](https://img.shields.io/badge/CYBERVAULT-v2.5-7d5fff?style=for-the-badge&logo=shield&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-00f2fe?style=for-the-badge&logo=express&logoColor=black)
![NodeJS](https://img.shields.io/badge/Node.js-18+-05ffa1?style=for-the-badge&logo=node.js&logoColor=black)
![Multer](https://img.shields.io/badge/Storage-Multer%20Disk-ff3366?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Fully%20Responsive-ffaa00?style=for-the-badge)

---

## 🌐 Quick Access URLs

| Interface | URL | Description |
| :--- | :--- | :--- |
| **Public Portfolio** | [http://localhost:3000](http://localhost:3000) | Public cyberpunk portfolio showcasing 13+ verified technical credentials |
| **Admin Console** | [http://localhost:3000/admin](http://localhost:3000/admin) | Command console for deploying, editing, and managing certificates |
| **Default Security PIN** | `2026` | Enter on the Security Gatekeeper keypad (Customizable in `/admin`) |

---

## 🎯 Key Features

### 1. 🛡️ Public Certificate Showcase (`/`)
- **Cyberpunk Aesthetic**: High-energy neon glow (purple, cyan, emerald), Matrix green rain digital background on HTML5 Canvas, and floating background particles.
- **Interactive 3D Cards**: GPU-accelerated 3D perspective tilt reacting to mouse position, holographic shimmer animations, and glassmorphism cards.
- **Dynamic Certificate Loader**: Automatically fetches certificates from `/api/certificates` (Node.js server) with a seamless fallback to `localStorage` / seed data for static deployments.
- **Dual Action Triggers**: Download or view certificate badges and PDF documents in high resolution.
- **Floating Command Console Button**: Instant cyberpunk `/admin` launcher button floating in the bottom-right corner.

### 2. 🔐 Admin Command Console (`/admin`)
- **Security Gatekeeper**: Holographic PIN keypad & session authentication modal with visual feedback, digit masking, and session persistence.
- **Drag-and-Drop Deployment**: Dedicated dropzones for Certificate Badge images (JPG, PNG, WebP) and PDF documents with instant file size and name metadata chips.
- **Real-Time Holographic 3D Preview**: A 1:1 live replica of the portfolio card on the right-hand panel that reacts in real-time as you type the title, issuer, date, or drop an image.
- **Deployed Certificates Registry**:
  - **Live Search**: Instant search bar with isolated password management to prevent browser autofill.
  - **Category Pills Filter**: Dynamic filter buttons with live counts for all certificate disciplines.
  - **Edit Certificate Modal**: Update certificate title, issuing organization, issue date, category, verification URL, or replace badge images/PDF documents.
  - **Delete & Removal**: Instantly remove outdated credentials from both the server disk and JSON registry.
  - **Export & Backup**: One-click JSON backup export (`certificates_backup_*.json`) for safeguarding records.
- **Full Mobile Responsiveness**:
  - Animated Cyber Hamburger Drawer triggered on tablets and phones (`<= 992px`).
  - Strict zero-overflow viewport constraints (`overflow-x: hidden`).
  - Auto-scrolling PIN gatekeeper keypad for small screens and landscape orientation.
  - Responsive single-column grid transformation for mobile screens.

---

## 📁 Project Structure

```
Certification/
├── index.html              # Main public certificate portfolio
├── server.js               # Express 5 backend with Multer upload & REST API
├── certificates.json       # Central certificate registry database
├── admin_config.json       # Secure admin settings (PIN & secret) - gitignored
├── package.json            # Node.js project dependencies & start scripts
├── .gitignore              # Git exclusions (node_modules, credentials, logs)
├── README.md               # Project documentation
├── admin/
│   └── index.html          # CyberVault Admin Command Console UI
└── assets/                 # Certificate badge images and PDF documents
    ├── sql_advanced certificate.jpg
    ├── sql_advanced certificate.pdf
    ├── sql_basic certificate.jpg
    ├── sql_basic certificate.pdf
    ├── CodSoft Internship.jpg
    ├── CodSoft Internship.pdf
    ├── Python for Data Science.jpg
    ├── Python for Data Science.pdf
    ├── Introduction to Modern AI.jpg
    ├── Introduction to Modern AI.pdf
    ├── JavaScript Essentials 1.jpg
    ├── JavaScript Essentials 1.pdf
    ├── Generative AI.jpg
    ├── Generative AI.pdf
    ├── Master Data Management for Beginners.jpg
    ├── Master Data Management for Beginners.pdf
    ├── TCS MasterCra TM DataPlus.jpg
    ├── TCS MasterCra TM DataPlus.pdf
    ├── css certificate.jpg
    ├── css certificate.pdf
    ├── Programming Fundamentals using Python part 1.jpg
    ├── Programming Fundamentals using Python part 1.pdf
    ├── Programming Fundamentals using Python part 2.jpg
    ├── Programming Fundamentals using Python part 2.pdf
    ├── International conference.jpg
    └── International conference.pdf
```

---

## 💾 Storage Architecture: Where Files Are Saved

When you deploy or edit a certificate via the Admin Dashboard:

| Resource | Storage Destination | Description |
| :--- | :--- | :--- |
| **Badge Images** | `assets/<filename>_<timestamp>.ext` | Stored on the local disk inside the [`assets/`](file:///d:/PSIT/Sem%204/FSD/Certification/assets) folder via Multer. Filename is sanitized with a unique timestamp to prevent overwrites. |
| **PDF Documents** | `assets/<filename>_<timestamp>.pdf` | Uploaded document stored on disk in [`assets/`](file:///d:/PSIT/Sem%204/FSD/Certification/assets). |
| **Certificate Data** | [`certificates.json`](file:///d:/PSIT/Sem%204/FSD/Certification/certificates.json) | Stores title, issuer, issue date, category, credential URL, and asset relative path. |
| **Admin Credentials** | `admin_config.json` | Stores the active admin PIN and security secrets (ignored by Git for privacy). |
| **Offline Fallback** | `localStorage` (`cybervault_certificates`) | Base64-encoded client vault used if running purely statically without Node.js. |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (bundled with Node.js)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/shauryarajput930/certificate.git
   cd certificate
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the full-stack server:
   ```bash
   npm start
   ```

4. Open in browser:
   - **Portfolio**: [http://localhost:3000](http://localhost:3000)
   - **Admin Console**: [http://localhost:3000/admin](http://localhost:3000/admin) *(Default PIN: `2026`)*

---

## 🔌 REST API Endpoints

The Express 5 server exposes the following RESTful API:

| Method | Endpoint | Description | Payload / Query |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/certificates` | Returns array of all deployed certificates | None |
| `POST` | `/api/certificates` | Deploys a new certificate with Multer files | `multipart/form-data` (title, issuer, date, category, credentialUrl, image, pdf) |
| `PUT` | `/api/certificates/:id` | Updates certificate metadata or replaces files | `multipart/form-data` |
| `DELETE` | `/api/certificates/:id` | Deletes certificate from `certificates.json` and disk | None |
| `GET` | `/api/stats` | Returns database statistics (total, issuers, categories) | None |
| `POST` | `/api/auth/verify` | Verifies admin PIN passcode | `{ "pin": "2026" }` |
| `POST` | `/api/auth/change-pin` | Updates the admin security PIN | `{ "currentPin": "2026", "newPin": "..." }` |

---

## 📜 Certifications Included (13 Verified Credentials)

### 🤖 Artificial Intelligence & Machine Learning
- **Generative AI** — *AWS Training & Certification* (Dec 2025)
- **Introduction to Modern AI** — *Cisco* (Dec 2025)

### 🗄️ Database & SQL
- **SQL (Advanced)** — *HackerRank* (Oct 2026)
- **SQL (Basic)** — *HackerRank* (Oct 2026)

### 💻 Web Development & Programming
- **Web Development Internship** — *CodSoft* (Sep 2026)
- **JavaScript Essentials 1** — *Cisco* (Dec 2025)
- **Programming Fundamentals using Python — Part 1** — *Infosys* (Sep 2025)
- **Programming Fundamentals using Python — Part 2** — *Infosys* (Sep 2025)
- **CSS** — *HackerRank* (Sep 2025)

### 📊 Data Science & Data Management
- **Python for Data Science** — *Infosys* (Feb 2026)
- **Master Data Management for Beginners** — *TCS* (Dec 2025)
- **DataPlus Overview Course** — *TCS MasterCraft DataPlus* (Dec 2025)

### 🎓 Academic & Conferences
- **International Conference** — *PSIT* (Feb 2025)

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: Vanilla HTML5, CSS3, ES6+ JavaScript, FontAwesome 6, Google Fonts (`Orbitron`, `Rajdhani`, `Inter`).
- **Backend**: Node.js, Express 5, Multer (multipart disk storage), CORS.
- **Styling**: Pure custom Vanilla CSS with CSS custom properties (variables), Flexbox, CSS Grid, 3D transforms, keyframe hologram animations, glassmorphism.
- **Security**: Local PIN verification, isolated password contexts to eliminate browser autofill leakage, Git-ignored configuration store.

---

## 👤 Author

**Shaurya Rajput**
- **Portfolio**: [shauryarajput.in](https://shauryarajput.in)
- **Alternative**: [shauryarajput930.netlify.app](https://shauryarajput930.netlify.app/)
- **College**: PSIT Kanpur, Uttar Pradesh, India
- **Repository**: [github.com/shauryarajput930/certificate](https://github.com/shauryarajput930/certificate)

---

⭐ If you find this cyberpunk project helpful, consider starring the repository!
