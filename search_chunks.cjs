const axios = require('axios');

// Search the blog service chunk for API calls
const CHUNKS_TO_CHECK = [
  'chunk-NW3SZTDB.js',  // blog component chunk
  'chunk-6I66XNH4.js',
  'chunk-6BINLVTV.js',
  'chunk-7RRMM6RN.js',
  'chunk-DI4HXFJ2.js',
  'chunk-DUKSTT3K.js',
];

async function searchChunks() {
  for (const chunk of CHUNKS_TO_CHECK) {
    try {
      const res = await axios.get(`https://ownchat.app/${chunk}`);
      const js = res.data;

      // Look for http references and get/post calls
      const httpRefs = js.match(/https?:\/\/[a-zA-Z0-9._\-/]+/g) || [];
      const uniqueHttp = [...new Set(httpRefs)];
      if (uniqueHttp.length > 0) {
        console.log(`\n=== ${chunk} ===`);
        console.log('HTTP refs:', uniqueHttp);
      }

      // Look for keywords related to blog API
      const keywords = ['getBlogs', 'getBlog', 'get-blog', 'blog/get', 'belongsTo', 'organizationId', 'shopId', 'tenantId'];
      for (const kw of keywords) {
        const idx = js.indexOf(kw);
        if (idx !== -1) {
          console.log(`\nFound '${kw}' in ${chunk} at ${idx}:`);
          console.log(js.substring(idx - 60, idx + 200));
        }
      }
    } catch(e) {
      console.log(`Error fetching ${chunk}:`, e.message);
    }
  }
}

searchChunks().catch(console.error);
