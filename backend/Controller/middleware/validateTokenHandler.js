import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const validateToken = asyncHandler(async (req, res, next) => {
    let token;

    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];

        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            req.user = decoded.user; //Attach decoded user to `req`
            next();
        } catch (err) {
            res.status(401);
            throw new Error("User is not authorized, token is invalid");
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("User is not authorized or token is missing");
    }
});

export default validateToken;
