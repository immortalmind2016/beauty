import { RequestHandler } from "express";
declare const signUp: RequestHandler;
declare const login: RequestHandler;
declare const getUserData: RequestHandler;
declare const updateUser: RequestHandler;
declare const getProfiles: RequestHandler;
declare const verifyEmail: RequestHandler;
export { signUp, login, getUserData, verifyEmail, getProfiles, updateUser };
