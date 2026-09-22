const fs = require('fs');

function parseLH(file) {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  console.log(`--- Results for ${file} ---`);
  
  const lcpElement = data.audits['largest-contentful-paint-element']?.details?.items[0];
  console.log('LCP Element Snippet:', lcpElement?.node?.snippet || 'None');
  
  console.log('--- Images Network Requests ---');
  const network = data.audits['network-requests']?.details?.items || [];
  network.filter(req => req.resourceType === 'Image' || req.mimeType?.includes('image')).sort((a,b) => b.resourceSize - a.resourceSize).forEach(req => {
    console.log(`${req.url} - ${(req.resourceSize / 1024).toFixed(2)} KB - ${req.mimeType}`);
  });
}

parseLH('lh-mobile.json');
parseLH('lh-desktop.json');
