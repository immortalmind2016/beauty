"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostType = void 0;
const mongoose_1 = require("mongoose");
var PostType;
(function (PostType) {
    PostType[PostType["VIDEO"] = 0] = "VIDEO";
    PostType[PostType["IMAGE"] = 1] = "IMAGE";
})(PostType = exports.PostType || (exports.PostType = {}));
const Post = new mongoose_1.Schema({
    brand: { type: String },
    image: { type: String, required: true },
    video: String,
    type: {
        type: Boolean,
        default: PostType.IMAGE,
        enum: Object.values(PostType),
    },
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: "String",
    },
}, { timestamps: true });
exports.default = mongoose_1.model("Post", Post);
//# sourceMappingURL=Post.js.map