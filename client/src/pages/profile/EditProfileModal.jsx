import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const EditProfileModal = ({ authUser }) => {
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState({
        fullname: "",
        username: "",
        email: "",
        bio: "",
        link: "",
        newPassword: "",
        currentPassword: "",
    });

    const { mutate: updateProfile, isPending: isUpdatingProfile } = useMutation({
        mutationFn: async () => {
            try {
                console.log(formData)
                const res = await axios.post(`http://localhost:8000/api/users/update`, formData, {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                });

                const data = res.data;

                if (res.status !== 200) throw new Error(data.error || `Something Went Wrong!`);
                return data;
            } catch (error) {
                throw new Error(error);
            }
        },
        onSuccess: (data) => {
            toast.success("Profile Updated Successfully!!");
            Promise.all([
                queryClient.invalidateQueries({ queryKey: ['authUser'] }),
                queryClient.invalidateQueries({ queryKey: ['userProfile'] }),
            ])

            // Update formData with the response data
            setFormData({
                fullname: data.fullname,
                username: data.username,
                email: data.email,
                bio: data.bio,
                link: data.link,
                newPassword: "",
                currentPassword: "",
            });

        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProfile();
    }
    useEffect(() => {
        if (authUser) {
            setFormData({
                fullname: authUser.fullname,
                username: authUser.username,
                email: authUser.email,
                bio: authUser.bio,
                link: authUser.link,
                newPassword: "",
                currentPassword: "",
            })
        }
    }, [authUser]);

    return (
        <>
            <button
                className='btn btn-outline rounded-full btn-sm'
                onClick={() => document.getElementById("edit_profile_modal").showModal()}
            >
                Edit profile
            </button>
            <dialog id='edit_profile_modal' className='modal'>
                <div className='modal-box border rounded-md border-secondary shadow-md'>
                    <h3 className='font-bold text-lg text-primary my-3'>Update Profile</h3>
                    <form
                        className='flex flex-col gap-4'
                        onSubmit={handleSubmit}
                    >
                        <div className='flex flex-wrap gap-2'>
                            <input
                                type='text'
                                placeholder='Full Name'
                                className='flex-1 input border border-secondary rounded p-2 input-md'
                                value={formData.fullname}
                                name='fullname'
                                onChange={handleInputChange}
                            />
                            <input
                                type='text'
                                placeholder='Username'
                                className='flex-1 input border border-secondary rounded p-2 input-md'
                                value={formData.username}
                                name='username'
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='flex flex-wrap gap-2'>
                            <input
                                type='email'
                                placeholder='Email'
                                className='flex-1 input border border-secondary rounded p-2 input-md'
                                value={formData.email}
                                name='email'
                                onChange={handleInputChange}
                            />
                            <textarea
                                placeholder='Bio'
                                className='flex-1 input border border-secondary rounded p-2 input-md'
                                value={formData.bio}
                                name='bio'
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='flex flex-wrap gap-2'>
                            <input
                                type='password'
                                placeholder='Current Password'
                                className='flex-1 input border border-secondary rounded p-2 input-md'
                                value={formData.currentPassword}
                                name='currentPassword'
                                onChange={handleInputChange} autoComplete="off"
                            />
                            <input
                                type='password'
                                placeholder='New Password'
                                className='flex-1 input border border-secondary rounded p-2 input-md'
                                value={formData.newPassword}
                                name='newPassword'
                                onChange={handleInputChange}
                            />
                        </div>
                        <input
                            type='text'
                            placeholder='Link'
                            className='flex-1 input border border-secondary rounded p-2 input-md'
                            value={formData.link}
                            name='link'
                            onChange={handleInputChange}
                        />
                        <button className='btn btn-primary rounded-full btn-sm text-secondary'>
                            {isUpdatingProfile ? "Updating..." : "Update"}
                        </button>
                    </form>
                </div>
                <form method='dialog' className='modal-backdrop'>
                    <button className='outline-none'>close</button>
                </form>
            </dialog>
        </>
    );
};
export default EditProfileModal;