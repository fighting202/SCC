const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '../public/scc-logo-header.png');
const outputDir = path.join(__dirname, '../public');

console.log('🚀 Creating clean SCC logo favicon (no background box)...');

async function createCleanFavicon() {
  try {
    // Create favicon with transparent background and enhanced logo
    const logoBuffer = await sharp(inputPath)
      .resize(96, 96, {
        fit: 'contain', // Changed from 'cover' to 'contain' to preserve aspect ratio
        position: 'center'
      })
      .png()
      .toBuffer();

    // Create favicon with transparent background
    await sharp({
      create: {
        width: 96,
        height: 96,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 } // Transparent background
      }
    })
      .composite([{
        input: logoBuffer,
        blend: 'over'
      }])
      .png()
      .toFile(path.join(outputDir, 'favicon.ico'));
    
    console.log('  ✅ Created clean favicon.ico (96x96 with transparent background)');

    // Create standard favicon sizes with transparent background
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
      
      // Create logo with transparent background
      const logoBuffer = await sharp(inputPath)
        .resize(size, size, {
          fit: 'contain', // Preserve aspect ratio
          position: 'center'
        })
        .png()
        .toBuffer();

      await sharp({
        create: {
          width: size,
          height: size,
          channels: 4,
          background: { r: 0, g: 0, b: 0, alpha: 0 } // Transparent background
        }
      })
        .composite([{
          input: logoBuffer,
          blend: 'over'
        }])
        .png({ quality: 100 })
        .toFile(outputPath);
      
      console.log(`  ✅ Created ${name} (${size}x${size} with transparent background)`);
    }

    // Create Apple touch icon with transparent background
    const appleLogoBuffer = await sharp(inputPath)
      .resize(256, 256, {
        fit: 'contain',
        position: 'center'
      })
      .png()
      .toBuffer();

    await sharp({
      create: {
        width: 256,
        height: 256,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 } // Transparent background
      }
    })
      .composite([{
        input: appleLogoBuffer,
        blend: 'over'
      }])
      .png({ quality: 100 })
      .toFile(path.join(outputDir, 'apple-touch-icon.png'));
    
    console.log('  ✅ Created clean apple-touch-icon.png (256x256 with transparent background)');

    // Create Android Chrome icons with transparent background
    const android192Buffer = await sharp(inputPath)
      .resize(192, 192, {
        fit: 'contain',
        position: 'center'
      })
      .png()
      .toBuffer();

    await sharp({
      create: {
        width: 192,
        height: 192,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 } // Transparent background
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
        fit: 'contain',
        position: 'center'
      })
      .png()
      .toBuffer();

    await sharp({
      create: {
        width: 512,
        height: 512,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 } // Transparent background
      }
    })
      .composite([{
        input: android512Buffer,
        blend: 'over'
      }])
      .png({ quality: 100 })
      .toFile(path.join(outputDir, 'android-chrome-512x512.png'));
    
    console.log('  ✅ Created Android Chrome icons with transparent background');

    console.log('\n✅ Clean SCC logo favicon creation completed!');
    console.log('📁 All favicon files saved to public directory');
    console.log('\n💡 Improvements:');
    console.log('  - Removed white background box');
    console.log('  - Transparent background for clean look');
    console.log('  - SCC logo text stands out more');
    console.log('  - Preserved aspect ratio (contain instead of cover)');
    console.log('  - Professional and modern appearance');
    
  } catch (error) {
    console.error('❌ Error creating clean favicon:', error);
  }
}

createCleanFavicon();
