import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Posts from "../../components/common/Posts";
import ProfileHeaderSkeleton from "../../components/skeletons/ProfileHeaderSkeleton";
import EditProfileModal from "./EditProfileModal";

import { POSTS } from "../../utils/db/dummy";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { FaLink } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import useFollow from "../../hooks/useFollow";
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
                const res = await axios.get(`http://localhost:8000/api/users/profile/${username}`);
                const data = res.data;
                if (res.status !== 200) throw new Error(data.error || `Something Went Wrong!`);
                return data;
            } catch (error) {
                throw new Error(error);
            }
        }
    });

    const { mutate: updateProfile, isPending: isUpdatingProfile } = useMutation({
        mutationFn: async () => {
            try {
                const res = await axios.post(`http://localhost:8000/api/users/update/`, { coverImg, profileImg });
                const data = res.data;

                if (res.status !== 200) throw new Error(data.error || `Something Went Wrong!`);
                return data;
            } catch (error) {
                throw new Error(error);
            }
        },
        onSuccess: () => {
            toast.success("Profile Updated Succefully!!");
            queryClient.invalidateQueries({ queryKey: ['authUser'] });
            queryClient.invalidateQueries({ queryKey: ['userProfile'] });
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

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
            <div className='flex-[4_4_0]  border-r border-secondary min-h-screen '>
                {/* HEADER */}
                {isLoading && !isRefetching && <ProfileHeaderSkeleton />}
                {!isLoading && !isRefetching && !user && <p className='text-center text-lg mt-4'>User not found</p>}
                <div className='flex flex-col'>
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
                                        className='absolute top-2 right-2 rounded-full p-2 bg-secondary bg-opacity-75 cursor-pointer opacity-0 group-hover/cover:opacity-100 transition duration-200'
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
                                                    className='w-4 h-4 text-black'
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
                                        className='btn btn-primary rounded-full btn-sm text-black px-4 ml-2'
                                        onClick={() => updateProfile()}
                                    >
                                        {isUpdatingProfile ? "Updating..." : "Update"}
                                    </button>
                                )}
                            </div>

                            <div className='flex flex-col gap-4 mt-14 px-4'>
                                <div className='flex flex-col text-primary'>
                                    <span className='font-bold text-lg'>{user?.fullname}</span>
                                    <span className='text-sm'>@{user?.username}</span>
                                    <span className='text-sm my-1'>{user?.bio}</span>
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
                                                    className='text-sm text-blue-500 hover:underline'
                                                >
                                                    {user.link}
                                                </a>
                                            </>
                                        </div>
                                    )}
                                    <div className='flex gap-2 items-center'>
                                        <IoCalendarOutline className='w-4 h-4 text-primary' />
                                        <span className='text-sm text-primary'>{formatMemberSinceDate(user?.createdAt)} </span>
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    <div className='flex gap-1 items-center'>
                                        <span className='font-bold text-xs'>{user?.following.length}</span>
                                        <span className='text-primary text-xs'>Following</span>
                                    </div>
                                    <div className='flex gap-1 items-center'>
                                        <span className='font-bold text-xs'>{user?.followers.length}</span>
                                        <span className='text-primary text-xs'>Followers</span>
                                    </div>
                                </div>
                            </div>
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
                                    Likes
                                    {feedType === "likes" && (
                                        <div className='absolute bottom-0 w-10  h-1 rounded-full bg-primary' />
                                    )}
                                </div>
                            </div>
                        </>
                    )}

                    <Posts feedType={feedType} username={username} userId={user?._id} />
                </div>
            </div>
        </>
    );
};
export default ProfilePage;