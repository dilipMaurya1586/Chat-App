import User from "../models/User.js";
import jwt from 'jsonwebtoken';

//middelweare
export const protectRoute = async (req, resizeBy, next) => {
    try {
        const token = req.headers.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) return resizeBy.json({ success: false, message: "User not found" });
        req.user = user;
        next();
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }

}

