const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '../public/scc-logo-header.png');
const outputDir = path.join(__dirname, '../public');

console.log('🚀 Creating high readability favicon from SCC logo...');

async function createReadableFavicon() {
  try {
    // Create favicon with white background for better visibility
    const logoBuffer = await sharp(inputPath)
      .resize(96, 96, {
        fit: 'cover',
        position: 'center'
      })
      .png()
      .toBuffer();

    // Create favicon with white background
    await sharp({
      create: {
        width: 96,
        height: 96,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      }
    })
      .composite([{
        input: logoBuffer,
        blend: 'over'
      }])
      .png()
      .toFile(path.join(outputDir, 'favicon.ico'));
    
    console.log('  ✅ Created readable favicon.ico (96x96 with white background)');

    // Create standard favicon sizes with improved readability
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
      
      // Create logo with white background for better contrast
      const logoBuffer = await sharp(inputPath)
        .resize(size, size, {
          fit: 'cover',
          position: 'center'
        })
        .png()
        .toBuffer();

      await sharp({
        create: {
          width: size,
          height: size,
          channels: 4,
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        }
      })
        .composite([{
          input: logoBuffer,
          blend: 'over'
        }])
        .png({ quality: 100 })
        .toFile(outputPath);
      
      console.log(`  ✅ Created ${name} (${size}x${size} with white background)`);
    }

    // Create Apple touch icon with white background
    const appleLogoBuffer = await sharp(inputPath)
      .resize(256, 256, {
        fit: 'cover',
        position: 'center'
      })
      .png()
      .toBuffer();

    await sharp({
      create: {
        width: 256,
        height: 256,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      }
    })
      .composite([{
        input: appleLogoBuffer,
        blend: 'over'
      }])
      .png({ quality: 100 })
      .toFile(path.join(outputDir, 'apple-touch-icon.png'));
    
    console.log('  ✅ Created readable apple-touch-icon.png (256x256 with white background)');

    // Create Android Chrome icons with white background
    const android192Buffer = await sharp(inputPath)
      .resize(192, 192, {
        fit: 'cover',
        position: 'center'
      })
      .png()
      .toBuffer();

    await sharp({
      create: {
        width: 192,
        height: 192,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      }
    })
      .composite([{
        input: android192Buffer,
        blend: 'over'
      }])
      .png({ quality: 100 })
      .toFile(path.join(outputDir, 'android-chrome-192x192.png'));

    const android512Buffer = await sharp(inputPath)
      .resize(512, 512, {
        fit: 'cover',
        position: 'center'
      })
      .png()
      .toBuffer();

    await sharp({
      create: {
        width: 512,
        height: 512,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      }
    })
      .composite([{
        input: android512Buffer,
        blend: 'over'
      }])
      .png({ quality: 100 })
      .toFile(path.join(outputDir, 'android-chrome-512x512.png'));
    
    console.log('  ✅ Created Android Chrome icons with white background');

    console.log('\n✅ High readability favicon creation completed!');
    console.log('📁 All favicon files saved to public directory');
    console.log('\n💡 Improvements:');
    console.log('  - White background for better contrast');
    console.log('  - Enhanced visibility on dark browser themes');
    console.log('  - Better readability at small sizes');
    console.log('  - Professional appearance');
    console.log('  - High-DPI display optimized');
    
  } catch (error) {
    console.error('❌ Error creating readable favicon:', error);
  }
}

createReadableFavicon();
