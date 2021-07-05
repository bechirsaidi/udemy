import expressJwt from 'express-jwt';
export const resquireSignin = expressJwt({

    getToken:(req,res) =>req.cookies.token,
    secret: process.env.JWT_SECRET,
    algorithms:["HS256"],
});