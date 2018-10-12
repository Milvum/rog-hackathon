import { RequestHandler } from "express";
import { User, UserId } from "../models/User";
import { XAuth } from "../middleware/AuthMiddleware";
import { DataEntityId } from "../models/DataEntity";
import { DataConsumer } from "../models/DataConsumer";
import * as uuid from "uuid";

export interface LoginData {
    username: string;
    password: string;
}

export interface LoginResponse {
    xauth: XAuth;
}

export default class LoginRouter {
    public constructor(
        private users: Map<UserId, User>,
        private user_keys: Map<XAuth, User>) { }

    public readonly Login: RequestHandler = (req, res, next) => {
        const data: LoginData = req.body as LoginData;

        let user: User | null = null;

        this.users.forEach((u, k) => {
            console.debug("User", u.name);
            console.debug("Username", data.username);
            if (u.name === data.username) {
                user = u;
            }
        });

        if (!user) {
            res.status(403).send("Error :(");
            return;
        }

        // Oh my god we don't check the password! :D

        const xauth = uuid.v4();

        this.user_keys.set(xauth, user);

        const response: LoginResponse = {
            xauth,
        };

        res.status(200).json(response);
    }

    public readonly Logout: RequestHandler = (req, res, next) => {
        const user: User = res.locals.user as User;
        // Since this passes through the AuthMiddleware we know for sure this header exists.
        const xauth: string = req.headers["X-Auth"] as XAuth;

        this.user_keys.delete(xauth);

        res.status(201).send("OK");
    }
}
