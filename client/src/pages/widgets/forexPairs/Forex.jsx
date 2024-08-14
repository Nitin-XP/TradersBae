import React from 'react'
import { Link } from 'react-router-dom'
import { Pair } from './Pairs'

const pairsLeft = ["FX:EURUSD", "FX:USDJPY", "FX:GBPUSD", "FX:GBPJPY", "FX:AUDUSD"]
const pairsRight = ["XAUUSD", "OANDA:XAGUSD", "FX:EURJPY", "NASDAQ:NDX", "BSE:SENSEX"]
const Forex = () => {
    return (
        <div className=' max-w-full w-full flex flex-col'>
            <div className=' py-4 flex flex-col justify-center items-center'>
                <h1 className=' font-bold text-[20px] md:text-[25px] lg:text-[30px] '>Forex</h1>
                <p className=' pt-1 font-semibold text-[10px] md:text-[15px] lg:text-[20px] '>Here is your Real Tool!</p>
            </div>
            <div className=' w-full flex flex-wrap px-2'>
                <div className=' p-5 mt-4 flex flex-col justify-center gap-3 w-1/3 '>
                    {
                        pairsLeft.map((pair) => (
                            <div key={pair} className='w-full bg-white rounded-xl px-3 mt-1 hidden lg:inline-block '>
                                <Pair pairName={pair} />
                            </div>
                        ))
                    }
                </div>
                <div className=' p-5 bg-yellow-200 mt-4 flex flex-wrap justify-center gap-3 w-full lg:w-1/3'>
                    <div>
                        <h1>Heiyebe </h1>
                        <Link to={"/widgets/forex/chart"}><h2>Click Here to Go to the Chart Section.</h2></Link>
                    </div>
                </div>
                <div className=' p-5 mt-4 flex flex-col justify-center gap-3 w-1/3 '>
                    {
                        pairsRight.map((pair) => (
                            <div key={pair} className='w-full bg-white rounded-xl px-3 mt-1 hidden lg:inline-block '>
                                <Pair pairName={pair} />
                            </div>
                        ))
                    }
                </div>

            </div>
        </div>
    )
}

export default Forex