const Post = require('../model/post')
const mongoose = require('mongoose');


const createPost = async (req, res) => {
    try {
        const { author, title, summary, content, category } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const image = req.file ? req.file.filename : null;

        if (!title || !summary || !content) {
            res.status(404).json({ message: 'Add information' });
        }
        const newPost = await Post.create({
            author,
            title,
            summary,
            content,
            picturePath: image,
            category
        })

        res.status(200).json(newPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllPost = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;

        const totalPosts = await Post.countDocuments();
        const totalPages = Math.ceil(totalPosts / pageSize);

        const posts = await Post.find()
            .skip((page - 1) * pageSize)
            .limit(pageSize);

        if (posts.length === 0) {
            return res.status(200).json({ message: "No posts found" });
        }

        res.status(200).json({
            posts,
            totalPages,
            currentPage: page,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getSinglePost = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate if the id is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid post ID" });
        }

        // Use findOneAndUpdate to atomically increment the view count and retrieve the updated post
        const updatedPost = await Post.findOneAndUpdate(
            { _id: id },
            { $inc: { views: 1 } },
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};







const addCommentSinglePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;

        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Add the single comment to the post
        post.comments.push({ text });

        // Save the updated post
        const updatedPost = await post.save();

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, summary, content } = req.body;

        // Check if a new image file is provided
        const image = req.file ? req.file.filename : undefined;

        const post = await Post.findByIdAndUpdate(id, {
            title,
            summary,
            content,
            // Only update the picturePath if a new image is provided
            ...(image && { picturePath: image }),
        });

        res.status(200).json({ message: "Post updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        await Post.findByIdAndDelete(id);

        res.status(200).json({ message: "post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = { createPost, getAllPost, getSinglePost, updatePost, deletePost, addCommentSinglePost }