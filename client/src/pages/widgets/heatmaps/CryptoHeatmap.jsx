import React, { useEffect, useRef } from 'react';

const CryptoHeatmapWidget = () => {
    const widgetRef = useRef(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-crypto-coins-heatmap.js';
        script.async = true;
        script.innerHTML = JSON.stringify({
            "dataSource": "Crypto",
            "blockSize": "market_cap_calc",
            "blockColor": "change",
            "locale": "en",
            "symbolUrl": "",
            "colorTheme": "light",
            "hasTopBar": false,
            "isDataSetEnabled": false,
            "isZoomEnabled": true,
            "hasSymbolTooltip": true,
            "isMonoSize": false,
            "width": "100%",
            "height": "400"
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
        <div className="tradingview-widget-container bg-yellow-50">
            <div ref={widgetRef} className="tradingview-widget-container__widget "></div>
            <div className="tradingview-widget-copyright ">
                <a href="https://www.tradingview.com/" rel="noopener noreferrer" target="_blank">
                    <span className="blue-text">Track it to Crack it!</span>
                </a>
            </div>
        </div>
    );
};

export default CryptoHeatmapWidget;
