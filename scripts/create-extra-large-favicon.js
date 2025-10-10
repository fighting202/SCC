const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '../public/scc-logo-header.png');
const outputDir = path.join(__dirname, '../public');

console.log('🚀 Creating extra large favicon from SCC logo...');

async function createExtraLargeFavicon() {
  try {
    // Create extra large favicon.ico (96x96 instead of 64x64)
    await sharp(inputPath)
      .resize(96, 96, {
        fit: 'cover',
        position: 'center'
      })
      .png()
      .toFile(path.join(outputDir, 'favicon.ico'));
    
    console.log('  ✅ Created extra large favicon.ico (96x96)');

    // Create standard favicon sizes with larger main sizes
    const sizes = [
      { size: 16, name: 'favicon-16x16.png' },
      { size: 24, name: 'favicon-24x24.png' },
      { size: 32, name: 'favicon-32x32.png' },
      { size: 48, name: 'favicon-48x48.png' },
      { size: 64, name: 'favicon-64x64.png' },
      { size: 80, name: 'favicon-80x80.png' },
      { size: 96, name: 'favicon-96x96.png' },
      { size: 128, name: 'favicon-128x128.png' },
      { size: 192, name: 'favicon-192x192.png' },
      { size: 256, name: 'favicon-256x256.png' },
      { size: 512, name: 'favicon-512x512.png' }
    ];

    for (const { size, name } of sizes) {
      const outputPath = path.join(outputDir, name);
      
      await sharp(inputPath)
        .resize(size, size, {
          fit: 'cover',
          position: 'center'
        })
        .png({ quality: 100 })
        .toFile(outputPath);
      
      console.log(`  ✅ Created ${name} (${size}x${size})`);
    }

    // Create Apple touch icon (extra large)
    await sharp(inputPath)
      .resize(256, 256, {
        fit: 'cover',
        position: 'center'
      })
      .png({ quality: 100 })
      .toFile(path.join(outputDir, 'apple-touch-icon.png'));
    
    console.log('  ✅ Created extra large apple-touch-icon.png (256x256)');

    // Create Android Chrome icons
    await sharp(inputPath)
      .resize(192, 192, {
        fit: 'cover',
        position: 'center'
      })
      .png({ quality: 100 })
      .toFile(path.join(outputDir, 'android-chrome-192x192.png'));
    
    await sharp(inputPath)
      .resize(512, 512, {
        fit: 'cover',
        position: 'center'
      })
      .png({ quality: 100 })
      .toFile(path.join(outputDir, 'android-chrome-512x512.png'));
    
    console.log('  ✅ Created Android Chrome icons');

    // Create a very high-resolution favicon.ico
    const icoPath = path.join(outputDir, 'favicon.ico');
    
    // Create a 96x96 ICO as the main favicon for maximum visibility
    await sharp(inputPath)
      .resize(96, 96, {
        fit: 'cover',
        position: 'center'
      })
      .png()
      .toFile(icoPath);
    
    console.log('  ✅ Created very high-resolution favicon.ico (96x96)');

    console.log('\n✅ Extra large favicon creation completed!');
    console.log('📁 All favicon files saved to public directory');
    console.log('\n💡 Changes:');
    console.log('  - Main favicon.ico: 64x64 → 96x96');
    console.log('  - Apple touch icon: 192x192 → 256x256');
    console.log('  - Added 80x80 size for better scaling');
    console.log('  - Maximum quality settings for best visibility');
    console.log('  - Extra large size for high-DPI displays');
    
  } catch (error) {
    console.error('❌ Error creating extra large favicon:', error);
  }
}

createExtraLargeFavicon();
