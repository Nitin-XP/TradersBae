import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { BiLogOut } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { MdHomeFilled } from "react-icons/md";
import { Link } from "react-router-dom";
import { logo } from "../svgs/X";

const Sidebar = () => {
    const queryClient = useQueryClient();

    const { mutate: logout } = useMutation({
        mutationFn: async () => {
            try {
                const res = await axios.post("http://localhost:8000/api/auth/logout");
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
        <div className='md:flex-[2_2_0] w-18 max-w-52 bg-slate-100'>
            <div className='sticky top-0 left-0 h-screen flex flex-col border-r border-secondary w-20 md:w-full'>
                <Link to='/' className='flex justify-center md:justify-start'>
                    <img src={logo} className='px-2 w-[130px] h-[120px] rounded-full fill-white hover:bg-stone-900' />
                </Link>
                <ul className='flex flex-col gap-3 justify-center mt-4'>
                    <li className='flex justify-center md:justify-start'>
                        <Link
                            to='/'
                            className='flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
                        >
                            <MdHomeFilled className='w-8 h-8 text-primary' />
                            <span className='text-lg font-semibold text-primary hidden md:block'>Home</span>
                        </Link>
                    </li>
                    <li className='flex justify-center md:justify-start'>
                        <Link
                            to='/notifications'
                            className='flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
                        >
                            <IoNotifications className='w-6 h-6 text-primary' />
                            <span className='text-lg font-semibold text-primary hidden md:block'>Notifications</span>
                        </Link>
                    </li>

                    <li className='flex justify-center md:justify-start'>
                        <Link
                            to={`/profile/${authUser?.username}`}
                            className='flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
                        >
                            <FaUser className='w-6 h-6 text-primary' />
                            <span className='text-lg font-semibold text-primary hidden md:block'>Profile</span>
                        </Link>
                    </li>
                </ul>
                {authUser && (
                    <Link
                        to={`/profile/${authUser.username}`}
                        className='mt-auto mb-10 flex gap-2 items-start transition-all duration-300 hover:bg-[#181818] py-2 px-4 rounded-full'
                    >
                        <div className='avatar hidden md:inline-flex'>
                            <div className='w-8 rounded-full'>
                                <img src={authUser?.profileImg || "/avatar-placeholder.png"} />
                            </div>
                        </div>
                        <div className='flex justify-between flex-1'>
                            <div className='hidden md:block'>
                                <p className='text-white font-bold text-sm w-20 truncate'>{authUser?.fullname}</p>
                                <p className='text-slate-500 text-sm'>@{authUser?.username}</p>
                            </div>
                            <BiLogOut className='w-5 h-5 text-primary cursor-pointer'
                                onClick={(e) => {
                                    e.preventDefault();
                                    logout();
                                }}
                            />
                        </div>
                    </Link>
                )}
            </div>
        </div>
    );
};
export default Sidebar;