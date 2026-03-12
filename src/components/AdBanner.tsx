import React from 'react';

interface AdBannerProps {
    className?: string;
}

export default function AdBanner({ className = '' }: AdBannerProps) {
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (!containerRef.current) return;

        // Clear any previous content
        containerRef.current.innerHTML = '';

        // Create the options script
        const optionsScript = document.createElement('script');
        optionsScript.type = 'text/javascript';
        optionsScript.text = `
      atOptions = {
        'key' : '2d99e0d6574b58413476984edf803a5d',
        'format' : 'iframe',
        'height' : 300,
        'width' : 160,
        'params' : {}
      };
    `;
        containerRef.current.appendChild(optionsScript);

        // Create the invoke script
        const invokeScript = document.createElement('script');
        invokeScript.type = 'text/javascript';
        invokeScript.src = 'https://www.highperformanceformat.com/2d99e0d6574b58413476984edf803a5d/invoke.js';
        containerRef.current.appendChild(invokeScript);

        return () => {
            if (containerRef.current) {
                containerRef.current.innerHTML = '';
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={`flex items-center justify-center ${className}`}
            style={{ minWidth: 160, minHeight: 300 }}
        />
    );
}
