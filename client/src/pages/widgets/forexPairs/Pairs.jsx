import React, { useEffect } from 'react';

export const Pair = ({ pairName }) => {
    const containerId = `tradingview-widget-container-${pairName.replace(':', '-')}`;
    const scriptId = `tradingview-widget-script-${pairName.replace(':', '-')}`;

    useEffect(() => {
        const existingScript = document.getElementById(scriptId);

        // If the script is already present, do not add it again
        if (!existingScript) {
            const script = document.createElement('script');
            script.id = scriptId;
            script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js';
            script.async = true;
            script.innerHTML = JSON.stringify({
                symbol: pairName,
                width: "100%",
                height: "100%",
                locale: "en",
                dateRange: "ALL",
                colorTheme: "light",
                isTransparent: true,
                autosize: true,
                largeChartUrl: ""
            });

            const container = document.getElementById(containerId);
            if (container) {
                container.appendChild(script);
            }
        }

        // Cleanup function to remove the script if the component unmounts
        return () => {
            const script = document.getElementById(scriptId);
            if (script) {
                script.remove();
            }
        };
    }, [pairName, containerId, scriptId]);

    return (
        <div className="tradingview-widget-container cursor-none">
            <div id={containerId}></div>
            <div className="tradingview-widget-copyright cursor-none">
                <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
                    <span className="blue-text"></span>
                </a>
            </div>
        </div>
    );
};