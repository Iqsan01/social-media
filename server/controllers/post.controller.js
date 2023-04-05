import mongoose from "mongoose";
import postModel from "../models/post.model.js";
import userModel from "../models/user.model.js";
import createError from "../utils/createError.js";

//create a post
export const createPost = async (req, res, next) => {
    try {
        const newPost = new postModel(req.body);

        await newPost.save();
        res.status(200).json(newPost);
    } catch (err) {
        next(err);
    }
};

//get a post
export const getPost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const post = await postModel.findById(postId);

        if (!post) return next(createError(404, "Post not found!"));

        res.status(200).json({ post });
    } catch (err) {
        next(err);
    }
};

//update a post
export const updatePost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const { userId } = req.body;
        const post = await postModel.findById(postId);

        if (post.userId === userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json({ message: "Post Updated!" });
        } else {
            res.status(403).json({ message: "Action forbidden" });
        }
    } catch (err) {
        next(err);
    }
};

//delete a post
export const deletePost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const { userId } = req.body;
        const post = await postModel.findById(postId);
        if (post.userId === userId) {
            await post.deleteOne();
            res.status(200).json({ message: "Post deleted!" });
        } else {
            res.status(403).json({ message: "Action forbidden" });
        }
    } catch (err) {
        next(err);
    }
};

//like and unlike a post
export const likePost = async (req, res, next) => {
    try {
        const likeId = req.params.id;
        const { userId } = req.body;
        const post = await postModel.findById(likeId);

        if (!post.likes.includes(userId)) {
            await post.updateOne({ $push: { likes: userId } });
            res.status(200).json({ message: "Post liked" });
        } else {
            await post.updateOne({ $pull: { likes: userId } });
            res.status(200).json({ message: "Post unliked" });
        }

    } catch (err) {
        next(err);
    }
};

//get timeline posts
export const getTimelinePosts = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const userPosts = await postModel.find({ userId: userId });
        const followingPosts = await userModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $lookup: {
                    from: "posts",
                    localField: "following",
                    foreignField: "userId",
                    as: "followingPosts"
                }
            },
            {
                $project: {
                    followingPosts: 1,
                    _id: 0
                }
            }
        ])

        res
            .status(200)
            .json(userPosts
                .concat(...followingPosts[0].followingPosts)
                .sort((a, b) => {
                    return b.createdAt - a.createdAt;
                })
            );

    } catch (err) {
        next(err);
    }
};