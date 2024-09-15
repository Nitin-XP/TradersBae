import { motion } from 'framer-motion'
import React from 'react'
import { Link } from 'react-router-dom'
import { logo } from '../components/svgs/X'

const Landing = () => {
    return (
        <div className=' w-full bg-black h-screen overflow-hidden'>
            {/* Navbar */}
            <motion.div
                initial={{ y: -200, opacity: 0.4 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, }}
                className="navbar bg-black text-white ">
                <div className="navbar-start">
                    <Link to='/' className="btn btn-ghost font-serif font-bold text-xl text-yellow-300">Trader's Bae</Link>
                </div>
                <div className="navbar-end hidden xs:flex">
                    <ul className="menu menu-horizontal px-1 font-serif font-semibold">
                        <li><Link to='/login'>Login</Link></li>
                        <li><Link to='/signup' >Sign Up</Link></li>
                    </ul>
                </div>
            </motion.div>
            {/* Body */}
            <motion.div
                initial={{ opacity: 0.2 }}
                animate={{ opacity: 1 }}
                className=' bg-black flex flex-wrap items-center justify-center xs:mt-[10%] sm:mt-[20%] md:mt-[14%] lg:mt-[8%] '>
                <motion.div
                    initial={{ scale: 0.15, opacity: 0.4 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.19, type: 'spring', stiffness: 100 }}
                    className=' flex mx-3'>
                    <img className=' 2xs:w-[150px] 2xs:h-[150px] sm:w-[200px] sm:h-[200px] ' src={logo} alt="Logo" />
                </motion.div>
                <motion.div
                    initial={{ x: 200, opacity: 0.4 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.09, type: 'spring', stiffness: 100 }}
                    className=' flex flex-col items-center justify-center text-center text-secondary m-2 px-5 font-serif sm:text-md md:text-lg lg:text-xl xl:text-2xl '>
                    <h1>Welcome to Trader's Bae.</h1>
                    <p><Link to={`/signup`} className=' text-yellow-300' >Click Here</Link> to become a part of our amazing community!</p>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default Landing