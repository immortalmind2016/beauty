import Post, { PostSchema } from "../model/Post";
import config from "../config";
const editPost = async (req, res, err) => {
  try {
    const { _id: user } = req.user;
    const { id, ...rest } = req.body;

    console.log("ID ", req.body);
    await Post.updateOne({ user, _id: id }, { ...rest }, { new: true });
    res.json({ success: true });
  } catch (e) {
    res.status(501).json({ error: e?.message });
  }
};
const createPost = async (req, res, err) => {
  try {
    const newPost: PostSchema = req.body;
    const _id: String = req.user._id;
    const post = await Post.create({ ...newPost, user: _id });
    res.json({ post });
  } catch (e) {
    res.status(501).json({ error: e?.message });
  }
};
const deletePost = async (req, res, err) => {
  try {
    const { _id: user } = req.user;
    const { postId } = req.params;
    await Post.deleteOne({ user, _id: postId });
    res.json({ success: true });
  } catch (e) {
    res.status(501).json({ error: e?.message });
  }
};
const getUserPosts = async (req, res, err) => {
  try {
    const limit = config.mobileLimit;
    const skip = req.params.page * limit;
    const user = req.params.userId;
    const posts = await Post.find({ user }).limit(limit).skip(skip);
    res.json({ posts });
  } catch (e) {
    res.status(501).json({ error: e?.message });
  }
};
export { createPost, editPost, deletePost, getUserPosts };
