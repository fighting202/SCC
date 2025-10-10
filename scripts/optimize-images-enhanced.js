const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../public');
const outputDir = path.join(__dirname, '../public/optimized');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('🚀 Starting enhanced image optimization...');

// Image optimization configurations
const configs = {
  hero: {
    input: 'modern-seoul-skyline-at-sunset-with-luxury-medical.jpg',
    outputs: [
      { format: 'webp', quality: 85, width: 1920, height: 1080, suffix: '' },
      { format: 'webp', quality: 80, width: 1200, height: 630, suffix: '-social' },
      { format: 'avif', quality: 80, width: 1920, height: 1080, suffix: '' }
    ]
  },
  logoHeader: {
    input: 'scc-logo-header.png',
    outputs: [
      { format: 'webp', quality: 90, width: 200, height: 200, suffix: '' },
      { format: 'avif', quality: 85, width: 200, height: 200, suffix: '' }
    ]
  },
  logoFooter: {
    input: 'scc-logo-footer.png',
    outputs: [
      { format: 'webp', quality: 90, width: 200, height: 200, suffix: '' },
      { format: 'avif', quality: 85, width: 200, height: 200, suffix: '' }
    ]
  },
  qrCode: {
    input: 'scc-wechat-qr.jpg',
    outputs: [
      { format: 'webp', quality: 85, width: 400, height: 400, suffix: '' },
      { format: 'avif', quality: 80, width: 400, height: 400, suffix: '' }
    ]
  }
};

async function optimizeImage(configName, config) {
  const inputPath = path.join(imagesDir, config.input);
  const baseName = path.basename(config.input, path.extname(config.input));
  
  if (!fs.existsSync(inputPath)) {
    console.log(`⚠️  Input file not found: ${config.input}`);
    return;
  }

  console.log(`\nOptimizing ${config.input}...`);
  
  for (const output of config.outputs) {
    const outputFileName = `${baseName}${output.suffix}.${output.format}`;
    const outputPath = path.join(outputDir, outputFileName);
    
    try {
      let sharpInstance = sharp(inputPath);
      
      // Resize if dimensions are specified
      if (output.width && output.height) {
        sharpInstance = sharpInstance.resize(output.width, output.height, {
          fit: 'cover',
          position: 'center'
        });
      }
      
      // Apply format-specific optimizations
      if (output.format === 'webp') {
        sharpInstance = sharpInstance.webp({ 
          quality: output.quality,
          effort: 6 // Higher effort for better compression
        });
      } else if (output.format === 'avif') {
        sharpInstance = sharpInstance.avif({ 
          quality: output.quality,
          effort: 9 // Maximum effort for best compression
        });
      }
      
      await sharpInstance.toFile(outputPath);
      
      // Get file sizes
      const originalSize = fs.statSync(inputPath).size;
      const optimizedSize = fs.statSync(outputPath).size;
      const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
      
      console.log(`  ✅ ${outputFileName}: ${(optimizedSize / 1024).toFixed(1)}KB (${savings}% smaller)`);
      
    } catch (error) {
      console.error(`  ❌ Error processing ${outputFileName}:`, error.message);
    }
  }
}

async function main() {
  try {
    for (const [configName, config] of Object.entries(configs)) {
      await optimizeImage(configName, config);
    }
    
    console.log('\n✅ Enhanced image optimization completed!');
    console.log(`📁 Optimized images saved to: ${outputDir}`);
    console.log('\n💡 Benefits:');
    console.log('  - WebP: 25-35% smaller than JPEG/PNG');
    console.log('  - AVIF: 50% smaller than JPEG/PNG');
    console.log('  - Progressive loading with fallbacks');
    console.log('  - Responsive images for different screen sizes');
    
  } catch (error) {
    console.error('❌ Optimization failed:', error);
  }
}

main();
