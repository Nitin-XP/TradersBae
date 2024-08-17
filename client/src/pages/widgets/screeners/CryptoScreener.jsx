import React, { useEffect } from 'react';

const CryptoScreener = () => {
    useEffect(() => {
        const widgetContainer = document.getElementById('tradingview-crypto-screener-widget');

        // Only proceed if the widget container exists
        if (widgetContainer) {
            const script = document.createElement('script');
            script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-screener.js';
            script.async = true;
            script.innerHTML = JSON.stringify({
                "width": "100%",
                "height": "600",
                "defaultColumn": "overview",
                "screener_type": "crypto_mkt",
                "displayCurrency": "BTC",
                "colorTheme": "light",
                "locale": "en",
                "isTransparent": true
            });
            widgetContainer.appendChild(script);
        }

        // Cleanup function
        return () => {
            if (widgetContainer) {
                widgetContainer.innerHTML = ''; // Ensure cleanup only occurs if the element still exists
            }
        };
    }, []);

    return (
        <div className='max-w-full flex flex-col justify-center p-4'>
            <center>
                <div className='w-full px-10 bg-yellow-50 rounded-2xl'>
                    <div className="tradingview-widget-container">
                        <div id="tradingview-crypto-screener-widget" className="tradingview-widget-container__widget"></div>
                        <div className="tradingview-widget-copyright">
                            <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
                                <span className="blue-text">Earning Comes After Learning</span>
                            </a>
                        </div>
                    </div>
                </div>
            </center>
        </div>
    );
};

export default CryptoScreener;
