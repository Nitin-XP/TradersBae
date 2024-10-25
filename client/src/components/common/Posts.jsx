import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../../Constants/constant";
import PostSkeleton from "../skeletons/PostSkeleton";
import Post from "./Post";

const Posts = ({ feedType, username, userId }) => {

    const getPostEndpoint = () => {
        switch (feedType) {
            case "forYou":
                return BASE_URL + "/api/posts/all";
            case "following":
                return BASE_URL + "/api/posts/following";
            case "posts":
                return BASE_URL + `/api/posts/user/${username}`
            case "likes":
                return BASE_URL + `/api/posts/likes/${userId}`
            case "saves":
                return BASE_URL + `/api/posts/saves/${userId}`
            default:
                return BASE_URL + "/api/posts/all"
        }
    }

    const POST_ENDPOINT = getPostEndpoint();

    const { data: posts, isLoading, refetch, isRefetching } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            try {
                const res = await axios.get(POST_ENDPOINT);
                const data = await res.data;

                if (res.status !== 200) {
                    throw new Error(data.error || "Something went Wrong!")
                }
                return data;
            } catch (error) {
                throw new Error(error);
            }
        }
    });

    useEffect(() => {
        refetch();
    }, [feedType, refetch, username])

    return (
        <>
            {(isLoading || isRefetching) && (
                <div className='flex flex-col justify-center'>
                    <PostSkeleton />
                    <PostSkeleton />
                    <PostSkeleton />
                </div>
            )}
            {!isLoading && !isRefetching && posts?.length === 0 && <p className='text-center my-4'>No posts in this tab. Switch 👻</p>}
            {!isLoading && !isRefetching && posts && (
                <div>
                    {posts.map((post) => (
                        <Post key={post._id} post={post} />
                    ))}
                </div>
            )}
        </>
    );
};
export default Posts;