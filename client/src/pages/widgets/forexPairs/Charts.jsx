import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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

function CustomDropdown({ asset, pairs, pair, handleChange }) {
    const selectedLabel = pairs.find(option => option.value === pair)?.label || `${asset}`;

    const handleSelect = (value) => {
        handleChange({ target: { value } });
    };


    return (
        <div className="dropdown dropdown-hover" >
            <div tabIndex={0} role="button" className="btn rounded-2xl hover:bg-black hover:text-white m-1">
                {selectedLabel}
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-white rounded-[20px] z-[1] w-52 p-2 shadow">
                <li className="text-gray-500" disabled>
                    <a>Select an asset</a>
                </li>
                {pairs.map((option) => (
                    <li key={option.value}>
                        <Link onClick={() => handleSelect(option.value)}>{option.label}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

const Chart = () => {
    const [pair, setPair] = useState("");
    const pairs = [
        { value: 'OANDA:EURUSD', label: 'EURUSD' },
        { value: 'OANDA:USDJPY', label: 'USDJPY' },
        { value: 'OANDA:GBPUSD', label: 'GBPUSD' },
        { value: 'OANDA:GBPJPY', label: 'GBPJPY' },
        { value: 'OANDA:AUDUSD', label: 'AUDUSD' },
        { value: 'XAUUSD', label: 'XAUUSD' },
        { value: 'OANDA:XAGUSD', label: 'XAGUSD' },
        { value: 'OANDA:EURJPY', label: 'EURJPY' },
    ];
    const indices = [
        { value: 'NASDAQ:NDX', label: 'NDX' },
        { value: 'BSE:SENSEX', label: 'SENSEX' },
        { value: 'CAPITALCOM:DXY', label: 'Dollar Index' },
        { value: 'CAPITALCOM:US30', label: 'US30' },
        { value: 'NSE:NIFTY', label: 'Nifty50' },
        { value: 'NSE:BANKNIFTY', label: 'BANKNIFTY' },
    ];
    const cryptos = [
        { value: 'COINBASE:BTCUSD', label: 'BTCUSD' },
        { value: 'BINANCE:ETHUSD', label: 'ETHUSD' },
        { value: 'BINANCE:XRPUSDT', label: 'XRPUSDT' },
        { value: 'BINANCE:SHIBUSDT', label: 'SHIBUSDT' },
    ];

    const handleChange = (event) => {
        setPair(event.target.value);
    };

    return (
        <main className=' max-w-full w-full font-serif widgetsBg'>
            <div className=' my-4 flex flex-col justify-center items-center'>
                <motion.p
                    initial={{ y: "-10vw" }}
                    animate={{ y: 0 }}
                    transition={{ type: "spring", duration: 1.6, delay: 0.5, ease: "easeInOut" }}
                    className=' py-5 font-semibold text-[10px] md:text-[15px] lg:text-[20px] '>Choose the Chart From the DropDown!</motion.p>
                <motion.div
                    initial={{ y: "10vw" }}
                    animate={{ y: 0 }}
                    transition={{ type: "spring", duration: 1.6, delay: 0.5 }}
                >
                    <CustomDropdown asset={"Forex Pairs"} pairs={pairs} pair={pair} handleChange={handleChange} />
                    <CustomDropdown asset={"Indices"} pairs={indices} pair={pair} handleChange={handleChange} />
                    <CustomDropdown asset={"Cryptos"} pairs={cryptos} pair={pair} handleChange={handleChange} />

                </motion.div>
            </div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 3, }}
                className=' rounded-xl max-w-full w-full h-screen'>
                <AdvancedChart pairName={pair} />
            </motion.div>
        </main>
    )
}

export default Chart