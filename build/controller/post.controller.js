"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserPosts = exports.deletePost = exports.editPost = exports.createPost = void 0;
const Post_1 = __importDefault(require("../model/Post"));
const config_1 = __importDefault(require("../config"));
const editPost = (req, res, err) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id: user } = req.user;
        const _a = req.body, { id } = _a, rest = __rest(_a, ["id"]);
        console.log("ID ", req.body);
        yield Post_1.default.updateOne({ user, _id: id }, Object.assign({}, rest), { new: true });
        res.json({ success: true });
    }
    catch (e) {
        res.status(501).json({ error: e === null || e === void 0 ? void 0 : e.message });
    }
});
exports.editPost = editPost;
const createPost = (req, res, err) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPost = req.body;
        const _id = req.user._id;
        const post = yield Post_1.default.create(Object.assign(Object.assign({}, newPost), { user: _id }));
        res.json({ post });
    }
    catch (e) {
        res.status(501).json({ error: e === null || e === void 0 ? void 0 : e.message });
    }
});
exports.createPost = createPost;
const deletePost = (req, res, err) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id: user } = req.user;
        const { postId } = req.params;
        yield Post_1.default.deleteOne({ user, _id: postId });
        res.json({ success: true });
    }
    catch (e) {
        res.status(501).json({ error: e === null || e === void 0 ? void 0 : e.message });
    }
});
exports.deletePost = deletePost;
const getUserPosts = (req, res, err) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const limit = config_1.default.mobileLimit;
        const skip = req.params.page * limit;
        const user = req.params.userId;
        const results = yield Promise.all([
            Post_1.default.find({ user }).limit(limit).skip(skip),
            Post_1.default.find({ user }).count(),
        ]);
        const posts = results[0];
        const totalResults = results[1];
        res.json({ posts, totalResults, limit });
    }
    catch (e) {
        res.status(501).json({ error: e === null || e === void 0 ? void 0 : e.message });
    }
});
exports.getUserPosts = getUserPosts;
//# sourceMappingURL=post.controller.js.map