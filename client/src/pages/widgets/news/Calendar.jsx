import { motion } from 'framer-motion';
import React, { useEffect } from 'react';

const Calendar = () => {
    useEffect(() => {
        const widgetContainer = document.getElementById('tradingview-events-widget');

        // Only proceed if the widget container exists
        if (widgetContainer) {
            const script = document.createElement('script');
            script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-events.js';
            script.async = true;
            script.innerHTML = JSON.stringify({
                width: '100%',
                height: '600',
                colorTheme: 'light',
                isTransparent: true,
                locale: 'en',
                importanceFilter: '-1,0,1',
                countryFilter: 'us,ca,eu,ru,de,ch,gb,sa,ve,au,nz,cn,in,jp',
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
        <div className='max-w-full flex flex-col justify-center p-4 font-serif widgetsBg'>
            <div className='py-2 lg:py-4 px-10 flex flex-col justify-center items-center'>
                <motion.h1
                    initial={{ y: "-10vw" }}
                    animate={{ y: 0 }}
                    transition={{ type: "spring", duration: 1.6, ease: "easeInOut" }}
                    className='font-bold text-[20px] md:text-[25px] lg:text-[30px]'>Economic Calendar</motion.h1>
                <motion.p
                    initial={{ y: "10vw" }}
                    animate={{ y: 0 }}
                    transition={{ type: "spring", duration: 1.6, delay: 0.5, }}
                    className='pt-1 font-medium text-[10px] md:text-[15px] lg:text-[20px]'>
                    Keep an eye on key upcoming economic events, announcements, and news. Plus, set up filters in a few clicks, selecting for event importance and affected currencies.
                </motion.p>
            </div>
            <motion.p
                initial={{ y: "10vw" }}
                animate={{ y: 0 }}
                transition={{ type: "spring", duration: 1.6, delay: 0.5, }}
                className='py-1 lg:py-4 px-10 mt-6 font-medium items-start text-[10px] md:text-[15px] lg:text-[20px]'>
                You can tap on Network Icon to see <span className='font-bold text-red-600'>High Impact News.</span>
            </motion.p>
            <center>
                <motion.div
                    initial={{ x: "100vw" }}
                    animate={{ x: 0 }}
                    transition={{ type: "spring", duration: 1.6, delay: 0.5, ease: "easeInOut" }}
                    className='w-full lg:w-[95%] px-10 bg-yellow-50 rounded-2xl'>
                    <div className="tradingview-widget-container">
                        <div id="tradingview-events-widget" className="tradingview-widget-container__widget"></div>
                        <div className="tradingview-widget-copyright">
                            <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
                                <span className="blue-text">Earning Comes After Learning.</span>
                            </a>
                        </div>
                    </div>
                </motion.div>
            </center>
        </div>
    );
};

export default Calendar;
