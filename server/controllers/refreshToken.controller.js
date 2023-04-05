import jwt from "jsonwebtoken"
import userModel from "../models/user.model.js";

export const refreshToken = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(401);
        const user = await userModel.findOne({ refreshToken });
        if(!user) return res.sendStatus(403);
        const decodedToken = jwt.decode(refreshToken, { complete: true });
        if(!decodedToken || !decodedToken.payload || decodedToken.payload.sub !== user.id) {
            return res.sendStatus(403);
        }
        const userId = user.id;
        const name = user.name;
        const email = user.email;
        const accessToken = jwt.sign({userId,name,email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        res.json({ accessToken });
    } catch (error) {
        console.log(error);
        throw createError(500);
    }
}