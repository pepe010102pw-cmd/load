const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  try {
    // Tentukan token rahasia kamu di sini (bebas diganti sesukamu)
    const SECRET_KEY = 'fan';
    
    // Cek apakah yang mengakses membawa token yang benar di URL (?key=...)
    if (req.query.key !== SECRET_KEY) {
      return res.status(403).send('Akses ditolak! Token salah.');
    }

    const filePath = path.join(process.cwd(), 'public', 'script.js');
    const coreCode = fs.readFileSync(filePath, 'utf8');

    res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    res.status(200).send(coreCode);
  } catch (error) {
    res.status(500).send('Gagal membaca file core: ' + error.message);
  }
};
