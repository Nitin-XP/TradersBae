import React from 'react';
import { Link } from 'react-router-dom';
import TickerTape from './ticker/TickerTape';
import { widgets } from './Widgets';


const Widgets = () => {
    return (
        <>
            <main className='max-w-full w-full h-full'>
                <div className=' items-center mt-4 '>
                    <h1 className=' text-center font-bold text-[20px] sm:text-[25px] lg:text-[30px] '>Trader's Toolkits</h1>
                    <h2 className=' text-center mt-2 font-semibold text-[10px] sm:text-[15px] lg:text-[20px]'>Everything You Need to Make Informed Decisions!</h2>
                </div>
                <div className=' my-4 flex flex-wrap justify-center w-full gap-5 max-w-full'>
                    {
                        widgets.map((widget) => (
                            <div key={widget.id} className="card bg-base-100 my-4 w-1/2 sm:w-1/3 lg:w-1/4 rounded-2xl shadow-xl">
                                <div className=" hidden md:inline-block px-10 pt-10">
                                    <img
                                        src={widget.src}
                                        alt={widget.heading}
                                        className=" hidden sm:inline-block rounded-xl" />
                                </div>
                                <div className="card-body items-center text-center">
                                    <h2 className=" font-bold text-pretty card-title mt-2">{widget.heading} </h2>
                                    <p className=' mb-2 text-pretty'>{widget.para} </p>
                                    <div className="card-actions">
                                        <Link to={widget.link}><button className="btn btn-primary rounded-xl">{widget.btnText}</button></Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div >
                <TickerTape />
            </main >
        </>
    );
}

export default Widgets