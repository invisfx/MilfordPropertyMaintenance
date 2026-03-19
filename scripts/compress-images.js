const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '..', 'images');
const outDir = path.join(__dirname, '..', 'images_compressed');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

const files = fs.readdirSync(imagesDir).filter(f => /\.(jpeg|jpg)$/i.test(f) && f !== 'logo.jpg');

(async () => {
  let totalSaved = 0;
  for (const file of files) {
    const filePath = path.join(imagesDir, file);
    const outPath = path.join(outDir, file);
    const stat = fs.statSync(filePath);
    const sizeKB = Math.round(stat.size / 1024);

    if (sizeKB <= 150) {
      console.log(`SKIP ${file} (${sizeKB}KB)`);
      continue;
    }

    try {
      await sharp(filePath)
        .resize({ width: 1200, height: 900, fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 75, mozjpeg: true })
        .toFile(outPath);

      const newStat = fs.statSync(outPath);
      const newSizeKB = Math.round(newStat.size / 1024);
      totalSaved += (sizeKB - newSizeKB);
      console.log(`OK ${file}: ${sizeKB}KB -> ${newSizeKB}KB`);
    } catch (err) {
      console.log(`ERR ${file}: ${err.message}`);
    }
  }
  console.log(`\nTotal saved: ${totalSaved}KB (${Math.round(totalSaved/1024)}MB)`);
  console.log(`Compressed images in: images_compressed/`);
  console.log(`To apply: delete images/ contents and move images_compressed/* to images/`);
})();
