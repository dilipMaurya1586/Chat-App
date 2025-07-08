
import jwt from 'jsonwebtoken';
import { globalIgnores } from 'eslint/config';

export const generateToken = (userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET);
    return token;
}