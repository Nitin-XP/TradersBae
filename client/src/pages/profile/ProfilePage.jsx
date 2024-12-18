import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Posts from "../../components/common/Posts";
import ProfileHeaderSkeleton from "../../components/skeletons/ProfileHeaderSkeleton";
import EditProfileModal from "./EditProfileModal";

import { POSTS } from "../../utils/db/dummy";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FaLink } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import RightPanel from "../../components/common/RightPanel";
import { BASE_URL } from "../../Constants/constant";
import useFollow from "../../hooks/useFollow";
import useUpdateUserProfile from "../../hooks/useUpdateUserProfile";
import { formatMemberSinceDate } from "../../utils/date";

const ProfilePage = () => {
    const [coverImg, setCoverImg] = useState(null);
    const [profileImg, setProfileImg] = useState(null);
    const [feedType, setFeedType] = useState("posts");

    const coverImgRef = useRef(null);
    const profileImgRef = useRef(null);

    const queryClient = useQueryClient();

    const { username } = useParams(); // Passed in app.jsx /:username

    const { follow, isPending } = useFollow();

    const { data: user, isLoading, refetch, isRefetching } = useQuery({
        queryKey: ['userProfile'],
        queryFn: async () => {
            try {
                const res = await axios.get(BASE_URL + `/api/users/profile/${username}`);
                const data = res.data;
                if (res.status !== 200) throw new Error(data.error || `Something Went Wrong!`);
                return data;
            } catch (error) {
                throw new Error(error);
            }
        }
    });

    const { isUpdatingProfile, updateProfile } = useUpdateUserProfile();

    const { data: authUser } = useQuery({ queryKey: ['authUser'] })
    const isMyProfile = authUser._id === user?._id;

    const amIFollowing = authUser?.following.includes(user?._id);

    useEffect(() => {
        refetch();
    }, [username, refetch]);

    const handleImgChange = (e, state) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                state === "coverImg" && setCoverImg(reader.result);
                state === "profileImg" && setProfileImg(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };


    return (
        <>
            <div className='flex-[4_4_0] border-r border-secondary min-h-screen '>
                {/* HEADER */}
                {isLoading && !isRefetching && <ProfileHeaderSkeleton />}
                {!isLoading && !isRefetching && !user && <p className='text-center text-lg mt-4'>User not found</p>}
                <div className='flex homeBg3 flex-col'>
                    {!isLoading && !isRefetching && user && (
                        <>
                            <div className='flex gap-10 px-4 py-2 items-center'>
                                <Link to='/'>
                                    <FaArrowLeft className='w-4 h-4' />
                                </Link>
                                <div className='flex flex-col'>
                                    <p className='font-bold text-lg text-primary'>{user?.fullname}</p>
                                    <span className='text-sm text-primary'>{POSTS?.length} posts</span>
                                </div>
                            </div>
                            {/* COVER IMG */}
                            <div className='relative group/cover'>
                                <img
                                    src={coverImg || user?.coverImg || "/cover.png"}
                                    className='h-52 w-full object-cover'
                                    alt='cover image'
                                />
                                {isMyProfile && (
                                    <div
                                        className='absolute top-2 right-2 rounded-full p-2 bg-primary text-secondary bg-opacity-75 cursor-pointer opacity-0 group-hover/cover:opacity-100 transition duration-200'
                                        onClick={() => coverImgRef.current.click()}
                                    >
                                        <MdEdit className='w-5 h-5 text-white' />
                                    </div>
                                )}

                                <input
                                    type='file'
                                    hidden
                                    accept="image/*"
                                    ref={coverImgRef}
                                    onChange={(e) => handleImgChange(e, "coverImg")}
                                />
                                <input
                                    type='file'
                                    hidden
                                    accept="image/*"
                                    ref={profileImgRef}
                                    onChange={(e) => handleImgChange(e, "profileImg")}
                                />
                                {/* USER AVATAR */}
                                <div className='avatar absolute -bottom-16 left-4'>
                                    <div className='w-32 rounded-full relative group/avatar'>
                                        <img src={profileImg || user?.profileImg || "/avatar-placeholder.png"} />
                                        <div className='absolute top-5 right-3 p-1 bg-primary rounded-full group-hover/avatar:opacity-100 opacity-0 cursor-pointer'>
                                            {isMyProfile && (
                                                <MdEdit
                                                    className='w-4 h-4 text-secondary'
                                                    onClick={() => profileImgRef.current.click()}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-end px-4 mt-5'>
                                {isMyProfile && <EditProfileModal authUser={authUser} />}
                                {!isMyProfile && (
                                    <button
                                        className='btn btn-outline rounded-full btn-sm'
                                        onClick={() => follow({ userId: user?._id, username: user?.username, fullname: user?.fullname })}
                                    >
                                        {isPending && "Loading..."}
                                        {!isPending && amIFollowing && "Unfollow"}
                                        {!isPending && !amIFollowing && "Follow"}
                                    </button>
                                )}
                                {(coverImg || profileImg) && (
                                    <button
                                        className='btn btn-primary rounded-full btn-sm text-white px-4 ml-2'
                                        onClick={async () => {
                                            await updateProfile({ coverImg, profileImg });
                                            setCoverImg(null);
                                            setProfileImg(null);
                                        }}
                                    >
                                        {isUpdatingProfile ? "Updating..." : "Update"}
                                    </button>
                                )}
                            </div>

                            <div className='flex flex-col gap-4 mt-14 px-4'>
                                <div className='flex flex-col text-primary'>
                                    <span className='font-bold text-[20px] md:text-[30px] '>{user?.fullname}</span>
                                    <span className='text-[10px] md:text-[20px] '>@{user?.username}</span>
                                    <span className='text-[10px] md:text-[20px] my-1'>{user?.bio}</span>
                                </div>

                                <div className='flex gap-2 flex-wrap'>
                                    {user?.link && (
                                        <div className='flex gap-1 items-center '>
                                            <>
                                                <FaLink className='w-3 h-3 text-primary' />
                                                <a
                                                    href={user.link}
                                                    target='_blank'
                                                    rel='noreferrer'
                                                    className='text-[16px] text-blue-500 hover:underline'
                                                >
                                                    {user.link}
                                                </a>
                                            </>
                                        </div>
                                    )}
                                    <div className='flex gap-2 items-center'>
                                        <IoCalendarOutline className='w-4 h-4 text-primary' />
                                        <span className='text-[16px] text-primary'>{formatMemberSinceDate(user?.createdAt)} </span>
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    <div className='flex gap-1 items-center'>
                                        <span className='font-bold text-[16px]'>{user?.following.length}</span>
                                        <span className='text-primary text-[16px]'>Following</span>
                                    </div>
                                    <div className='flex gap-1 items-center'>
                                        <span className='font-bold text-[16px]'>{user?.followers.length}</span>
                                        <span className='text-primary text-[16px]'>Followers</span>
                                    </div>
                                </div>
                            </div>

                            {/* POSTS, LIKED POSTS & SAVED POSTS */}
                            <div className='flex w-full border-b border-primary mt-4'>
                                <div
                                    className='flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 relative cursor-pointer'
                                    onClick={() => setFeedType("posts")}
                                >
                                    Posts
                                    {feedType === "posts" && (
                                        <div className='absolute bottom-0 w-10 h-1 rounded-full bg-primary' />
                                    )}
                                </div>
                                <div
                                    className='flex justify-center flex-1 p-3 text-primary hover:bg-secondary transition duration-300 relative cursor-pointer'
                                    onClick={() => setFeedType("likes")}
                                >
                                    Liked Posts
                                    {feedType === "likes" && (
                                        <div className='absolute bottom-0 w-10  h-1 rounded-full bg-primary' />
                                    )}
                                </div>
                                {isMyProfile && <div
                                    className='flex justify-center flex-1 p-3 text-primary hover:bg-secondary transition duration-300 relative cursor-pointer'
                                    onClick={() => setFeedType("saves")}
                                >
                                    Saved Posts
                                    {feedType === "saves" && (
                                        <div className='absolute bottom-0 w-10  h-1 rounded-full bg-primary' />
                                    )}
                                </div>}
                            </div>
                        </>
                    )}

                    <Posts feedType={feedType} username={username} userId={user?._id} />
                </div>
            </div>
            <RightPanel />
        </>
    );
};
export default ProfilePage;