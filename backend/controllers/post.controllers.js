import { v2 as cloudinary } from "cloudinary";
import Notification from "../models/notification.model.js";
import Post from "../models/post.models.js";
import User from "../models/user.model.js";

export const createPost = async (req, res) => {
    try {
        const { text } = req.body;
        let { img } = req.body;
        const userId = req.user._id.toString();

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User Not Found!" });
        if (!text && !img) return res.status(404).json({ message: "Post must have Text and Image!" });

        if (img) {
            const uploadedResponse = await cloudinary.uploader.upload(img);
            img = uploadedResponse.secure_url;
        }
        const newPost = new Post({
            user: userId,
            text,
            img,
        });
        await newPost.save();
        res.status(200).json(newPost);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error!" });
        console.log("Error in CreatePost Controller : ", error);
    }
}

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: "Post Not Found!" });

        if (post.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: "You're not Authorized to delete this Post!" });
        }
        if (post.img) {
            const imgId = post.img.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(imgId);
        }

        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Post Deleted Succesfully!" });
    } catch (error) {
        res.status(404).json({ error: "Internal Server Error!" });
        console.log(`Error in deletePost Controller : `, error);
    }
}

export const commentOnPost = async (req, res) => {
    try {
        const { text } = req.body;
        const postId = req.params.id;
        const userId = req.user.id;
        if (!text) return res.status(400).json({ error: "Text field is required!" });

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ error: "Post Not Found!" });

        const comment = { user: userId, text };
        post.comments.push(comment);
        await post.save();

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error!" });
        console.log(`Error in commentOnPost controller : `, error);
    }
}

export const likeUnlikePost = async (req, res) => {
    try {
        const userId = req.user._id;
        const { id: postId } = req.params;
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ error: "Post Not Found!" });

        const userLikedPost = post.likes.includes(userId);
        if (userLikedPost) {
            // Unlike Post
            await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
            await User.updateOne({ _id: userId }, { $pull: { likedPosts: postId } });

            const updatedLikes = post.likes.filter((id) => id.toString() !== userId.toString());
            res.status(200).json(updatedLikes);
        } else {
            // Like Post
            post.likes.push(userId);
            await User.updateOne({ _id: userId }, { $push: { likedPosts: postId } })
            await post.save();

            const notification = new Notification({
                from: userId,
                to: post.user,
                type: "like",
            })
            await notification.save();

            const updatedLikes = post.likes;
            res.status(200).json(updatedLikes);
        }

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error!" });
        console.log(`Error in likeUnlikePost Controller : `, error);
    }
}
export const saveUnsavePost = async (req, res) => {
    try {
        const userId = req.user._id;
        const { id: postId } = req.params;
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ error: "Post Not Found!" });

        const userSavedPost = post.saves.includes(userId);
        if (userSavedPost) {
            // Unsave Post
            await Post.updateOne({ _id: postId }, { $pull: { saves: userId } });
            await User.updateOne({ _id: userId }, { $pull: { savedPosts: postId } });

            const updatedSaves = post.saves.filter((id) => id.toString() !== userId.toString());
            res.status(200).json(updatedSaves);
        } else {
            // Save Post
            post.saves.push(userId);
            await User.updateOne({ _id: userId }, { $push: { savedPosts: postId } })
            await post.save();

            const updatedSaves = post.saves;
            res.status(200).json(updatedSaves);
        }

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error!" });
        console.log(`Error in saveUnsave Controller : `, error);
    }
}

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }).populate({
            path: "user",
            select: "-password",
        }).populate({
            path: "comments.user",
            select: "-password"
        });
        // populate helps in getting more info about each user like username, fullname, etc.

        if (posts.length === 0) return res.status(200).json({ message: "Posts not found!" });

        res.status(200).json(posts);
    } catch (error) {
        console.log(`Error in getAllPosts Controller : `, error);
        res.status(500).json({ error: "Internal Server Error!" });
    }
}

export const getLikedPosts = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "User Not Found!!" });

        const likedPosts = await Post.find({ _id: { $in: user.likedPosts } }).populate({
            path: "user",
            select: "-password",
        }).populate({
            path: "comments.user",
            select: "-password",
        });

        res.status(200).json(likedPosts);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error!!" });
        console.log(`Error in getLikedPosts Controller : `, error);
    }
}
export const getSavedPosts = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "User Not Found!!" });

        console.log("Posts in Saved Posts", user.savedPosts)

        const savedPosts = await Post.find({ _id: { $in: user.savedPosts } }).populate({
            path: "user",
            select: "-password",
        }).populate({
            path: "comments.user",
            select: "-password",
        });

        res.status(200).json(savedPosts);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error!!" });
        console.log(`Error in getSavedPosts Controller : `, error);
    }
}

export const getFollowingPosts = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "user Not Found!" });
        const following = user.following;
        const feedPosts = await Post.find({ user: { $in: following } }).sort({ createdAt: -1 }).populate({
            path: "user", select: "-password",
        }).populate({
            path: "comments.user", select: "-password",
        });

        res.status(200).json(feedPosts);

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error!!" });
        console.log(`Error in getFollowingPosts Controller : `, error);
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ error: "User Not Found!" });

        const posts = await Post.find({ user: user._id }).sort({ createdAt: -1 }).populate({
            path: "user", select: "-password"
        }).populate({
            path: "comments.user", select: "-password"
        });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error!" });
        console.log(`Error in getUserPosts Controller : `, error);
    }
}