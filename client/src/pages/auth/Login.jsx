import React, { useState } from "react";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";
import { logo } from "../../components/svgs/X";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { MdOutlineMail, MdPassword } from "react-icons/md";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const queryClient = useQueryClient();

    const { mutate: loginMutation, isError, isPending, error } = useMutation({
        mutationFn: async ({ username, password }) => {

            try {
                const res = await axios.post("http://localhost:8000/api/auth/login", {
                    username,
                    password
                }, {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                const data = await res.data;

                if (res.status !== 200) throw new Error(data.error || "Failed to Login!");
                return data;
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        onSuccess: () => {
            // Refetch the AuthUser
            // toast.success("LoggedIn Successfully!");
            queryClient.invalidateQueries({ queryKey: ['authUser'] });
            console.log(queryKey)
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        loginMutation(formData);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className='max-w-screen-xl mx-auto overflow-hidden flex h-screen bg-slate-100'>
            <motion.div
                initial={{ scale: 0.15, opacity: 0.4 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.19, type: 'spring', stiffness: 100 }}
                className='flex-1 hidden lg:flex items-center  justify-center'>
                <img src={logo} className='lg:w-2/3 bg-black rounded-full' />
            </motion.div>

            <motion.div
                initial={{ x: 200, opacity: 0.4 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.09, type: 'spring', stiffness: 100 }}
                className='flex-1 flex flex-col justify-center items-center'>
                <form className='flex gap-4 flex-col' onSubmit={handleSubmit}>
                    <img src={logo} className='w-24 lg:hidden fill-white' />
                    <h1 className='text-4xl font-extrabold text-primary'>Welcome Back!😊</h1>
                    <label className='input input-bordered rounded flex items-center gap-2'>
                        <MdOutlineMail />
                        <input
                            type='text'
                            className='grow'
                            placeholder='username'
                            name='username'
                            onChange={handleInputChange}
                            value={formData.username}
                        />
                    </label>

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
                        {isPending ? "Loading..." : "Login"}
                    </button>
                    {isError && <p className='text-red-500'>Something went wrong</p>}
                </form>
                <div className='flex flex-col gap-2 mt-4'>
                    <p className='text-primary font-semibold text-lg'>Don't have an account?</p>
                    <Link to='/signup'>
                        <button className='btn rounded-full btn-primary text-white btn-outline w-full'>Sign up</button>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};
export default LoginPage;