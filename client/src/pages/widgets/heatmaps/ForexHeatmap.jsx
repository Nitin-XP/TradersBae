import React, { useEffect, useRef } from 'react';

const ForexHeatMapWidget = () => {
    const widgetRef = useRef(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-forex-heat-map.js';
        script.async = true;
        script.innerHTML = JSON.stringify({
            "width": "100%",
            "height": "400",
            "currencies": [
                "EUR",
                "USD",
                "JPY",
                "GBP",
                "CHF",
                "AUD",
                "CAD",
                "NZD",
                "CNY",
                "INR",
                "RUB"
            ],
            "isTransparent": false,
            "colorTheme": "light",
            "locale": "en",
            "backgroundColor": "#ffffff"
        });

        if (widgetRef.current) {
            widgetRef.current.appendChild(script);
        }

        return () => {
            // Cleanup to remove the script when the component is unmounted
            if (widgetRef.current) {
                widgetRef.current.innerHTML = '';
            }
        };
    }, []);

    return (
        <div className="tradingview-widget-container" style={{ width: '100%', height: '100%' }}>
            <div ref={widgetRef} className="tradingview-widget-container__widget"></div>
            <div className="tradingview-widget-copyright">
                <a href="https://www.tradingview.com/" rel="noopener noreferrer" target="_blank">
                    <span className="blue-text">Track it to Crack it!</span>
                </a>
            </div>
        </div>
    );
};

export default ForexHeatMapWidget;
