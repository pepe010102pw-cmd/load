const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  try {
    // Ambil informasi asal request (referer atau origin)
    const referer = req.headers.referer || req.headers.origin || '';
    
    // Validasi: Harus berasal dari domain pbmobile.app
    // (Kecuali kalau kamu mau test manual di browser, bisa dikondisikan)
    if (!referer.includes('pbmobile.app')) {
      return res.status(403).send('Akses ilegal! Hanya untuk pbmobile.app');
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
