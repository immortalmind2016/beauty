import passport from 'passport';
export interface UserReq {
    _id?: string;
    email?: string;
    name?: string;
    type?: string;
}
export default passport;
