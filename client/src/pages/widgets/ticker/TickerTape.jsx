import React, { useEffect } from 'react';

const TickerTape = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
        script.async = true;
        script.innerHTML = JSON.stringify({
            symbols: [
                { proName: "FOREXCOM:NSXUSD", title: "US 100 Cash CFD" },
                { proName: "FX_IDC:EURUSD", title: "EUR to USD" },
                { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
                { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
                { proName: "OANDA:GBPUSD" },
                { proName: "OANDA:USDJPY" },
                { proName: "OANDA:GBPJPY" },
                { proName: "BLACKBULL:WTI" },
                { proName: "OANDA:XAUUSD" },
                { proName: "OANDA:XAGUSD" }
            ],
            showSymbolLogo: true,
            isTransparent: true,
            displayMode: 'adaptive',
            colorTheme: 'light',
            locale: 'en'
        });

        // Append the script to the div
        const widgetContainer = document.getElementById('tradingview-widget');
        if (widgetContainer) {
            widgetContainer.appendChild(script);
        }

        // Cleanup function to remove the script when the component unmounts
        return () => {
            if (widgetContainer && script.parentNode) {
                widgetContainer.removeChild(script);
            }
        };
    }, []);

    return (
        <div className="tradingview-widget-container">
            <div id="tradingview-widget" className="tradingview-widget-container__widget"></div>
        </div>
    );
};

export default TickerTape;
