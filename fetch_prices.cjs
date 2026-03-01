const fs = require('fs');
const https = require('https');

const BATCH_SIZE = 100; // Increased concurrency for speed

async function fetchPrice(url) {
    return new Promise((resolve) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => { data += chunk; });
            res.on('end', () => {
                // Look for Rs. X,XXX
                const matches = data.match(/Rs\.\s*([\d,]+)/i) || data.match(/Price in Rs\.\s*:\s*([\d,]+)/i);
                if (matches) {
                    // Keep it in Rs. for now, we can format it in the combine script
                    resolve(`Rs. ${matches[1]}`);
                } else {
                    resolve('N/A');
                }
            });
        }).on('error', (err) => {
            resolve('Error');
        });
    });
}

async function scrapePrices() {
    console.log('Loading mobile_data.json...');
    const data = JSON.parse(fs.readFileSync('./mobile_data.json', 'utf8'));
    const urls = data.map(item => item.URL);

    const priceMap = {};

    if (fs.existsSync('prices_cache.json')) {
        console.log('Found existing prices_cache.json. Attempting to resume...');
        Object.assign(priceMap, JSON.parse(fs.readFileSync('prices_cache.json', 'utf8')));
    }

    console.log(`Need to fetch prices for ${urls.length} phones.`);

    let processed = Object.keys(priceMap).length;
    console.log(`Already have ${processed} prices in cache.`);

    for (let i = 0; i < urls.length; i += BATCH_SIZE) {
        const batchUrls = urls.slice(i, i + BATCH_SIZE);

        // Filter out ones we already have
        const urlsToFetch = batchUrls.filter(url => !priceMap[url]);

        if (urlsToFetch.length > 0) {
            const promises = urlsToFetch.map(async (url) => {
                const price = await fetchPrice(url);
                priceMap[url] = price;
            });

            await Promise.all(promises);
            processed += urlsToFetch.length;

            console.log(`Processed ${processed}/${urls.length} (${((processed / urls.length) * 100).toFixed(1)}%)`);

            // Save incremental progress
            fs.writeFileSync('prices_cache.json', JSON.stringify(priceMap, null, 2));
        }
    }

    console.log('Scraping Complete! Saved to prices_cache.json');
}

scrapePrices().catch(console.error);
