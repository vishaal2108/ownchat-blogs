const axios = require('axios');

async function findApiCall() {
  const res = await axios.get('https://ownchat.app/blog');
  const html = res.data;

  // Find chunk JS files
  const chunks = html.match(/chunk-[A-Z0-9]+\.js/g) || [];
  console.log('All chunks:', [...new Set(chunks)]);

  // Find all script src
  const scripts = html.match(/src="([^"]+\.js)"/g) || [];
  console.log('Scripts:', scripts);
}

findApiCall().catch(console.error);
