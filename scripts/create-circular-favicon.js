const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '../public/scc-logo-header.png');
const outputDir = path.join(__dirname, '../public');

console.log('🚀 Creating circular favicon with enhanced visibility...');

async function createCircularFavicon() {
  try {
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
      
      // Create circular design with enhanced text visibility
      const textSize = Math.floor(size * 0.35); // Larger text
      const strokeWidth = Math.max(1, Math.floor(size * 0.02)); // Proportional stroke
      
      const svgBuffer = Buffer.from(`
        <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="1" dy="1" stdDeviation="1" flood-color="rgba(0,0,0,0.3)"/>
            </filter>
          </defs>
          <circle cx="${size/2}" cy="${size/2}" r="${size/2 - 1}" 
                  fill="#2C5F7C" stroke="#1A4A5C" stroke-width="${strokeWidth}"/>
          <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" 
                font-family="Arial, sans-serif" font-weight="900" 
                font-size="${textSize}" fill="white" filter="url(#shadow)">SCC</text>
        </svg>
      `);

      await sharp(svgBuffer)
        .png({ quality: 100 })
        .toFile(outputPath);
      
      console.log(`  ✅ Created circular ${name} (${size}x${size})`);
    }

    // Create main favicon.ico with circular design
    const mainSvgBuffer = Buffer.from(`
      <svg width="128" height="128" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="2" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.4)"/>
          </filter>
        </defs>
        <circle cx="64" cy="64" r="63" 
                fill="#2C5F7C" stroke="#1A4A5C" stroke-width="2"/>
        <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" 
              font-family="Arial, sans-serif" font-weight="900" 
              font-size="48" fill="white" filter="url(#shadow)">SCC</text>
      </svg>
    `);

    await sharp(mainSvgBuffer)
      .png({ quality: 100 })
      .toFile(path.join(outputDir, 'favicon.ico'));

    console.log('  ✅ Created circular favicon.ico');

    // Create Apple touch icon with circular design
    const appleSvgBuffer = Buffer.from(`
      <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="3" dy="3" stdDeviation="3" flood-color="rgba(0,0,0,0.4)"/>
          </filter>
        </defs>
        <circle cx="200" cy="200" r="198" 
                fill="#2C5F7C" stroke="#1A4A5C" stroke-width="4"/>
        <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" 
              font-family="Arial, sans-serif" font-weight="900" 
              font-size="150" fill="white" filter="url(#shadow)">SCC</text>
      </svg>
    `);

    await sharp(appleSvgBuffer)
      .png({ quality: 100 })
      .toFile(path.join(outputDir, 'apple-touch-icon.png'));

    console.log('  ✅ Created circular apple-touch-icon.png');

    // Create Android Chrome icons with circular design
    const android192SvgBuffer = Buffer.from(`
      <svg width="192" height="192" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="2" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.4)"/>
          </filter>
        </defs>
        <circle cx="96" cy="96" r="95" 
                fill="#2C5F7C" stroke="#1A4A5C" stroke-width="3"/>
        <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" 
              font-family="Arial, sans-serif" font-weight="900" 
              font-size="72" fill="white" filter="url(#shadow)">SCC</text>
      </svg>
    `);

    await sharp(android192SvgBuffer)
      .png({ quality: 100 })
      .toFile(path.join(outputDir, 'android-chrome-192x192.png'));

    const android512SvgBuffer = Buffer.from(`
      <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="4" dy="4" stdDeviation="4" flood-color="rgba(0,0,0,0.4)"/>
          </filter>
        </defs>
        <circle cx="256" cy="256" r="254" 
                fill="#2C5F7C" stroke="#1A4A5C" stroke-width="6"/>
        <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" 
              font-family="Arial, sans-serif" font-weight="900" 
              font-size="192" fill="white" filter="url(#shadow)">SCC</text>
      </svg>
    `);

    await sharp(android512SvgBuffer)
      .png({ quality: 100 })
      .toFile(path.join(outputDir, 'android-chrome-512x512.png'));

    console.log('  ✅ Created Android Chrome circular icons');

    console.log('\n✅ Circular favicon creation completed!');
    console.log('📁 All favicon files saved to public directory');
    console.log('\n💡 Circular design improvements:');
    console.log('  - Perfect circular shape (no square background)');
    console.log('  - Enhanced text visibility with larger font size');
    console.log('  - Text shadow for better contrast');
    console.log('  - Bold font weight (900) for maximum readability');
    console.log('  - Darker border for better definition');
    console.log('  - Maintained SCC brand color (#2C5F7C)');
    
  } catch (error) {
    console.error('❌ Error creating circular favicon:', error);
  }
}

createCircularFavicon();
