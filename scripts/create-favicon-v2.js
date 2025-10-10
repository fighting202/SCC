const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '../public/scc-logo-header.png');
const outputDir = path.join(__dirname, '../public');

console.log('🚀 Creating enhanced favicon from SCC logo...');

async function createFavicon() {
  try {
    // Create favicon.ico (most important)
    await sharp(inputPath)
      .resize(32, 32, {
        fit: 'cover',
        position: 'center'
      })
      .png()
      .toFile(path.join(outputDir, 'favicon.ico'));
    
    console.log('  ✅ Created favicon.ico');

    // Create standard favicon sizes
    const sizes = [
      { size: 16, name: 'favicon-16x16.png' },
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

    // Create Apple touch icon
    await sharp(inputPath)
      .resize(180, 180, {
        fit: 'cover',
        position: 'center'
      })
      .png({ quality: 100 })
      .toFile(path.join(outputDir, 'apple-touch-icon.png'));
    
    console.log('  ✅ Created apple-touch-icon.png');

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

    // Create a simple favicon.ico with multiple sizes (for better browser support)
    const icoSizes = [16, 32, 48];
    const icoPath = path.join(outputDir, 'favicon.ico');
    
    // Create a 32x32 ICO as the main favicon
    await sharp(inputPath)
      .resize(32, 32, {
        fit: 'cover',
        position: 'center'
      })
      .png()
      .toFile(icoPath);
    
    console.log('  ✅ Created enhanced favicon.ico');

    console.log('\n✅ Enhanced favicon creation completed!');
    console.log('📁 All favicon files saved to public directory');
    console.log('\n💡 To see changes:');
    console.log('  1. Hard refresh browser (Ctrl+F5 or Cmd+Shift+R)');
    console.log('  2. Clear browser cache');
    console.log('  3. Check browser developer tools Network tab');
    
  } catch (error) {
    console.error('❌ Error creating favicon:', error);
  }
}

createFavicon();
