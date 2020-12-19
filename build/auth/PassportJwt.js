"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = require("passport-jwt");
const passport_1 = __importDefault(require("passport"));
const User_1 = __importDefault(require("../model/User"));
const Admin_1 = __importDefault(require("../model/Admin"));
const config_1 = __importDefault(require("../config"));
var opts = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config_1.default.JWT_SECRET
};
passport_1.default.use('user-rule', new passport_jwt_1.Strategy(opts, function (jwt_payload, done) {
    User_1.default.findOne({ _id: jwt_payload._id }, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        }
        else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));
passport_1.default.use('admin-rule', new passport_jwt_1.Strategy(opts, function (jwt_payload, done) {
    Admin_1.default.findOne({ _id: jwt_payload._id }, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        }
        else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));
exports.default = passport_1.default;
//# sourceMappingURL=PassportJwt.js.map