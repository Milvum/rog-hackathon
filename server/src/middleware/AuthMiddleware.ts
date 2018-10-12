import { RequestHandler } from "express-serve-static-core";
import { User } from "../models/User";

export type XAuth = string;

/**
 * Super simple authentication checker probably not safe for real use, but good
 * enough for this hackathon!
 */
export default class AuthMiddleware {
    public constructor(private user_keys: Map<XAuth, User>) { }

    /**
     * Function that attaches a user object to res.locals.user if the user is authenticated.
     * Does not continue if there is no authenticated user.
     */
    public readonly Handler: RequestHandler = (req, res, next) => {
        const xauth = req.headers["x-auth"];

        // We don't have a header! :(
        if (typeof xauth !== "string") {
            res.status(401).send("Unauthorized");
            return;
        }

        const user = this.user_keys.get(xauth);

        // We don't have a user that matches the auth key :(
        if (!user) {
            res.status(403).send("Unauthorized");
            return;
        }

        // Yay a user.
        res.locals.user = user;

        // Continue with the chain.
        next();
    }
}
