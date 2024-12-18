import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { FaBookmark, FaHeart, FaRegComment, FaTrash } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../Constants/constant.js";
import { formatPostDate } from "../../utils/date/index.js";
import LoadingSpinner from "./LoadSpinner";

const Post = ({ post }) => {
    const [comment, setComment] = useState("");

    const { data: authUser } = useQuery({ queryKey: ['authUser'] });
    const queryClient = useQueryClient();

    const postOwner = post.user;
    const isLiked = post.likes.includes(authUser._id);
    const isSaved = post.saves.includes(authUser._id);

    const isMyPost = authUser._id === post.user._id;

    const formattedDate = formatPostDate(post.createdAt);

    const { mutate: deletePost, isPending: isDeleting } = useMutation({
        mutationFn: async () => {
            try {
                const res = await axios.post(BASE_URL + `/api/posts/${post._id}`);
                const data = res.data;

                if (res.status !== 200) throw new Error(data.error || "Something Went Wrong!!");
                return data;
            } catch (error) {
                throw new Error(error);
            }
        },
        onSuccess: () => {
            toast.success("Post Deleted Successfully!!");
            // Invalidating query to refetch data
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        }
    });

    const { mutate: likePost, isPending: isLiking } = useMutation({
        mutationFn: async () => {
            try {
                const res = await axios.post(BASE_URL + `/api/posts/like/${post._id}`);
                const data = res.data;

                if (res.status !== 200) throw new Error(data.error || "Something Went Wrong!!");
                return data;
            } catch (error) {
                throw new Error(error);
            }
        },
        onSuccess: (updatedLikes) => {
            // queryClient.invalidateQueries({ queryKey: ['posts'] }); // reloads on liking

            queryClient.setQueryData(['posts'], (oldData) => {
                return oldData.map(p => {
                    if (p._id === post._id) {
                        return { ...p, likes: updatedLikes };
                    }
                    return p;
                });
            });
        }
    });

    const { mutate: commentPost, isPending: isCommenting } = useMutation({
        mutationFn: async () => {
            try {
                const res = await axios.post(BASE_URL + `/api/posts/comments/${post._id}`, { text: comment });
                const data = res.data;

                if (res.status !== 200) throw new Error(data.error || "Something Went Wrong!!");

                return data;
            } catch (error) {
                throw new Error(error);
            }
        },
        onSuccess: () => {
            toast.success("Comment Posted Successfully!!");
            setComment('');
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })

    const { mutate: savePost, isPending: isSaving } = useMutation({
        mutationFn: async () => {
            try {
                const res = await axios.post(BASE_URL + `/api/posts/save/${post._id}`);
                const data = await res.data;
                if (res.status !== 200) throw new Error(data.error || "Something Went Wrong!!");
                return data;
            } catch (error) {
                throw new Error(error);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        }
    });

    const handleDeletePost = () => {
        if (confirm("Delete Post?")) {
            deletePost();
        }
    };

    const handlePostComment = (e) => {
        e.preventDefault();
        if (isCommenting) return;
        commentPost();
    };

    const handleLikePost = () => {
        if (isLiking) return;
        likePost();
    };
    const handleSavePost = () => {
        if (isSaving) return;
        savePost();
    };

    return (
        <>
            <div className='flex gap-2 items-start p-4 border-[4px] hover:drop-shadow-2xl my-4 mx-1 rounded-[30px] postBg border-none'>
                <div className='avatar'>
                    <Link to={`/profile/${postOwner.username}`} className='w-8 rounded-full overflow-hidden'>
                        <img src={postOwner.profileImg || "/avatar-placeholder.png"} />
                    </Link>
                </div>
                <div className='flex flex-col flex-1'>
                    <div className='flex gap-2 items-center'>
                        <Link to={`/profile/${postOwner.username}`} className='font-bold text-primary'>
                            {postOwner.fullname}
                        </Link>
                        <span className=' text-primary flex gap-1 font-semibold text-sm'>
                            <Link to={`/profile/${postOwner.username}`}>@{postOwner.username}</Link>
                            <span>·</span>
                            <span>{formattedDate}</span>
                        </span>
                        {isMyPost && (
                            <span className='flex justify-end flex-1'>
                                {!isDeleting && <FaTrash className='cursor-pointer text-primary hover:text-red-500' onClick={handleDeletePost} />}
                                {isDeleting && (
                                    <LoadingSpinner size="md" />
                                )}
                            </span>
                        )}
                    </div>
                    <div className='flex flex-col gap-3 overflow-hidden'>
                        <span className=" text-primary">{post.text}</span>
                        {post.img && (
                            <img
                                src={post.img}
                                className='h-80 object-contain rounded-lg  border-gray-700'
                                alt=''
                            />
                        )}
                    </div>
                    <div className='flex justify-between mt-3'>
                        <div className='flex gap-4 items-center w-2/3 justify-start'>
                            <div
                                className='flex gap-1 items-center cursor-pointer group'
                                onClick={() => document.getElementById("comments_modal" + post._id).showModal()}
                            >
                                <FaRegComment className='w-4 h-4  text-slate-500 group-hover:text-black' />
                                <span className='text-sm text-slate-500 group-hover:text-black'>
                                    {post.comments.length}
                                </span>
                            </div>
                            {/* Comment Modal */}
                            <dialog id={`comments_modal${post._id}`} className='modal border-none outline-none'>
                                <div className='modal-box rounded border border-gray-600'>
                                    <h3 className='font-bold text-lg mb-4'>COMMENTS</h3>
                                    <div className='flex flex-col gap-3 max-h-60 overflow-auto'>
                                        {post.comments.length === 0 && (
                                            <p className='text-sm text-slate-500'>
                                                No comments yet 🤔 Be the first one 😉
                                            </p>
                                        )}
                                        {post.comments.map((comment) => (
                                            <div key={comment._id} className='flex gap-2 items-start'>
                                                <div className='avatar'>
                                                    <div className='w-8 rounded-full'>
                                                        <img
                                                            src={comment.user.profileImg || "/avatar-placeholder.png"}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='flex flex-col'>
                                                    <div className='flex items-center gap-1'>
                                                        <span className='font-bold text-[#012538]'>{comment.user.fullname}</span>
                                                        <span className=' text-gray-600 text-sm'>
                                                            @{comment.user.username}
                                                        </span>
                                                    </div>
                                                    <div className='text-sm text-primary'>{comment.text}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <form
                                        className='flex gap-2 items-center mt-4 border-t border-gray-600 pt-2'
                                        onSubmit={handlePostComment}
                                    >
                                        <textarea
                                            className='textarea w-full p-1 rounded text-md resize-none border focus:outline-none  border-gray-800'
                                            placeholder='Add a comment...'
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                        />
                                        <button className='btn btn-primary rounded-full btn-sm text-secondary px-4'>
                                            {isCommenting ? (
                                                <LoadingSpinner size="md" />
                                            ) : (
                                                "Reply"
                                            )}
                                        </button>
                                    </form>
                                </div>
                                <form method='dialog' className='modal-backdrop'>
                                    <button className='outline-none'>close</button>
                                </form>
                            </dialog>

                            {/* Repost */}
                            {/* <div className='flex gap-1 items-center group cursor-pointer'>
                                <BiRepost className='w-6 h-6  text-slate-500 group-hover:text-green-500' />
                                <span className='text-sm text-slate-500 group-hover:text-green-500'>0</span>
                            </div> */}

                            {/* Like Post */}
                            <div className='flex gap-1 items-center group cursor-pointer' onClick={handleLikePost}>
                                {isLiking && <LoadingSpinner size="md" />}
                                {!isLiked && !isLiking && (
                                    <FaHeart className='w-4 h-4 cursor-pointer text-slate-500 group-hover:text-pink-500' />
                                )}
                                {isLiked && !isLiking && <FaHeart className='w-4 h-4 cursor-pointer text-pink-500 ' />}

                                <span
                                    className={`text-sm text-slate-500 group-hover:text-pink-500 ${isLiked ? "text-pink-500" : ""
                                        }`}
                                >
                                    {post.likes.length}
                                </span>
                            </div>
                        </div>
                        {/* Save Post */}
                        <div className='flex w-1/3 justify-end gap-2 items-center' onClick={handleSavePost}>
                            {isSaving && <LoadingSpinner size="md" />}
                            {!isSaved && !isSaving && (
                                <FaRegBookmark className='w-4 h-4 text-gray-500 hover:text-black cursor-pointer' />
                            )}
                            {isSaved && !isSaving && <FaBookmark className='w-4 h-4 text-black cursor-pointer' />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Post;