const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '../public/scc-logo-header.png');
const outputDir = path.join(__dirname, '../public');

console.log('🚀 Creating larger favicon from SCC logo...');

async function createLargeFavicon() {
  try {
    // Create larger favicon.ico (64x64 instead of 32x32)
    await sharp(inputPath)
      .resize(64, 64, {
        fit: 'cover',
        position: 'center'
      })
      .png()
      .toFile(path.join(outputDir, 'favicon.ico'));
    
    console.log('  ✅ Created larger favicon.ico (64x64)');

    // Create standard favicon sizes with larger main sizes
    const sizes = [
      { size: 16, name: 'favicon-16x16.png' },
      { size: 24, name: 'favicon-24x24.png' },
      { size: 32, name: 'favicon-32x32.png' },
      { size: 48, name: 'favicon-48x48.png' },
      { size: 64, name: 'favicon-64x64.png' },
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

    // Create Apple touch icon (larger)
    await sharp(inputPath)
      .resize(192, 192, {
        fit: 'cover',
        position: 'center'
      })
      .png({ quality: 100 })
      .toFile(path.join(outputDir, 'apple-touch-icon.png'));
    
    console.log('  ✅ Created larger apple-touch-icon.png (192x192)');

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

    // Create a high-resolution favicon.ico with multiple sizes
    const icoSizes = [16, 32, 48, 64];
    const icoPath = path.join(outputDir, 'favicon.ico');
    
    // Create a 64x64 ICO as the main favicon for better visibility
    await sharp(inputPath)
      .resize(64, 64, {
        fit: 'cover',
        position: 'center'
      })
      .png()
      .toFile(icoPath);
    
    console.log('  ✅ Created high-resolution favicon.ico (64x64)');

    console.log('\n✅ Large favicon creation completed!');
    console.log('📁 All favicon files saved to public directory');
    console.log('\n💡 Changes:');
    console.log('  - Main favicon.ico: 32x32 → 64x64');
    console.log('  - Apple touch icon: 180x180 → 192x192');
    console.log('  - Added 24x24 size for better scaling');
    console.log('  - Higher quality settings for better visibility');
    
  } catch (error) {
    console.error('❌ Error creating large favicon:', error);
  }
}

createLargeFavicon();
