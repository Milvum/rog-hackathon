import { Express, static as ExpressStatic } from "express";
import ConsumerMiddleware from "../middleware/ConsumerMiddleware";
import { DataConsumer } from "../models/DataConsumer";
import ConsumerRouter, { Token } from "./ConsumerRouter";
import { User, UserId } from "../models/User";
import ProducerMiddleware from "../middleware/ProducerMiddleware";
import { DataProducer } from "../models/DataProducer";
import { DataEntityId } from "../models/DataEntity";
import ProducerRouter from "./ProducerRouter";
import LoginRouter from "./LoginRouter";
import AuthMiddleware, { XAuth } from "../middleware/AuthMiddleware";
import PermissionRouter, { AcquireCode } from "./PermissionRouter";

export interface DataMaps {
    producers: Map<DataEntityId, DataProducer>;
    consumers: Map<DataEntityId, DataConsumer>;
    requests: Map<AcquireCode, DataConsumer>;
    user_keys: Map<XAuth, User>;
    tokens: Map<Token, User>;
    users: Map<UserId, User>;
}

export const Router = (app: Express, maps: DataMaps) => {

    const producer_middleware = new ProducerMiddleware(maps.producers);
    const producer_router = new ProducerRouter();

    const consumer_middleware = new ConsumerMiddleware(maps.consumers);
    const consumer_router = new ConsumerRouter(maps.tokens);

    const auth_middleware = new AuthMiddleware(maps.user_keys);
    const user_router = new LoginRouter(maps.users, maps.user_keys);

    const permission_router = new PermissionRouter(
        maps.users,
        maps.requests,
        maps.tokens,
        maps.consumers);

    app.get("/consumer/data", consumer_middleware.Handle, consumer_router.Get);
    app.put("/producer/data", producer_middleware.Handle, producer_router.Update);

    app.post("/permission/acquire", auth_middleware.Handler, permission_router.Acquire);
    app.post("/permission/revoke", auth_middleware.Handler, permission_router.Revoke);
    app.get("/permission/acquire", auth_middleware.Handler, permission_router.GetAcquire);
    app.get("/test", auth_middleware.Handler, (req, res) => {
        res.status(200).json(res.locals.user);
    });

    app.post("/auth/login", user_router.Login);
    app.post("/auth/logout", auth_middleware.Handler, user_router.Logout);
    app.use(ExpressStatic("public"));
};
