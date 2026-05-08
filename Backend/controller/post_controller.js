import Post from "../models/post_model.js";
import User from "../models/user_model.js";
import uploadFile from "../utils/imagekit_service.js";

// Create Post
export const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content || !req.file) {
            return res.status(400).json({
                message: "Title, content and image are required",
            });
        }

     
        const uploadImage = await uploadFile(req.file.buffer);
 
        const post = await Post.create({
            title,
            content,
            image: uploadImage.url,
            author: req.user.id,
        });


        const user = await User.findById(req.user.id);

      
        user.posts.push(post._id);

        
        await user.save();

        return res.status(201).json({
            message: "Post created successfully",
            post,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
// Get All Posts
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("author", "name email")
            .sort({ createdAt: -1 });

        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

// Get Single Post
export const getSinglePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate("author", "name email");

        if (!post) {
            return res.status(404).json({
                message: "Post not found",
            });
        }

        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

// Update Post
export const updatePost = async (req, res) => {
    try {
        const { title, content } = req.body;

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found",
            });
        }

        // check ownership
        if (post.author.toString() !== req.userId) {
            return res.status(403).json({
                message: "Unauthorized",
            });
        }
        const uploadImage=await uploadFile(req.file.buffer)
        post.title = title || post.title;
        post.content = content || post.content;
        post.image = uploadImage.url || post.image;

        await post.save();

        return res.status(200).json({
            message: "Post updated successfully",
            post,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

// Delete Post
export const deletePost = async (req, res) => {
     try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found",
            });
        }

        // ownership check
        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Unauthorized",
            });
        }

        // remove post from user's posts array
        await User.findByIdAndUpdate(
            req.user.id,
            {
                $pull: {
                    posts: post._id,
                },
            }
        );

        // delete post
        await post.deleteOne();

        return res.status(200).json({
            message: "Post deleted successfully",
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};