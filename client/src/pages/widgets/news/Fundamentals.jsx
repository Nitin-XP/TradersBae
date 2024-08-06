import React, { useEffect, useRef } from 'react';

export const Fundamentals = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        // Function to load the TradingView script dynamically
        const loadTradingViewScript = () => {
            if (!containerRef.current) return;

            const existingScript = containerRef.current.querySelector('script[src="https://s3.tradingview.com/external-embedding/embed-widget-events.js"]');

            if (existingScript) {
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-events.js';
            script.async = true;
            script.textContent = JSON.stringify({
                width: '100%',
                height: '100%',
                colorTheme: 'light',
                isTransparent: true,
                locale: 'en',
                importanceFilter: '-1,0,1',
                countryFilter: 'ar,au,br,ca,cn,fr,de,in,id,it,jp,kr,mx,ru,sa,za,tr,gb,us,eu'
            });

            // Append the script to the container div
            containerRef.current.appendChild(script);
        };

        loadTradingViewScript();

        // Cleanup function to remove the script when the component unmounts
        return () => {
            if (containerRef.current) {
                const script = containerRef.current.querySelector('script[src="https://s3.tradingview.com/external-embedding/embed-widget-events.js"]');
                if (script) {
                    containerRef.current.removeChild(script);
                }
            }
        };
    }, []);

    return (
        <div className='max-w-full w-full'>
            <div>
                <h1 className=' font-semibold text-primary text-center'>Track the Market Fundamentals</h1>
            </div>
            <div className="tradingview-widget-container" style={{ width: '100%', height: '100%' }}>
                <div ref={containerRef} className="tradingview-widget-container__widget"></div>
            </div>
        </div>
    );
}
