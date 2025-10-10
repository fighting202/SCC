const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// 이미지 최적화 설정
const config = {
  quality: 85,
  formats: ['webp', 'avif'],
  sizes: {
    hero: { width: 1200, height: 630 },
    logo: { width: 200, height: 200 },
    qr: { width: 400, height: 400 },
    thumbnail: { width: 300, height: 200 }
  }
};

// 이미지 파일 목록
const images = [
  {
    input: 'modern-seoul-skyline-at-sunset-with-luxury-medical.jpg',
    type: 'hero',
    alt: 'Seoul medical tourism skyline'
  },
  {
    input: 'scc-logo-header.png',
    type: 'logo',
    alt: 'SCC Logo Header'
  },
  {
    input: 'scc-logo-footer.png',
    type: 'logo',
    alt: 'SCC Logo Footer'
  },
  {
    input: 'scc-wechat-qr.jpg',
    type: 'qr',
    alt: 'WeChat QR Code'
  }
];

async function optimizeImage(imageConfig) {
  const { input, type, alt } = imageConfig;
  const inputPath = path.join(__dirname, '..', 'public', input);
  const outputDir = path.join(__dirname, '..', 'public', 'optimized');
  
  // 출력 디렉토리 생성
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const baseName = path.parse(input).name;
  const size = config.sizes[type];
  
  console.log(`Optimizing ${input}...`);
  
  try {
    // 원본 이미지 정보 가져오기
    const metadata = await sharp(inputPath).metadata();
    console.log(`  Original: ${metadata.width}x${metadata.height}, ${Math.round(metadata.size / 1024)}KB`);
    
    // 각 포맷으로 최적화
    for (const format of config.formats) {
      const outputPath = path.join(outputDir, `${baseName}.${format}`);
      
      let pipeline = sharp(inputPath)
        .resize(size.width, size.height, {
          fit: 'cover',
          position: 'center'
        });
      
      if (format === 'webp') {
        pipeline = pipeline.webp({ quality: config.quality });
      } else if (format === 'avif') {
        pipeline = pipeline.avif({ quality: config.quality });
      }
      
      await pipeline.toFile(outputPath);
      
      const optimizedMetadata = await sharp(outputPath).metadata();
      console.log(`  ${format.toUpperCase()}: ${optimizedMetadata.width}x${optimizedMetadata.height}, ${Math.round(optimizedMetadata.size / 1024)}KB`);
    }
    
    // 원본 크기로도 WebP 생성 (반응형용)
    const responsivePath = path.join(outputDir, `${baseName}-responsive.webp`);
    await sharp(inputPath)
      .webp({ quality: config.quality })
      .toFile(responsivePath);
    
    const responsiveMetadata = await sharp(responsivePath).metadata();
    console.log(`  WebP Responsive: ${responsiveMetadata.width}x${responsiveMetadata.height}, ${Math.round(responsiveMetadata.size / 1024)}KB`);
    
  } catch (error) {
    console.error(`Error optimizing ${input}:`, error.message);
  }
}

async function optimizeAllImages() {
  console.log('🚀 Starting image optimization...\n');
  
  for (const image of images) {
    await optimizeImage(image);
    console.log('');
  }
  
  console.log('✅ Image optimization completed!');
  console.log('\n📁 Optimized images saved to: public/optimized/');
  console.log('\n💡 Next steps:');
  console.log('1. Update image references in components to use optimized versions');
  console.log('2. Add responsive image loading with srcSet');
  console.log('3. Implement lazy loading for better performance');
}

// 스크립트 실행
if (require.main === module) {
  optimizeAllImages().catch(console.error);
}

module.exports = { optimizeAllImages, optimizeImage };
