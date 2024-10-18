import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import TickerTape from '../ticker/TickerTape';

export const Fundamentals = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-timeline.js';
        script.async = true;
        script.innerHTML = JSON.stringify({
            feedMode: 'all_symbols',
            isTransparent: true,
            displayMode: 'adaptive',
            width: '100%',
            height: '600',
            colorTheme: 'light',
            locale: 'en',
        });
        document.getElementById('tradingview-widget').appendChild(script);

        // Cleanup to remove the script if the component is unmounted
        return () => {
            document.getElementById('tradingview-widget').innerHTML = '';
        };
    }, []);

    return (
        <>
            <div className=' max-w-full px-10 font-serif widgetsBg '>
                <div className=' py-4 flex flex-col justify-center items-center'>
                    <motion.h1
                        initial={{ y: "-10vw" }}
                        animate={{ y: 0 }}
                        transition={{ type: "spring", duration: 1.6, ease: "easeInOut" }}
                        className=' font-bold text-[20px] md:text-[25px] lg:text-[30px] '>Top Stories</motion.h1>
                    <motion.p
                        initial={{ y: "5vw" }}
                        animate={{ y: 0 }}
                        transition={{ type: "spring", duration: 1.6, delay: 0.5, }}
                        className=' pt-1 px-4 font-semibold text-[10px] md:text-[15px] lg:text-[20px] '>Help you to keep track of what's happening in the crypto and stock markets with our daily news briefs – designed to be read in <span className='text-blue-900 font-semibold'>20 seconds or less.</span></motion.p>
                </div>
                <motion.div
                    initial={{ x: "100vw" }}
                    animate={{ x: 0 }}
                    transition={{ type: "spring", duration: 3.6, ease: "easeInOut" }}
                    className=' rounded-2xl bg-yellow-50 mt-10 max-w-full'>
                    <div className="tradingview-widget-container">
                        <div id="tradingview-widget" className="tradingview-widget-container__widget"></div>
                        <div className="tradingview-widget-copyright">
                            <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
                                <span className="blue-text">Earning Comes After Learning.</span>
                            </a>
                        </div>
                    </div>
                </motion.div>
                <TickerTape />
            </div>
        </>
    );
};

export const RightPanelNews = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-timeline.js';
        script.async = true;
        script.innerHTML = JSON.stringify({
            feedMode: 'all_symbols',
            isTransparent: true,
            displayMode: 'compact',
            width: '100%',
            height: '100%',
            colorTheme: 'light',
            locale: 'en',
        });
        document.getElementById('tradingview-widget').appendChild(script);

        // Cleanup to remove the script if the component is unmounted
        return () => {
            document.getElementById('tradingview-widget').innerHTML = '';
        };
    }, []);

    return (
        <div className=' max-w-1/3 w-full'>
            <div className=' rounded-2xl bg-slate-200 mt-10 max-w-1/3'>
                <div className="tradingview-widget-container">
                    <div id="tradingview-widget" className="tradingview-widget-container__widget"></div>
                    <div className="tradingview-widget-copyright">
                        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
                            <span className="blue-text">Earning Comes After Learning.</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

