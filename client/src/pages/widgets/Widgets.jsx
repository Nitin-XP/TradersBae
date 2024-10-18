import { motion } from 'framer-motion';
import React from 'react';
import { Link } from 'react-router-dom';
import TickerTape from './ticker/TickerTape';
import { widgets } from './Widgets';

const Widgets = () => {
    return (
        <>
            <main className='max-w-full font-serif w-full widgetsBg h-full'>
                <div className=' items-center mt-4 '>
                    <motion.h1
                        initial={{ y: "-10vw" }}
                        animate={{ y: 0 }}
                        transition={{ type: "spring", duration: 1.6, delay: 0.5, ease: "easeInOut" }}
                        className=' text-center font-bold text-[20px] sm:text-[25px] lg:text-[30px] '>Trader's Toolkits</motion.h1>
                    <motion.h2
                        initial={{ y: "10vw" }}
                        animate={{ y: 0 }}
                        transition={{ type: "spring", duration: 1.6, delay: 0.5 }}
                        className=' text-center mt-2 font-semibold text-[10px] sm:text-[15px] lg:text-[20px]'>Everything You Need to Make Informed Decisions!</motion.h2>
                </div>
                <div className=' my-4 flex flex-wrap justify-center w-full gap-5 max-w-full'>
                    {
                        widgets.map((widget) => (
                            <motion.div
                                whileHover={{ rotateX: -5, rotateY: 15 }}
                                transition={{ duration: 0.3 }}
                                key={widget.id} className="card bg-yellow-100 my-4 w-1/2 sm:w-1/3 lg:w-1/4 rounded-2xl shadow-xl">
                                <div className=" hidden md:inline-block px-10 pt-10">
                                    <img
                                        src={widget.src}
                                        alt={widget.heading}
                                        className=" hidden sm:inline-block rounded-xl" />
                                </div>
                                <motion.div
                                    initial={{ y: "-10vw", opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ ease: "easeOut", duration: 0.9 }}
                                    className="card-body items-center text-center">
                                    <h2 className=" font-bold text-pretty card-title mt-2">{widget.heading} </h2>
                                    <p className=' mb-2 text-pretty'>{widget.para} </p>
                                    <div className="card-actions">
                                        <Link to={widget.link}><button className="btn btn-primary rounded-xl">{widget.btnText}</button></Link>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))
                    }
                </div >
                <TickerTape />
            </main >
        </>
    );
}

export default Widgets