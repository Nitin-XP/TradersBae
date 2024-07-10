import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
import User from "../models/user.model.js";

export const signup = async (req, res) => {
    try {
        const { fullname, email, password, username } = req.body;
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid Email." });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username Already Taken!" });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ error: "Examil Already in Use!" });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: "Password Must be Atleast 6 Charcters Long!" });
        }

        // Hasing Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullname,
            username,
            email,
            password: hashedPassword,
        })
        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                email: newUser.email,
                followers: newUser.followers,
                following: newUser.following,
                profileImg: newUser.profileImg,
                coverImg: newUser.coverImg,
            })
        } else {
            res.status(400).json({ error: "Invalid User Data." });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." });
        console.log(error);
    }
}
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid Username or Password!" });
        }
        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            followers: user.followers,
            following: user.following,
            profileImg: user.profileImg,
            coverImg: user.coverImg,
        });
    } catch (error) {
        console.log(`Error in Login Controller : `, error.message, res);
        res.status(500).json({ error: "Internal Server Error." });
    }
}
export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged Out Succesfully!" });
    } catch (error) {
        console.log(`Error in logout controller : `, error.message);
        res.status(500).json({ error: "Internal Server Error!" });
    }
}
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        res.status(200).json(user);
    } catch (error) {
        console.log(`Error in GetMe Controller.`, error.message);
        return res.status(500).json({ error: "Internal Server Error!" });
    }
}