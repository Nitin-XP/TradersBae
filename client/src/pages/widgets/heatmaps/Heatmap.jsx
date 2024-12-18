import { motion } from 'framer-motion'
import React from 'react'
import TickerTape from '../ticker/TickerTape'
import CryptoHeatmapWidget from './CryptoHeatmap'
import ForexCrossRatesWidget from './ForexCrossRates'
import ForexHeatMapWidget from './ForexHeatmap'
import StockHeatmap from './StockHeatmap'

const Heatmap = () => {
    return (
        <main className=' max-w-full w-full font-serif bg-yellow-100 '>
            <div className=' py-4 flex flex-col justify-center items-center'>
                <motion.h1
                    initial={{ y: "-10vw" }}
                    animate={{ y: 0 }}
                    transition={{ type: "spring", duration: 0.9, delay: 0.5, ease: "easeInOut" }}
                    className=' font-bold text-[20px] md:text-[25px] lg:text-[30px] '>Heatmaps</motion.h1>
                <motion.p
                    initial={{ y: "10vw" }}
                    animate={{ y: 0 }}
                    transition={{ type: "spring", duration: 1, }}
                    className=' pt-1 font-semibold text-[10px] md:text-[15px] lg:text-[20px] '>Track Sector Strength and Weakness</motion.p>
            </div>
            <div className=' flex flex-col my-6'>
                <motion.div
                    initial={{ x: "-100vw" }}
                    animate={{ x: 0 }}
                    transition={{ type: "spring", duration: 1.6, delay: 0.5, ease: "easeInOut" }}
                    className=' px-10 w-full items-center'>
                    <div className=' flex flex-col justify-start'>
                        <h1 className=' font-semibold text-[20px] md:text-[25px] lg:text-[30px] '>Stock Heatmap Widget</h1>
                        <p className=' pt-1 font-normal text-[10px] md:text-[15px] lg:text-[20px] '>This widget shows off a macro view on global stocks. Perfect for segmenting by sector, country or market cap.</p>
                    </div>
                    <div className=' bg-yellow-50 w-full mt-10'>
                        <StockHeatmap />
                    </div>
                </motion.div>
                <motion.div
                    initial={{ x: "100vw" }}
                    animate={{ x: 0 }}
                    transition={{ type: "spring", duration: 1.6, delay: 0.5, ease: "easeInOut" }}
                    className=' mt-6 px-10 w-full items-center'>
                    <div className=' flex flex-col justify-start'>
                        <h1 className=' font-semibold text-[20px] md:text-[25px] lg:text-[30px] '>Crypto Coins Heatmap</h1>
                        <p className=' pt-1 font-normal text-[10px] md:text-[15px] lg:text-[20px] '>This widget gives you a birds-eye view of crypto. Segment by type of coin, market cap, recent performance and more.</p>
                    </div>
                    <div className=' w-full mt-10 '>
                        <CryptoHeatmapWidget />
                    </div>
                </motion.div>
                <motion.div
                    initial={{ x: "-100vw" }}
                    animate={{ x: 0 }}
                    transition={{ type: "spring", duration: 1.6, delay: 0.5, ease: "easeInOut" }}
                    className=' mt-6 px-10 w-full items-center'>
                    <div className=' flex flex-col justify-start'>
                        <h1 className=' font-semibold text-[20px] md:text-[25px] lg:text-[30px] '>Forex Cross Rates </h1>
                        <p className=' pt-1 font-normal text-[10px] md:text-[15px] lg:text-[20px] '>This one allows you to display real-time quotes of selected currencies in comparison to other major currencies.</p>
                    </div>
                    <div className=' w-full mt-10 '>
                        <ForexCrossRatesWidget />
                    </div>
                </motion.div>
                <motion.div
                    initial={{ x: "100vw" }}
                    animate={{ x: 0 }}
                    transition={{ type: "spring", duration: 1.6, delay: 0.5, ease: "easeInOut" }}
                    className=' mt-6 px-10 w-full items-center'>
                    <div className=' flex flex-col justify-start'>
                        <h1 className=' font-semibold text-[20px] md:text-[25px] lg:text-[30px] '>Forex Heatmap </h1>
                        <p className=' pt-1 font-normal text-[10px] md:text-[15px] lg:text-[20px] '>This widget lets you spot strong and weak currencies and see how they compare to each other, all in real-time.</p>
                    </div>
                    <div className=' w-full mt-10 '>
                        <ForexHeatMapWidget />
                    </div>
                </motion.div>
            </div>
            <TickerTape />
        </main>
    )
}

export default Heatmap