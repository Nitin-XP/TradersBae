import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import React from "react";
import toast from "react-hot-toast";
import { BiLogOut } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { MdHomeFilled, MdWidgets } from "react-icons/md";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../Constants/constant";
import "../../styles.css";
import { logo } from "../svgs/X";

const Sidebar = () => {
    const queryClient = useQueryClient();

    const { mutate: logout } = useMutation({
        mutationFn: async () => {
            try {
                const res = await axios.post(BASE_URL + "/api/auth/logout");
                if (res.status !== 200) throw new Error(res.data.error || "Something Went Wrong!!");
            } catch (error) {
                throw new Error(error.response?.data?.error || error.message);
            }
        },
        onSuccess: () => {
            toast.success("Logged Out successfully!! Reload to Refresh!");
            queryClient.invalidateQueries({ queryKey: ['authUser'] });
        },
        onError: () => {
            toast.error("Logout Failed!!");
        }
    });

    const { data: authUser } = useQuery({ queryKey: ['authUser'] })

    return (
        <motion.div
            initial={{ x: -200 }}
            animate={{ x: 0, scale: 1, opacity: 1 }}
            transition={{ delay: 0.09, duration: 0.7 }}
            className='md:flex-[2_2_0] w-18 max-w-52 bg-[#012538]'>
            <div className='sticky top-0 left-0 h-screen flex flex-col border-r border-secondary w-20 md:w-full'>
                <Link to='/' className='flex justify-center md:justify-start'>
                    <img src={logo} className='px-2 w-[130px] h-[120px] rounded-full fill-white ' />
                </Link>
                <ul className='flex flex-col gap-3 justify-center mt-4'>
                    <li className='flex justify-center md:justify-start'>
                        <Link
                            to='/home'
                            className='flex gap-3 items-center text-secondary transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
                        >
                            <MdHomeFilled className='w-8 h-8 ' />
                            <span className='text-lg font-semibold hidden md:block'>Home</span>
                        </Link>
                    </li>
                    <li className='flex justify-center md:justify-start'>
                        <Link
                            to='/notifications'
                            className='flex gap-3 items-center text-secondary transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
                        >
                            <IoNotifications className='w-6 h-6' />
                            <span className='text-lg font-semibold hidden md:block'>Notifications</span>
                        </Link>
                    </li>

                    <li className='flex justify-center md:justify-start'>
                        <Link
                            to={`/profile/${authUser?.username}`}
                            className='flex gap-3 items-center text-secondary transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
                        >
                            <FaUser className='w-6 h-6 ' />
                            <span className='text-lg font-semibold hidden md:block'>Profile</span>
                        </Link>
                    </li>
                    <li className='flex justify-center md:justify-start'>
                        <Link
                            to={`/widgets`}
                            className='flex gap-3 items-center text-secondary transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
                        >
                            <MdWidgets className='w-6 h-6 ' />
                            <span className='text-lg font-semibold hidden md:block'>Widgets</span>
                        </Link>
                    </li>
                </ul>
                {authUser && (
                    <Link
                        to={`/profile/${authUser.username}`}
                        className='mt-auto mb-10 flex gap-2 items-start transition-all duration-300 text-secondary py-2 px-4 rounded-full'
                    >
                        <div className='avatar hidden md:inline-flex'>
                            <div className='w-8 rounded-full'>
                                <img src={authUser?.profileImg || "/avatar-placeholder.png"} />
                            </div>
                        </div>
                        <div className='flex justify-between flex-1'>
                            <div className='hidden md:block'>
                                <p className='font-bold text-sm w-20 truncate'>{authUser?.fullname}</p>
                                <p className='text-slate-300 text-sm'>@{authUser?.username}</p>
                            </div>
                            <BiLogOut className='w-5 h-5 hover:bg-black cursor-pointer'
                                onClick={(e) => {
                                    e.preventDefault();
                                    logout();
                                }}
                            />
                        </div>
                    </Link>
                )}
            </div>
        </motion.div>
    );
};
export default Sidebar;