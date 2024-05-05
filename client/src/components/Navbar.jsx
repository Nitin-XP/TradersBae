import { motion } from 'framer-motion'
import React from 'react'
import { Link } from 'react-router-dom'
import { navlinks } from '../Constants/constant'
import logo from "../assets/Logo.png"

const Navbar = () => {

    return (
        <div>
            <div className="drawer ">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col text-white">
                    {/* Navbar */}
                    <div className="w-full navbar navBg">
                        <div className="flex-none lg:hidden">
                            <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            </label>
                        </div>
                        <motion.img initial={{ x: -100 }} animate={{ x: 0 }} transition={{ duration: 3 }} src={logo} alt="logo" className=' w-20 h-20' />
                        <motion.div initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 3 }} className="flex-1 px-2 mx-2 text-white font-bold text-[24px]">Trader's Bae</motion.div>
                        <motion.div initial={{ x: 1000 }} animate={{ x: 0 }} transition={{ duration: 1 }} className="flex-none hidden lg:block">
                            <ul className="menu menu-horizontal font-semibold text-[20px]">
                                {
                                    navlinks.map((navlink, index) => (
                                        <li key={index}><Link to={navlink.link}>{navlink.name}</Link></li>
                                    ))
                                }
                            </ul>
                        </motion.div>
                    </div>
                </div>
                <div className="drawer-side navbg text-white">
                    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full items-center justify-center sidebar">
                        {
                            navlinks.map((navlink, index) => (
                                <li key={index} className="font-bold text-[20px]"><Link to={navlink.link}>{navlink.name}</Link></li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar