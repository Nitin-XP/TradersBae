import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { BsEmojiSmileFill } from "react-icons/bs";
import { CiImageOn } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";
import { BASE_URL } from "../../Constants/constant";

const CreatePost = () => {
    const [text, setText] = useState("");
    const [img, setImg] = useState(null);

    const [emojiClicked, setEmojiClicked] = useState(false);

    const imgRef = useRef(null);

    const { data: authUser } = useQuery({ queryKey: ['authUser'] });
    const queryClient = useQueryClient();

    const { mutate: createPost, isPending, isError } = useMutation({
        mutationFn: async ({ text, img }) => {
            const details = { text, img };
            try {
                const res = await axios.post(BASE_URL + "/api/posts/create", details);
                const data = res.data;

                if (res.status !== 200) throw new Error(data.error || "Something Went Wrong!!");

                return data;
            } catch (error) {
                throw new Error(error);
            }
        },
        onSuccess: () => {
            setImg(null);
            setText("");
            toast.success("Post Created Successfully!");
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        createPost({ text, img });
    };

    const handleImgChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImg(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='flex p-4 items-start gap-4 border-b rounded-b-3xl bg-transparent '>
            <div className='avatar'>
                <div className='w-8 rounded-full'>
                    <img src={authUser.profileImg || "/avatar-placeholder.png"} />
                </div>
            </div>
            <form className='flex flex-col gap-2 w-full' onSubmit={handleSubmit}>
                <textarea
                    className='textarea bg-transparent text-primary w-full p-0 text-lg resize-none border-none focus:outline-none  border-gray-800'
                    placeholder='Share Your Analysis!'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                {img && (
                    <div className='relative w-72 mx-auto'>
                        <IoCloseSharp
                            className='absolute top-0 right-0 text-white bg-gray-800 rounded-full w-5 h-5 cursor-pointer'
                            onClick={() => {
                                setImg(null);
                                imgRef.current.value = null;
                            }}
                        />
                        <img src={img} className='w-full mx-auto h-72 object-contain rounded' />
                    </div>
                )}

                <div className='flex justify-between border-t py-2 border-t-gray-700'>
                    <div className='flex gap-1 items-center'>
                        <CiImageOn
                            className='fill-primary w-6 h-6 cursor-pointer'
                            onClick={() => imgRef.current.click()}
                        />

                        <BsEmojiSmileFill onClick={(e) => { setEmojiClicked(!emojiClicked) }} className='fill-primary w-5 h-5 hidden lg:block cursor-pointer' />
                        {emojiClicked && (
                            <div style={{ position: 'absolute', top: '30%', right: '60%', left: '40%', zIndex: 1 }}>
                                {/* <Picker data={data} onEmojiSelect={console.log} /> */}
                            </div>
                        )}
                    </div>
                    <input accept="image/*" type='file' hidden ref={imgRef} onChange={handleImgChange} />
                    <button className='btn btn-primary rounded-full btn-sm text-secondary px-4'>
                        {isPending ? "Sharing..." : "Share"}
                    </button>
                </div>
                {isError && <div className='text-red-500'>Something Went Wrong!!</div>}
            </form>
        </div>
    );
};
export default CreatePost;