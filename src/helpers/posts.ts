import { PostUpdate } from "./../models/PostUpdate";
import { PostItem } from "./../models/PostItem";
import { PostAccess } from "./postAccess";
const postAccess = new PostAccess();

export const getAllPosts = async () => {
  return await postAccess.getAllPosts();
};

export const createNewPost = async (post: PostItem) => {
  return await postAccess.createPostItem(post);
};

export const deletePost = async (postId: string, userId: string) => {
  return await postAccess.deletePostItem(postId, userId);
};
export const updatePost = async (
  post: PostUpdate,
  postId: string,
  userId: string
) => {
  return await postAccess.updatePostItem(post, postId, userId);
};

export const getSinglePost = async (postId: string, userId: string) => {
  return await postAccess.getSinglePost(postId, userId);
};
