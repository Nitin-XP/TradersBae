import React from 'react'
import TickerTape from '../ticker/TickerTape'
import CryptoScreener from './CryptoScreener'
import ForexScreener from './ForexScreener'

const Screener = () => {
    return (
        <>
            <main className=' max-w-full w-full font-serif bg-yellow-100'>
                <div className=' py-4 flex flex-col justify-center items-center'>
                    <h1 className=' font-bold text-[20px] md:text-[25px] lg:text-[30px] '>Screeners</h1>
                </div>
                <div className=' flex flex-col mb-6'>
                    <div className=' mt-5 px-10 w-full items-center'>
                        <div className=' flex flex-col justify-start'>
                            <h1 className=' font-semibold text-[20px] md:text-[25px] lg:text-[30px] '>Forex Screener</h1>
                            <p className=' pt-1 font-normal text-[10px] md:text-[15px] lg:text-[20px] '>Separate the wheat from the chaff with this embeddable Screener – handy for sorting symbols both by fundamental and technical indicators.</p>
                            <p className=' mt-4 font-normal text-[10px] md:text-[15px] lg:text-[20px] '>Click on  <span className=' font-semibold '>Ticker</span> to see Forex Pairs.</p>
                        </div>
                        <div className=' w-full mt-5'>
                            <ForexScreener />
                        </div>
                    </div>
                    <div className=' mt-10 px-10 w-full items-center'>
                        <div className=' flex flex-col justify-start'>
                            <h1 className=' font-semibold text-[20px] md:text-[25px] lg:text-[30px] '>Cryptocurrency Market</h1>
                            <p className=' pt-1 font-normal text-[10px] md:text-[15px] lg:text-[20px] '>Displaying you the crypto assets and then sorts them by their market capitalization.</p>
                        </div>
                        <div className=' w-full mt-5'>
                            <CryptoScreener />
                        </div>
                    </div>
                </div>
                <TickerTape />
            </main>
        </>
    )
}

export default Screener