const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '../public/scc-logo-header.png');
const outputDir = path.join(__dirname, '../public');

console.log('🚀 Creating extra large and sharp SCC logo favicon...');

async function createSharpLargeFavicon() {
  try {
    // Create extra large favicon with enhanced contrast and sharpness
    const logoBuffer = await sharp(inputPath)
      .resize(128, 128, { // Increased from 96 to 128
        fit: 'contain',
        position: 'center'
      })
      .sharpen({ // Add sharpening
        sigma: 1.0,
        flat: 1.0,
        jagged: 2.0
      })
      .normalize() // Enhance contrast
      .png()
      .toBuffer();

    // Create favicon with transparent background
    await sharp({
      create: {
        width: 128, // Increased canvas size
        height: 128,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      }
    })
      .composite([{
        input: logoBuffer,
        blend: 'over'
      }])
      .png()
      .toFile(path.join(outputDir, 'favicon.ico'));
    
    console.log('  ✅ Created extra large sharp favicon.ico (128x128)');

    // Create standard favicon sizes with enhanced sharpness
    const sizes = [
      { size: 16, name: 'favicon-16x16.png' },
      { size: 24, name: 'favicon-24x24.png' },
      { size: 32, name: 'favicon-32x32.png' },
      { size: 48, name: 'favicon-48x48.png' },
      { size: 64, name: 'favicon-64x64.png' },
      { size: 80, name: 'favicon-80x80.png' },
      { size: 96, name: 'favicon-96x96.png' },
      { size: 112, name: 'favicon-112x112.png' }, // New size
      { size: 128, name: 'favicon-128x128.png' },
      { size: 192, name: 'favicon-192x192.png' },
      { size: 256, name: 'favicon-256x256.png' },
      { size: 512, name: 'favicon-512x512.png' }
    ];

    for (const { size, name } of sizes) {
      const outputPath = path.join(outputDir, name);
      
      // Create logo with enhanced sharpness and contrast
      const logoBuffer = await sharp(inputPath)
        .resize(size, size, {
          fit: 'contain',
          position: 'center'
        })
        .sharpen({
          sigma: size > 32 ? 1.0 : 0.5, // More sharpening for larger sizes
          flat: 1.0,
          jagged: 2.0
        })
        .normalize() // Enhance contrast
        .png()
        .toBuffer();

      await sharp({
        create: {
          width: size,
          height: size,
          channels: 4,
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        }
      })
        .composite([{
          input: logoBuffer,
          blend: 'over'
        }])
        .png({ quality: 100 })
        .toFile(outputPath);
      
      console.log(`  ✅ Created ${name} (${size}x${size} with enhanced sharpness)`);
    }

    // Create Apple touch icon with enhanced sharpness
    const appleLogoBuffer = await sharp(inputPath)
      .resize(320, 320, { // Increased from 256 to 320
        fit: 'contain',
        position: 'center'
      })
      .sharpen({
        sigma: 1.5,
        flat: 1.0,
        jagged: 2.0
      })
      .normalize()
      .png()
      .toBuffer();

    await sharp({
      create: {
        width: 320, // Increased canvas size
        height: 320,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      }
    })
      .composite([{
        input: appleLogoBuffer,
        blend: 'over'
      }])
      .png({ quality: 100 })
      .toFile(path.join(outputDir, 'apple-touch-icon.png'));
    
    console.log('  ✅ Created extra large sharp apple-touch-icon.png (320x320)');

    // Create Android Chrome icons with enhanced sharpness
    const android192Buffer = await sharp(inputPath)
      .resize(240, 240, { // Increased from 192 to 240
        fit: 'contain',
        position: 'center'
      })
      .sharpen({
        sigma: 1.2,
        flat: 1.0,
        jagged: 2.0
      })
      .normalize()
      .png()
      .toBuffer();

    await sharp({
      create: {
        width: 240, // Increased canvas size
        height: 240,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      }
    })
      .composite([{
        input: android192Buffer,
        blend: 'over'
      }])
      .png({ quality: 100 })
      .toFile(path.join(outputDir, 'android-chrome-192x192.png'));

    const android512Buffer = await sharp(inputPath)
      .resize(640, 640, { // Increased from 512 to 640
        fit: 'contain',
        position: 'center'
      })
      .sharpen({
        sigma: 2.0,
        flat: 1.0,
        jagged: 2.0
      })
      .normalize()
      .png()
      .toBuffer();

    await sharp({
      create: {
        width: 640, // Increased canvas size
        height: 640,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      }
    })
      .composite([{
        input: android512Buffer,
        blend: 'over'
      }])
      .png({ quality: 100 })
      .toFile(path.join(outputDir, 'android-chrome-512x512.png'));
    
    console.log('  ✅ Created Android Chrome icons with enhanced sharpness');

    console.log('\n✅ Extra large and sharp SCC logo favicon creation completed!');
    console.log('📁 All favicon files saved to public directory');
    console.log('\n💡 Major improvements:');
    console.log('  - Main favicon: 96x96 → 128x128 (33% larger)');
    console.log('  - Apple touch icon: 256x256 → 320x320 (25% larger)');
    console.log('  - Android icons: 192x192 → 240x240, 512x512 → 640x640');
    console.log('  - Added sharpening filter for crisp edges');
    console.log('  - Enhanced contrast with normalize()');
    console.log('  - Added 112x112 size for better scaling');
    console.log('  - Maximum quality settings');
    
  } catch (error) {
    console.error('❌ Error creating sharp large favicon:', error);
  }
}

createSharpLargeFavicon();
