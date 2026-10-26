const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  try {
    const secretHeader = req.headers['x-extension-auth'];
    const MY_SECRET = 'IrilModzGacorAbis2026';

    if (secretHeader !== MY_SECRET) {
      return res.status(403).send('//DENIED');
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
