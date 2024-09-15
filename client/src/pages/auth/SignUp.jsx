import { motion } from "framer-motion";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logo } from "../../components/svgs/X";

import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FaUser } from "react-icons/fa";
import { MdDriveFileRenameOutline, MdOutlineMail, MdPassword } from "react-icons/md";

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        fullname: "",
        password: "",
    });
    // const isError = false;

    const { mutate, isError, isPending, error } = useMutation({
        mutationFn: async ({ email, username, fullname, password }) => {

            try {
                const res = await fetch("http://localhost:8000/api/auth/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, username, fullname, password }),
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Failed to Create Account!");
                console.log(data)
                return data;
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        onSuccess: () => {
            toast.success("Account Created Successfully!");
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate(formData);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className='max-w-screen-xl mx-auto flex h-screen px-10 overflow-hidden bg-slate-100'>
            <motion.div
                initial={{ scale: 0.15, opacity: 0.4 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.19, type: 'spring', stiffness: 100 }}
                className='flex-1 hidden lg:flex items-center  justify-center'>
                <img src={logo} className=' lg:w-2/3 h-[300px] bg-black rounded-full ' />
            </motion.div>
            <motion.div
                initial={{ x: 200, opacity: 0.4 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.09, type: 'spring', stiffness: 100 }}
                className='flex-1 flex flex-col justify-center items-center'>
                <form className='lg:w-2/3  mx-auto md:mx-20 flex gap-4 flex-col' onSubmit={handleSubmit}>
                    <img src={logo} className='w-24 lg:hidden fill-white' />
                    <h1 className='text-4xl font-extrabold text-primary'>Join today.</h1>
                    <label className='input input-bordered rounded flex items-center gap-2'>
                        <MdOutlineMail />
                        <input
                            type='email'
                            className='grow'
                            placeholder='Email'
                            name='email'
                            onChange={handleInputChange}
                            value={formData.email}
                        />
                    </label>
                    <div className='flex gap-4 flex-wrap'>
                        <label className='input input-bordered rounded flex items-center gap-2 flex-1'>
                            <FaUser />
                            <input
                                type='text'
                                className='grow '
                                placeholder='Username'
                                name='username'
                                onChange={handleInputChange}
                                value={formData.username}
                            />
                        </label>
                        <label className='input input-bordered rounded flex items-center gap-2 flex-1'>
                            <MdDriveFileRenameOutline />
                            <input
                                type='text'
                                className='grow'
                                placeholder='Full Name'
                                name='fullname'
                                onChange={handleInputChange}
                                value={formData.fullname}
                            />
                        </label>
                    </div>
                    <label className='input input-bordered rounded flex items-center gap-2'>
                        <MdPassword />
                        <input
                            type='password'
                            className='grow'
                            placeholder='Password'
                            name='password'
                            onChange={handleInputChange}
                            value={formData.password}
                        />
                    </label>
                    <button className='btn rounded-full btn-primary text-secondary hover:bg-white hover:text-primary'>
                        {
                            isPending ? "Loading..." : "Sign Up"
                        }
                    </button>
                    {isError && <p className='text-red-500'>{error.message}</p>}
                </form>
                <div className='flex flex-col lg:w-2/3 gap-2 mt-4'>
                    <p className='text-primary font-semibold text-center text-lg'>Already have an account?</p>
                    <Link to='/login'>
                        <center><button className='btn rounded-full btn-primary text-white btn-outline w-1/2'>Sign in</button></center>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};
export default SignUpPage;