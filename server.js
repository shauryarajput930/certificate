const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS & JSON parsing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Path constants
const ASSETS_DIR = path.join(__dirname, 'assets');
const DATA_FILE = path.join(__dirname, 'certificates.json');
const CONFIG_FILE = path.join(__dirname, 'admin_config.json');

// Ensure assets directory exists
if (!fs.existsSync(ASSETS_DIR)) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

// Ensure admin config exists
const DEFAULT_CONFIG = {
  adminPin: '2026',
  jwtSecret: 'cyberpunk-cert-auth-secret-key-2026'
};

function getConfig() {
  if (!fs.existsSync(CONFIG_FILE)) {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(DEFAULT_CONFIG, null, 2));
    return DEFAULT_CONFIG;
  }
  try {
    return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
  } catch (e) {
    return DEFAULT_CONFIG;
  }
}

function saveConfig(config) {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, ASSETS_DIR);
  },
  filename: function (req, file, cb) {
    // Sanitize filename and retain original extension
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9_\-\s]/g, '')
      .trim();
    const timestamp = Date.now();
    const finalName = `${baseName || 'certificate'}_${timestamp}${ext}`;
    cb(null, finalName);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

// Helper to read certificates
function getCertificates() {
  if (!fs.existsSync(DATA_FILE)) {
    return [];
  }
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading certificates.json:', err);
    return [];
  }
}

// Helper to save certificates
function saveCertificates(certs) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(certs, null, 2), 'utf8');
}

// Static files (serves root, assets, admin UI)
app.use(express.static(__dirname));

// Route /admin and /admin/* to admin dashboard
app.get(/^\/admin(?:\/.*)?$/, (req, res) => {
  res.sendFile(path.join(__dirname, 'admin', 'index.html'));
});

// Auth Endpoints
app.post('/api/auth/verify', (req, res) => {
  const { pin } = req.body;
  const config = getConfig();
  if (pin === config.adminPin) {
    res.json({
      success: true,
      message: 'Access granted',
      token: 'session-' + Buffer.from(Date.now().toString()).toString('base64')
    });
  } else {
    res.status(401).json({ success: false, message: 'Invalid Admin Passcode' });
  }
});

app.post('/api/auth/change-pin', (req, res) => {
  const { currentPin, newPin } = req.body;
  const config = getConfig();
  if (currentPin !== config.adminPin) {
    return res.status(401).json({ success: false, message: 'Current PIN is incorrect' });
  }
  if (!newPin || newPin.length < 4) {
    return res.status(400).json({ success: false, message: 'New PIN must be at least 4 digits' });
  }
  config.adminPin = newPin;
  saveConfig(config);
  res.json({ success: true, message: 'PIN updated successfully' });
});

// API: Get all certificates
app.get('/api/certificates', (req, res) => {
  const certs = getCertificates();
  res.json(certs);
});

// API: Upload & Add new certificate
app.post(
  '/api/certificates',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'pdf', maxCount: 1 }
  ]),
  (req, res) => {
    try {
      const { title, issuer, date, category, credentialUrl, pin } = req.body;
      const config = getConfig();

      if (pin && pin !== config.adminPin) {
        return res.status(401).json({ success: false, message: 'Unauthorized: Invalid PIN' });
      }

      if (!title || !title.trim()) {
        return res.status(400).json({ success: false, message: 'Title is required' });
      }

      const files = req.files || {};
      let imagePath = './assets/default.jpg';
      let pdfPath = '';

      if (files['image'] && files['image'][0]) {
        imagePath = `./assets/${files['image'][0].filename}`;
      } else if (req.body.imageUrl) {
        imagePath = req.body.imageUrl;
      }

      if (files['pdf'] && files['pdf'][0]) {
        pdfPath = `./assets/${files['pdf'][0].filename}`;
      } else if (req.body.pdfUrl) {
        pdfPath = req.body.pdfUrl;
      }

      const certs = getCertificates();

      // Normalize issuer: ensure 'via ' prefix if not already present
      let formattedIssuer = (issuer || '').trim();
      if (formattedIssuer && !formattedIssuer.toLowerCase().startsWith('via ') && !formattedIssuer.toLowerCase().includes('training')) {
        formattedIssuer = `via ${formattedIssuer}`;
      }

      const newCert = {
        id: 'cert-' + Date.now(),
        title: title.trim(),
        issuer: formattedIssuer,
        date: (date || new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })).trim(),
        image: imagePath,
        pdf: pdfPath,
        category: (category || 'Other').trim(),
        credentialUrl: (credentialUrl || '').trim(),
        createdAt: new Date().toISOString()
      };

      // Add to beginning of certificates array
      certs.unshift(newCert);
      saveCertificates(certs);

      res.status(201).json({
        success: true,
        message: 'Certificate deployed successfully!',
        certificate: newCert
      });
    } catch (err) {
      console.error('Error adding certificate:', err);
      res.status(500).json({ success: false, message: 'Server error while saving certificate' });
    }
  }
);

