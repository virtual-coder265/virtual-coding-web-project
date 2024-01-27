// Set cache control header
document.getElementById('page').setAttribute('cache-control', 'max-age=31536000'); 

// Set expires header 1 week in future
let expires = new Date(Date.now() + 604800000).toUTCString();
document.getElementById('page').setAttribute('expires', expires);

// Generate ETag
let etag = CryptoJS.MD5(location.href);
document.getElementById('page').setAttribute('etag', etag);

// Gzip compression
let content = compress(document.body.innerHTML); 

// CDN URLs
const CDN_URL = 'https://virtual-coding.web.app';

// Cache API
let cache = await caches.open('static-cache');
let popular = cache.match('popular-products');
if (!popular) {
  popular = await fetch('/popular-products');
  cache.put('popular-products', popular.clone());
}

document.getElementById('content').innerHTML = `
  <img src="${CDN_URL}/images/logo.png">
  ${popular} 
`;