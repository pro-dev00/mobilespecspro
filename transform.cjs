const fs = require('fs');

try {
    const raw = JSON.parse(fs.readFileSync('./mobile_data.json', 'utf8'));

    const transformed = raw.map((item, index) => {
        const getSafe = (obj, key) => (obj && obj[key]) || '';

        const buildObj = item.Build || item.General || {};
        const freqObj = item.Frequency || item.General || {};
        const procObj = item.Processor || item.General || {};
        const dispObj = item.Display || item.General || {};
        const memObj = item.Memory || item.General || {};
        const camObj = item.Camera || item.General || {};
        const connObj = item.Connectivity || item.General || {};
        const featObj = item.Features || item.General || {};
        const battObj = item.Battery || item.General || {};

        // Add real images parsing
        let imgURL = getSafe(item, 'Image');
        if (!imgURL) {
            if (item['Model Name']) {
                // e.g., iPhone 15 -> iphone15
                const slug = item['Model Name'].toLowerCase().replace(/[^a-z0-9]/g, '');
                imgURL = `https://picsum.photos/seed/${slug}/800/600`;
            } else {
                imgURL = `https://picsum.photos/seed/phone${index}/800/600`;
            }
        }

        const price = getSafe(item, 'Price') || '$' + (Math.floor(Math.random() * 800) + 200);

        return {
            id: String(index + 1),
            name: item['Model Name'] || 'Unknown Phone',
            brand: item.Brand || (item['Model Name'] ? item['Model Name'].split(' ')[0] : 'Unknown'),
            price: String(price),
            image: imgURL,
            specs: {
                general: {
                    model: item['Model Name'] || '',
                    brand: item.Brand || '',
                    releaseDate: 'Unknown',
                    status: 'Available'
                },
                build: {
                    dimensions: getSafe(buildObj, 'Dimensions'),
                    weight: getSafe(buildObj, 'Weight'),
                    build: getSafe(buildObj, 'Colors'),
                    sim: getSafe(buildObj, 'SIM')
                },
                display: {
                    type: getSafe(dispObj, 'Technology'),
                    size: getSafe(dispObj, 'Size'),
                    resolution: getSafe(dispObj, 'Resolution'),
                    protection: getSafe(dispObj, 'Protection') || getSafe(dispObj, 'Extra Features')
                },
                os: {
                    os: getSafe(buildObj, 'OS'),
                    ui: getSafe(buildObj, 'UI')
                },
                processor: {
                    chipset: getSafe(procObj, 'Chipset'),
                    cpu: getSafe(procObj, 'CPU'),
                    gpu: getSafe(procObj, 'GPU')
                },
                memory: {
                    ram: (getSafe(memObj, 'Built-in') || '').split(',')[1]?.trim() || 'Unknown',
                    internal: (getSafe(memObj, 'Built-in') || '').split(',')[0] || 'Unknown',
                    cardSlot: getSafe(memObj, 'Card')
                },
                camera: {
                    main: getSafe(camObj, 'Main'),
                    telephoto: '',
                    ultraWide: '',
                    features: getSafe(camObj, 'Features'),
                    video: '',
                    selfie: getSafe(camObj, 'Front'),
                    selfieVideo: ''
                },
                connectivity: {
                    fiveG: getSafe(freqObj, '5G Band'),
                    fourG: getSafe(freqObj, '4G Band'),
                    threeG: getSafe(freqObj, '3G Band'),
                    twoG: getSafe(freqObj, '2G Band'),
                    wlan: getSafe(connObj, 'WLAN'),
                    bluetooth: getSafe(connObj, 'Bluetooth'),
                    gps: getSafe(connObj, 'GPS'),
                    nfc: getSafe(connObj, 'NFC'),
                    usb: getSafe(connObj, 'USB')
                },
                battery: {
                    type: getSafe(battObj, 'Capacity'),
                    charging: getSafe(battObj, '') || getSafe(battObj, 'Fast charging'),
                    wireless: ''
                },
                sensors: {
                    sensors: getSafe(featObj, 'Sensors')
                }
            },
            aiInsights: "This phone is part of the comprehensive mobile dataset.",
            rating: parseFloat((Math.random() * 1.5 + 3.5).toFixed(1))
        };
    });

    // Write a TS file that exports MOCK_PHONES directly.
    const tsContent = `import { Phone } from './types';\n\nexport const MOCK_PHONES: Phone[] = ${JSON.stringify(transformed, null, 2)};\n`;
    fs.writeFileSync('./src/data.ts', tsContent);
    console.log('Successfully transformed ' + transformed.length + ' phones into src/data.ts');

} catch (e) {
    console.error('Error transforming:', e);
}
