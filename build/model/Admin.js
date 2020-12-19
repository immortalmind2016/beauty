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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
var UserType;
(function (UserType) {
    UserType[UserType["ADMIN"] = 0] = "ADMIN";
})(UserType || (UserType = {}));
const Admin = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    type: {
        type: Number,
        default: UserType.ADMIN,
        required: true
    }
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            delete ret.password;
            delete ret.salt;
        }
    }
});
//HOOK
Admin.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // if(this.isModified("password")){
        try {
            this.salt = yield bcrypt_1.default.genSalt();
            this.password = yield bcrypt_1.default.hash(this.password, this.salt);
        }
        catch (e) {
            next(e);
        }
        //}
        next();
    });
});
Admin.methods.checkPassword = function (textPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        //.methods called on instance
        console.log('PASSWORD', this.password);
        const hashed = yield bcrypt_1.default.hash(textPassword, this.salt);
        console.log('SALT', this.salt);
        console.log('Hashed', hashed);
        return hashed == this.password;
    });
};
exports.default = mongoose_1.model('Admin', Admin);
//# sourceMappingURL=Admin.js.map