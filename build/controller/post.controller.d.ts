declare const editPost: (req: any, res: any, err: any) => Promise<void>;
declare const createPost: (req: any, res: any, err: any) => Promise<void>;
declare const deletePost: (req: any, res: any, err: any) => Promise<void>;
declare const getUserPosts: (req: any, res: any, err: any) => Promise<void>;
export { createPost, editPost, deletePost, getUserPosts };