// API: Update certificate
app.put(
  '/api/certificates/:id',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'pdf', maxCount: 1 }
  ]),
  (req, res) => {
    try {
      const { id } = req.params;
      const { title, issuer, date, category, credentialUrl, image, pdf } = req.body;
      const certs = getCertificates();
      const index = certs.findIndex(c => c.id === id);

      if (index === -1) {
        return res.status(404).json({ success: false, message: 'Certificate not found' });
      }

      if (title) certs[index].title = title.trim();
      if (issuer) {
        let formattedIssuer = issuer.trim();
        if (formattedIssuer && !formattedIssuer.toLowerCase().startsWith('via ') && !formattedIssuer.toLowerCase().includes('training')) {
          formattedIssuer = `via ${formattedIssuer}`;
        }
        certs[index].issuer = formattedIssuer;
      }
      if (date) certs[index].date = date.trim();
      if (category) certs[index].category = category.trim();
      if (credentialUrl !== undefined) certs[index].credentialUrl = credentialUrl.trim();

      const files = req.files || {};
      if (files['image'] && files['image'][0]) {
        certs[index].image = `./assets/${files['image'][0].filename}`;
      } else if (image) {
        certs[index].image = image.trim();
      }

      if (files['pdf'] && files['pdf'][0]) {
        certs[index].pdf = `./assets/${files['pdf'][0].filename}`;
      } else if (pdf) {
        certs[index].pdf = pdf.trim();
      }

      saveCertificates(certs);
      res.json({ success: true, message: 'Certificate updated successfully', certificate: certs[index] });
    } catch (err) {
      console.error('Error updating certificate:', err);
      res.status(500).json({ success: false, message: 'Failed to update certificate' });
    }
  }
);

// API: Delete certificate
app.delete('/api/certificates/:id', (req, res) => {
  try {
    const { id } = req.params;
    const certs = getCertificates();
    const index = certs.findIndex(c => c.id === id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Certificate not found' });
    }

    const removed = certs.splice(index, 1)[0];
    saveCertificates(certs);

    // Optionally cleanup uploaded asset if it has timestamp pattern
    if (removed.image && removed.image.includes('_') && removed.image.startsWith('./assets/')) {
      const imgPath = path.join(__dirname, removed.image.replace('./', ''));
      if (fs.existsSync(imgPath)) {
        try { fs.unlinkSync(imgPath); } catch (e) { /* ignore cleanup error */ }
      }
    }
    if (removed.pdf && removed.pdf.includes('_') && removed.pdf.startsWith('./assets/')) {
      const pdfPath = path.join(__dirname, removed.pdf.replace('./', ''));
      if (fs.existsSync(pdfPath)) {
        try { fs.unlinkSync(pdfPath); } catch (e) { /* ignore cleanup error */ }
      }
    }

    res.json({ success: true, message: 'Certificate deleted successfully', deletedId: id });
  } catch (err) {
    console.error('Error deleting certificate:', err);
    res.status(500).json({ success: false, message: 'Failed to delete certificate' });
  }
});

// API: Stats
app.get('/api/stats', (req, res) => {
  const certs = getCertificates();
  const issuers = new Set(certs.map(c => c.issuer).filter(Boolean));
  const categories = new Set(certs.map(c => c.category).filter(Boolean));
  res.json({
    total: certs.length,
    issuersCount: issuers.size,
    categoriesCount: categories.size,
    latest: certs[0] || null
  });
});

app.listen(PORT, () => {
  console.log(`===================================================`);
  console.log(`⚡ Cyberpunk Certificate Portfolio Server Online!`);
  console.log(`🌐 Portfolio:       http://localhost:${PORT}`);
  console.log(`🔐 Admin Dashboard: http://localhost:${PORT}/admin`);
  console.log(`🔑 Default Admin PIN: 2026`);
  console.log(`===================================================`);
});
