import { Request, Response, Router } from "express";
import { generateNewAccessToken, getUser, loginUser, newRefreshToken, registerUser } from "../controller/UserController";
import { validateAccessToken } from "../middleware/AuthMiddleware";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    // res.cookie("jwt", "", {
    //     httpOnly: true,
    //     maxAge: 24*60*60*1000 // 1 hari
    // })
    return res.status(200).send("Hello World");
});

router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.post("/auth/token", generateNewAccessToken);
router.post("/auth/refresh_token", newRefreshToken);

router.use(validateAccessToken); // Use the middleware to validate the access token for all routes below

router.get("/users/:id", getUser);
// router.put("/users/:id", updateUser);
// router.delete("/users/:id", deleteUser);

export default router;
