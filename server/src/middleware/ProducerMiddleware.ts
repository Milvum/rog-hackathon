import { RequestHandler } from "express-serve-static-core";
import { DataEntityId } from "../models/DataEntity";
import { DataProducer } from "../models/DataProducer";

export default class ProducerMiddleware {
    public constructor(private producers: Map<DataEntityId, DataProducer>) { }
    public readonly Handle: RequestHandler = (req, res, next) => {
        const token = req.headers["X-Producer"] as string;

        // We're using their ID as indicator now, do not do this in real life.
        const producer = this.producers.get(token);

        if (!producer) {
            return;
        }

        res.locals.producer = producer;

        next();
    }
}