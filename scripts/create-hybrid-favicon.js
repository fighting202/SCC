const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '../public/scc-logo-header.png');
const outputDir = path.join(__dirname, '../public');

console.log('🚀 Creating hybrid favicon (SCC text + icon background)...');

async function createHybridFavicon() {
  try {
    // Create a hybrid favicon with background circle and SCC text
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
      { size: 144, name: 'favicon-144x144.png' },
      { size: 160, name: 'favicon-160x160.png' },
      { size: 192, name: 'favicon-192x192.png' },
      { size: 256, name: 'favicon-256x256.png' },
      { size: 512, name: 'favicon-512x512.png' }
    ];

    for (const { size, name } of sizes) {
      const outputPath = path.join(outputDir, name);
      
      // Create hybrid design: circular background + SCC text
      const logoBuffer = await sharp(inputPath)
        .resize(Math.floor(size * 0.8), Math.floor(size * 0.8), {
          fit: 'contain',
          position: 'center'
        })
        .png()
        .toBuffer();

      // Create circular background with medical theme color
      const background = await sharp({
        create: {
          width: size,
          height: size,
          channels: 4,
          background: { r: 44, g: 95, b: 124, alpha: 1 } // SCC primary color
        }
      })
        .composite([{
          input: Buffer.from(`
            <svg width="${size}" height="${size}">
              <circle cx="${size/2}" cy="${size/2}" r="${size/2 - 2}" 
                      fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
              <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" 
                    font-family="Arial, sans-serif" font-weight="bold" 
                    font-size="${Math.floor(size * 0.4)}" fill="white">SCC</text>
            </svg>
          `),
          blend: 'over'
        }])
        .png()
        .toBuffer();

      await sharp(background)
        .composite([{
          input: logoBuffer,
          blend: 'over'
        }])
        .png({ quality: 100 })
        .toFile(outputPath);
      
      console.log(`  ✅ Created hybrid ${name} (${size}x${size})`);
    }

    // Create main favicon.ico
    const mainLogoBuffer = await sharp(inputPath)
      .resize(128, 128, {
        fit: 'contain',
        position: 'center'
      })
      .png()
      .toBuffer();

    const mainBackground = await sharp({
      create: {
        width: 128,
        height: 128,
        channels: 4,
        background: { r: 44, g: 95, b: 124, alpha: 1 }
      }
    })
      .composite([{
        input: Buffer.from(`
          <svg width="128" height="128">
            <circle cx="64" cy="64" r="62" 
                    fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
            <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" 
                  font-family="Arial, sans-serif" font-weight="bold" 
                  font-size="48" fill="white">SCC</text>
          </svg>
        `),
        blend: 'over'
      }])
      .png()
      .toBuffer();

    await sharp(mainBackground)
      .composite([{
        input: mainLogoBuffer,
        blend: 'over'
      }])
      .png()
      .toFile(path.join(outputDir, 'favicon.ico'));

    console.log('  ✅ Created hybrid favicon.ico');

    // Create Apple touch icon
    const appleLogoBuffer = await sharp(inputPath)
      .resize(400, 400, {
        fit: 'contain',
        position: 'center'
      })
      .png()
      .toBuffer();

    const appleBackground = await sharp({
      create: {
        width: 400,
        height: 400,
        channels: 4,
        background: { r: 44, g: 95, b: 124, alpha: 1 }
      }
    })
      .composite([{
        input: Buffer.from(`
          <svg width="400" height="400">
            <circle cx="200" cy="200" r="195" 
                    fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="4"/>
            <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" 
                  font-family="Arial, sans-serif" font-weight="bold" 
                  font-size="150" fill="white">SCC</text>
          </svg>
        `),
        blend: 'over'
      }])
      .png()
      .toBuffer();

    await sharp(appleBackground)
      .composite([{
        input: appleLogoBuffer,
        blend: 'over'
      }])
      .png({ quality: 100 })
      .toFile(path.join(outputDir, 'apple-touch-icon.png'));

    console.log('  ✅ Created hybrid apple-touch-icon.png');

    console.log('\n✅ Hybrid favicon creation completed!');
    console.log('📁 All favicon files saved to public directory');
    console.log('\n💡 Hybrid design features:');
    console.log('  - Circular medical theme background (SCC primary color)');
    console.log('  - "SCC" text overlay for brand recognition');
    console.log('  - Original logo integrated for visual appeal');
    console.log('  - Optimized for small sizes (16x16 to 512x512)');
    console.log('  - Professional medical service appearance');
    
  } catch (error) {
    console.error('❌ Error creating hybrid favicon:', error);
  }
}

createHybridFavicon();
