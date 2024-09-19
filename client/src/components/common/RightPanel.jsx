import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import useFollow from "../../hooks/useFollow";
import "../../styles.css";
import RightPanelSkeleton from "../skeletons/RightPanelSkeleton";
import LoadingSpinner from "./LoadSpinner";

const RightPanel = () => {
    const { data: suggestedUser, isLoading } = useQuery({
        queryKey: ['suggestedUser'],
        queryFn: async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/users/suggested");
                const data = res.data;

                if (res.status !== 200) throw new Error(data.error || "Something Went Wrong!!");
                return data;
            } catch (error) {
                throw new Error(error.message);
            }
        }
    });

    const { follow, isPending } = useFollow();

    if (suggestedUser?.length === 0) return <div className=" md:w-64 w-0"></div>

    return (
        <motion.div
            initial={{ x: 200 }}
            animate={{ x: 0, scale: 1, opacity: 1 }}
            transition={{ delay: 0.09, duration: 0.7 }}
            className='hidden lg:block homeBg3 '>
            <div className=' bg-[#4D555B] p-4 rounded-md sticky top-1'>
                <p className='font-bold text-center text-secondary'>Suggested for you</p>
                <div className='flex mt-4 flex-col gap-4'>
                    {/* item */}
                    {isLoading && (
                        <>
                            <RightPanelSkeleton />
                            <RightPanelSkeleton />
                            <RightPanelSkeleton />
                            <RightPanelSkeleton />
                        </>
                    )}
                    {!isLoading &&
                        suggestedUser?.map((user) => (
                            <Link
                                to={`/profile/${user.username}`}
                                className='flex items-center justify-between gap-4'
                                key={user._id}
                            >
                                <div className='flex gap-2 items-center'>
                                    <div className='avatar'>
                                        <div className='w-8 rounded-full'>
                                            <img src={user.profileImg || "/avatar-placeholder.png"} />
                                        </div>
                                    </div>
                                    <div className='flex flex-col'>
                                        <span className='font-semibold tracking-tight text-secondary truncate w-28'>
                                            {user.fullname}
                                        </span>
                                        <span className='text-sm text-slate-300'>@{user.username}</span>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        className='btn bg-white text-black hover:bg-white hover:opacity-90 rounded-full btn-sm'
                                        onClick={(e) => {
                                            e.preventDefault();
                                            follow({ userId: user._id, fullname: user.fullname, username: user.username });
                                        }}
                                    >
                                        {isPending ? <LoadingSpinner size="md" /> : "Follow"}
                                    </button>
                                </div>
                            </Link>
                        ))}
                </div>
            </div>
        </motion.div>
    );
};
export default RightPanel;