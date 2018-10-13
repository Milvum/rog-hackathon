import { RequestHandler } from "express-serve-static-core";
import { DataConsumer } from "../models/DataConsumer";
import { DataEntityId } from "../models/DataEntity";

export default class ConsumerMiddleware {
    public constructor(
        private consumers: Map<DataEntityId, DataConsumer>) { }

    public readonly Handle: RequestHandler = (req, res, next) => {
        const token = req.headers["x-consumer"] as string;

        // We're using their ID as indicator now, do not do this in real life.
        const consumer = this.consumers.get(token);

        if (!consumer) {
            res.status(401).send("Forbidden");
            return;
        }

        res.locals.consumer = consumer;

        next();
    }
}
