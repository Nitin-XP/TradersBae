import { motion } from 'framer-motion'
import React from 'react'
import { Link } from 'react-router-dom'
import TickerTape from '../ticker/TickerTape'
import { Pair } from './Pairs'

const pairsLeft = ["FX:EURUSD", "FX:USDJPY", "FX:GBPUSD", "FX:GBPJPY", "FX:AUDUSD"]
const pairsRight = ["XAUUSD", "OANDA:XAGUSD", "FX:EURJPY", "NASDAQ:NDX", "BSE:SENSEX"]
const Forex = () => {
    return (
        <div className=' max-w-full w-full flex flex-col font-serif widgetsBg'>
            <div className=' py-4 flex flex-col justify-center items-center'>
                <motion.h1
                    initial={{ y: "-10vw" }}
                    animate={{ y: 0 }}
                    transition={{ type: "spring", duration: 1.6, delay: 0.5, ease: "easeInOut" }}
                    className=' font-bold text-[20px] md:text-[25px] lg:text-[30px] '>Forex</motion.h1>
                <motion.p
                    initial={{ y: "10vw" }}
                    animate={{ y: 0 }}
                    transition={{ type: "spring", duration: 1.6, delay: 0.5 }}
                    className=' pt-1 font-semibold text-[10px] md:text-[15px] lg:text-[20px] '>Here is your Real Tool!</motion.p>
            </div>
            <div className=' w-full flex flex-wrap-reverse px-2'>
                <div className=' p-5 mt-4 flex flex-col justify-center gap-3 w-full lg:w-1/3 '>
                    {
                        pairsLeft.map((pair) => (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 3, }}
                                key={pair} className='w-full bg-white rounded-xl px-3 mt-1 hidden sm:inline-block '>
                                <Pair pairName={pair} />
                            </motion.div>
                        ))
                    }
                </div>
                <div className=' md:p-5 md:mt-4 flex flex-wrap justify-center items-start md:items-center gap-3 w-full md:w-2/3 lg:w-1/3'>
                    <div className=' flex items-center justify-center'>
                        <h2 className=' font-medium'><Link to={"/widgets/forex/chart"}><span className=' text-blue-800 font-bold'>Click Here</span></Link> to see Chart in Full Screen.</h2>
                    </div>
                </div>
                <div className=' p-5 mt-4 flex flex-col justify-center gap-3 w-1/3 '>
                    {
                        pairsRight.map((pair) => (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 3, }}
                                key={pair} className='w-full bg-white rounded-xl px-3 mt-1 hidden lg:inline-block '>
                                <Pair pairName={pair} />
                            </motion.div>
                        ))
                    }
                </div>
            </div>
            <TickerTape />
        </div>
    )
}

export default Forex