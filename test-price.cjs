const https = require('https');

const url = 'https://www.whatmobile.com.pk/Samsung_Galaxy-Z-Fold-6';

https.get(url, (res) => {
    let data = '';
    res.on('data', chunk => { data += chunk; });
    res.on('end', () => {
        // Look for price patterns like Rs. 123,456 or class="price"
        const matches = data.match(/Rs\.\s*([\d,]+)/i) || data.match(/Price in Rs\.\s*:\s*([\d,]+)/i);
        if (matches) {
            console.log('Price found:', matches[0]);
        } else {
            console.log('No price pattern found in HTML.');
            // print a snippet of HTML around the word "Price"
            const idx = data.indexOf('Price');
            if (idx !== -1) {
                console.log('Snippet around "Price":', data.substring(idx - 100, idx + 100));
            }
        }
    });
}).on('error', err => {
    console.error('Fetch error:', err.message);
});
