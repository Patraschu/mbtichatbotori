# 스크립트 디렉토리

이 폴더에는 빌드, 배포, 유틸리티 스크립트들이 저장됩니다.

## 예상 파일 구조

- `build.js` - 빌드 스크립트
- `deploy.js` - 배포 스크립트
- `generate-sitemap.js` - 사이트맵 생성 스크립트
- `generate-rss.js` - RSS 피드 생성 스크립트
- `optimize-images.js` - 이미지 최적화 스크립트
- `check-performance.js` - 성능 체크 스크립트
- `migrate-data.js` - 데이터 마이그레이션 스크립트
- `seed-database.js` - 데이터베이스 시드 스크립트

## 스크립트 예시

```javascript
// generate-sitemap.js
const fs = require('fs');
const path = require('path');
const { SitemapStream, streamToPromise } = require('sitemap');

const DOMAIN = 'https://www.mbtichatbot.com';

async function generateSitemap() {
  const sitemap = new SitemapStream({ hostname: DOMAIN });
  
  // 정적 페이지
  const staticPages = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/about', changefreq: 'monthly', priority: 0.8 },
    { url: '/tools', changefreq: 'weekly', priority: 0.9 },
    { url: '/blog', changefreq: 'daily', priority: 0.8 },
  ];
  
  staticPages.forEach(page => sitemap.write(page));
  
  // 동적 페이지 (블로그 포스트 등)
  // ...
  
  sitemap.end();
  
  const sitemapXML = await streamToPromise(sitemap);
  fs.writeFileSync(
    path.join(__dirname, '../public/sitemap.xml'),
    sitemapXML.toString()
  );
  
  console.log('Sitemap generated successfully!');
}

generateSitemap();
```

## 사용 방법

```bash
# 사이트맵 생성
npm run generate:sitemap

# RSS 피드 생성
npm run generate:rss

# 성능 체크
npm run check:performance
```