import React, { useEffect, useState } from 'react';

const AdvancedChart = ({ pairName }) => {
    const containerId = `tradingview-widget-container-${pairName.replace(':', '-')}`;
    const scriptId = `tradingview-widget-script-${pairName.replace(':', '-')}`;

    useEffect(() => {
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
        script.async = true;
        script.innerHTML = JSON.stringify({
            autosize: true,
            symbol: pairName,
            timezone: "Etc/UTC",
            theme: "light",
            style: "1",
            locale: "en",
            withdateranges: true,
            range: "ALL",
            hide_side_toolbar: false,
            allow_symbol_change: true,
            calendar: false,
            studies: [
                "STD;Bollinger_Bands",
                "STD;EMA",
            ],
            support_host: "https://www.tradingview.com"
        });

        const container = document.getElementById(containerId);

        // Append the script only if the container is available
        if (container) {
            container.appendChild(script);
        }

        // Cleanup function to remove the script if the component unmounts
        return () => {
            if (container) {
                container.innerHTML = ''; // Clear the container content
            }
        };
    }, [pairName, containerId, scriptId]);

    return (
        <div className="tradingview-widget-container">
            <div id={containerId} className=' h-screen'></div>
            <div className="tradingview-widget-copyright">
                <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
                </a>
            </div>
        </div>
    );
};


const Chart = () => {
    const [pair, setPair] = useState("");
    const pairs = [
        { value: 'FX:EURUSD', label: 'EURUSD' },
        { value: 'FX:USDJPY', label: 'USDJPY' },
        { value: 'FX:GBPUSD', label: 'GBPUSD' },
        { value: 'FX:GBPJPY', label: 'GBPJPY' },
        { value: 'FX:AUDUSD', label: 'AUDUSD' },
        { value: 'XAUUSD', label: 'XAUUSD' },
        { value: 'OANDA:XAGUSD', label: 'XAGUSD' },
        { value: 'FX:EURJPY', label: 'EURJPY' },
        { value: 'NASDAQ:NDX', label: 'NDX' },
        { value: 'BSE:SENSEX', label: 'SENSEX' }
    ];

    const handleChange = (event) => {
        setPair(event.target.value);
    };

    return (
        <main className=' max-w-full w-full'>
            <div className=' my-4 flex flex-col justify-center items-center'>
                <h1>Choose the Chart From the DropDown</h1>
                <select value={pair} onChange={handleChange}>
                    <option value="" disabled>Select a pair</option>
                    {pairs.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className=' rounded-xl max-w-full w-full h-screen'>
                <AdvancedChart pairName={pair} />
            </div>
        </main>
    )
}

export default Chart