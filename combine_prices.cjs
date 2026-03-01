const fs = require('fs');

try {
    const rawData = JSON.parse(fs.readFileSync('./mobile_data.json', 'utf8'));
    const priceCache = JSON.parse(fs.readFileSync('./prices_cache.json', 'utf8'));

    // This is a mapping from the transform script logic to get the final object shape
    const transformed = rawData.map((item, index) => {
        const getSafe = (obj, key) => (obj && obj[key]) || '';

        const brandRaw = item['Model Name'].split(' ')[0] || 'Unknown';
        const brand = brandRaw.trim();

        // Attempt to parse out Rs. 
        let priceStr = priceCache[item.URL] || 'N/A';

        // We already extracted WhatMobile images before, this is repeating the mapping logic
        // Just map it over correctly

        const nameWithoutBrand = item['Model Name'].replace(new RegExp(`^${brand}\\s+`, 'i'), '').trim();
        const formattedModel = nameWithoutBrand.replace(/\s+/g, '').replace(/[^a-zA-Z0-9-]/g, '');
        const imageUrl = `https://www.whatmobile.com.pk/admin/images/${brand}/${brand}${formattedModel}-b.jpg`;

        return {
            id: `phone-${index + 1}`,
            name: item['Model Name'],
            brand: brand,
            price: priceStr,
            image: imageUrl,
            specs: {
                processor: {
                    chipset: getSafe(item.Processor, 'Chipset'),
                    cpu: getSafe(item.Processor, 'CPU'),
                },
                display: {
                    size: getSafe(item.Display, 'Size'),
                    resolution: getSafe(item.Display, 'Resolution'),
                    type: getSafe(item.Display, 'Technology'),
                },
                camera: {
                    main: getSafe(item.Camera, 'Main'),
                    front: getSafe(item.Camera, 'Front'),
                },
                battery: {
                    capacity: getSafe(item.Battery, 'Capacity'),
                    charging: getSafe(item.Battery, ''),
                },
                memory: {
                    ram: getSafe(item.Memory, 'Built-in'),
                    internal: getSafe(item.Memory, 'Built-in'),
                },
            }
        };
    });

    const outputContent = `import { Phone } from './types';

// Auto-generated data payload
export const MOCK_PHONES: Phone[] = ${JSON.stringify(transformed, null, 2)};
`;

    fs.writeFileSync('./src/data.ts', outputContent);
    console.log(`Successfully merged ${transformed.length} phones with real prices into src/data.ts`);

} catch (err) {
    console.error("Error creating combined data:", err);
}
