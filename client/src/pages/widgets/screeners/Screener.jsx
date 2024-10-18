import { motion } from 'framer-motion'
import React from 'react'
import TickerTape from '../ticker/TickerTape'
import CryptoScreener from './CryptoScreener'
import ForexScreener from './ForexScreener'

const Screener = () => {
    return (
        <>
            <main className=' max-w-full w-full font-serif bg-yellow-100'>
                <div className=' py-4 flex flex-col justify-center items-center'>
                    <motion.h1
                        initial={{ y: "-10vw" }}
                        animate={{ y: 0 }}
                        transition={{ type: "spring", duration: 1.6, ease: "easeInOut" }}
                        className=' font-bold text-[20px] md:text-[25px] lg:text-[30px] text-blue-800 '>Screeners</motion.h1>
                </div>
                <div className=' flex flex-col mb-6'>
                    <div className=' mt-5 px-10 w-full items-center'>
                        <motion.div
                            initial={{ y: "10vw" }}
                            animate={{ y: 0 }}
                            transition={{ type: "spring", duration: 1.6, delay: 0.5, }}
                            className=' flex flex-col justify-start'>
                            <h1 className=' font-semibold text-[20px] md:text-[25px] lg:text-[30px] '>Forex Screener</h1>
                            <p className=' pt-1 font-normal text-[10px] md:text-[15px] lg:text-[20px] '>Separate the wheat from the chaff with this embeddable Screener – handy for sorting symbols both by fundamental and technical indicators.</p>
                            <p className=' mt-4 font-normal text-[10px] md:text-[15px] lg:text-[20px] '>Click on  <span className=' font-semibold '>Ticker</span> to see Forex Pairs.</p>
                        </motion.div>
                        <motion.div
                            initial={{ x: "100vw" }}
                            animate={{ x: 0 }}
                            transition={{ type: "spring", duration: 3.6, ease: "easeInOut" }}
                            className=' w-full mt-5'>
                            <ForexScreener />
                        </motion.div>
                    </div>
                    <div className=' mt-10 px-10 w-full items-center'>
                        <motion.div
                            initial={{ y: "10vw", }}
                            animate={{ y: 0 }}
                            transition={{ type: "spring", duration: 1.6, delay: 0.5, }}
                            className=' flex flex-col justify-start'>
                            <h1 className=' font-semibold text-[20px] md:text-[25px] lg:text-[30px] '>Cryptocurrency Market</h1>
                            <p className=' pt-1 font-normal text-[10px] md:text-[15px] lg:text-[20px] '>Displaying you the crypto assets and then sorts them by their market capitalization.</p>
                        </motion.div>
                        <motion.div
                            initial={{ x: "-100vw", opacity: 0 }}
                            animate={{ x: 0, opacity: 2 }}
                            transition={{ type: "spring", duration: 3.6, ease: "easeInOut" }}
                            className=' w-full mt-5'>
                            <CryptoScreener />
                        </motion.div>
                    </div>
                </div>
                <TickerTape />
            </main>
        </>
    )
}

export default Screener