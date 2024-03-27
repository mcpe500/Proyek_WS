import { Request, Response } from "express";
import { verifyRefreshToken } from "../utils/AuthUtils";
import { RESPONSE_STATUS } from "../contracts/enum/ResponseRelated.enum";

export const registerUser = async (req: Request, res: Response) => {
    const { name, username, email, password } = req.body;

}

export const loginUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

}

export const getUser = async (req: Request, res: Response) => {

}

export const newRefreshToken = async (req: Request, res: Response) => {

}

export const generateNewAccessToken = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(RESPONSE_STATUS.FORBIDDEN).json({ message: 'Refresh token is required' });
    }

    // try {
    //     const decoded = verifyRefreshToken(refreshToken);
    //     const user = await User.findById(decoded.userId);
    //     if (!user) {
    //         return res.status(404).json({ message: 'User not found' });
    //     }

    //     const accessToken = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    //     return res.status(200).json({ accessToken });
    // } catch (err) {
    //     return res.status(403).json({ message: 'Invalid refresh token' });
    // }
}