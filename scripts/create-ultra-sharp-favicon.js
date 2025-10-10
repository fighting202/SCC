const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '../public/scc-logo-header.png');
const outputDir = path.join(__dirname, '../public');

console.log('🚀 Creating ULTRA sharp and large SCC logo favicon...');

async function createUltraSharpFavicon() {
  try {
    // Create ULTRA large favicon with maximum sharpness
    const logoBuffer = await sharp(inputPath)
      .resize(160, 160, { // Increased from 128 to 160
        fit: 'contain',
        position: 'center'
      })
      .sharpen({ // Maximum sharpening
        sigma: 2.0,
        flat: 1.5,
        jagged: 3.0
      })
      .normalize() // Maximum contrast
      .modulate({ // Enhance brightness and saturation
        brightness: 1.1,
        saturation: 1.2
      })
      .png()
      .toBuffer();

    // Create favicon with transparent background
    await sharp({
      create: {
        width: 160, // Increased canvas size
        height: 160,
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
    
    console.log('  ✅ Created ULTRA sharp favicon.ico (160x160)');

    // Create standard favicon sizes with ULTRA sharpness
    const sizes = [
      { size: 16, name: 'favicon-16x16.png' },
      { size: 24, name: 'favicon-24x24.png' },
      { size: 32, name: 'favicon-32x32.png' },
      { size: 48, name: 'favicon-48x48.png' },
      { size: 64, name: 'favicon-64x64.png' },
      { size: 80, name: 'favicon-80x80.png' },
      { size: 96, name: 'favicon-96x96.png' },
      { size: 112, name: 'favicon-112x112.png' },
      { size: 128, name: 'favicon-128x128.png' },
      { size: 144, name: 'favicon-144x144.png' }, // New size
      { size: 160, name: 'favicon-160x160.png' }, // New size
      { size: 192, name: 'favicon-192x192.png' },
      { size: 256, name: 'favicon-256x256.png' },
      { size: 512, name: 'favicon-512x512.png' }
    ];

    for (const { size, name } of sizes) {
      const outputPath = path.join(outputDir, name);
      
      // Create logo with ULTRA sharpness and enhanced visibility
      const logoBuffer = await sharp(inputPath)
        .resize(size, size, {
          fit: 'contain',
          position: 'center'
        })
        .sharpen({
          sigma: size > 48 ? 2.0 : 1.0, // More sharpening for larger sizes
          flat: size > 48 ? 1.5 : 1.0,
          jagged: size > 48 ? 3.0 : 2.0
        })
        .normalize() // Maximum contrast
        .modulate({ // Enhance brightness and saturation
          brightness: 1.1,
          saturation: 1.2
        })
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
      
      console.log(`  ✅ Created ${name} (${size}x${size} with ULTRA sharpness)`);
    }

    // Create Apple touch icon with ULTRA sharpness
    const appleLogoBuffer = await sharp(inputPath)
      .resize(400, 400, { // Increased from 320 to 400
        fit: 'contain',
        position: 'center'
      })
      .sharpen({
        sigma: 2.5,
        flat: 1.5,
        jagged: 3.0
      })
      .normalize()
      .modulate({
        brightness: 1.1,
        saturation: 1.2
      })
      .png()
      .toBuffer();

    await sharp({
      create: {
        width: 400, // Increased canvas size
        height: 400,
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
    
    console.log('  ✅ Created ULTRA sharp apple-touch-icon.png (400x400)');

    // Create Android Chrome icons with ULTRA sharpness
    const android192Buffer = await sharp(inputPath)
      .resize(300, 300, { // Increased from 240 to 300
        fit: 'contain',
        position: 'center'
      })
      .sharpen({
        sigma: 2.2,
        flat: 1.5,
        jagged: 3.0
      })
      .normalize()
      .modulate({
        brightness: 1.1,
        saturation: 1.2
      })
      .png()
      .toBuffer();

    await sharp({
      create: {
        width: 300, // Increased canvas size
        height: 300,
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
      .resize(800, 800, { // Increased from 640 to 800
        fit: 'contain',
        position: 'center'
      })
      .sharpen({
        sigma: 3.0,
        flat: 1.5,
        jagged: 3.0
      })
      .normalize()
      .modulate({
        brightness: 1.1,
        saturation: 1.2
      })
      .png()
      .toBuffer();

    await sharp({
      create: {
        width: 800, // Increased canvas size
        height: 800,
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
    
    console.log('  ✅ Created Android Chrome icons with ULTRA sharpness');

    console.log('\n✅ ULTRA sharp and large SCC logo favicon creation completed!');
    console.log('📁 All favicon files saved to public directory');
    console.log('\n💡 ULTRA improvements:');
    console.log('  - Main favicon: 128x128 → 160x160 (25% larger)');
    console.log('  - Apple touch icon: 320x320 → 400x400 (25% larger)');
    console.log('  - Android icons: 240x240 → 300x300, 640x640 → 800x800');
    console.log('  - ULTRA sharpening: sigma 2.0-3.0 for maximum crispness');
    console.log('  - Enhanced brightness and saturation');
    console.log('  - Added 144x144 and 160x160 sizes');
    console.log('  - Maximum contrast and visibility');
    
  } catch (error) {
    console.error('❌ Error creating ULTRA sharp favicon:', error);
  }
}

createUltraSharpFavicon();
