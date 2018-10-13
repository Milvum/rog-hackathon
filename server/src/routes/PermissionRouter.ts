import { RequestHandler } from "express";
import { DataProductId } from "../models/DataProduct";
import { DataEntityId } from "../models/DataEntity";
import { User, UserId } from "../models/User";
import { DataConsumer } from "../models/DataConsumer";
import * as uuid from "uuid";
import { ConsumptionOption } from "../models/ConsumptionOption";
import { Token } from "./ConsumerRouter";

export interface AcquireData {
    code: AcquireCode;
    products: ConsumptionOption;
    redirect: string;
}

export interface RevokeData {
    consumer: DataEntityId;
}

export interface GetAcquireResponse {
    token: string;
    redirect: string;
}

export interface PostAcquireResponse {
    token: string;
    redirect: string;
}

export type AcquireCode = string;

export default class PermissionRouter {
    public constructor(
        // Map of users
        private users: Map<UserId, User>,
        // Map of requests sent to us by consumers
        private requests: Map<AcquireCode, DataConsumer>,
        // Map of data consumer tokens for User
        private tokens: Map<Token, User>,
        private consumers: Map<DataEntityId, DataConsumer>) {

    }

    public readonly GetAcquire: RequestHandler = (req, res, next) => {
        const user = res.locals.user as User;
        // Actually it's string | undefined, but doesn't matter in this map.
        const consumer_id: string = req.query.consumer_id;

        const entry = user.data_consumers[consumer_id];

        if (!entry) {
            res.status(404).send("No acquisition available yet");
            return;
        }

        const response: GetAcquireResponse = {
            token: entry.token,
            redirect: entry.redirect,
        };

        res.status(200).json(response);
    }

    /**
     * Sets the permissions for a data consumer to access your data and then
     * returns a token that the consumer can use to access the data.
     */
    public readonly Acquire: RequestHandler = (req, res, next) => {
        const data: AcquireData = req.body;
        const user = res.locals.user as User;
        const consumer_id = req.query.consumer_id;

        const consumer = this.consumers.get(consumer_id);

        if (!consumer) {
            res.status(404).send("No outstanding requests");
            return;
        }

        const token = uuid.v4();

        user.data_consumers[consumer.id] = {
            consumer,
            date: new Date(),
            options: data.products,
            token,
            redirect: data.redirect,
            category: "Abonnementen",
        };

        this.tokens.set(token, user);

        const response: PostAcquireResponse = {
            token,
            redirect: data.redirect,
        };

        res.status(200).json(response);
    }

    /**
     * Revokes the right of a data consumer to request your data.
     */
    public readonly Revoke: RequestHandler = (req, res, next) => {
        const data: RevokeData = req.body;

        const user = res.locals.user as User;
        const consumer = user.data_consumers[data.consumer];

        delete user.data_consumers[data.consumer];

        if (consumer) {
            this.tokens.delete(consumer.token);
        }

        res.status(201).send("OK");
    }
}
