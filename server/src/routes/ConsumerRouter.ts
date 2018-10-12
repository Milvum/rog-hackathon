import { RequestHandler } from "express";
import { User } from "../models/User";
import { DataConsumer } from "../models/DataConsumer";

export type Token = string;

export interface GetResponse {
    data: any[];
}

export default class ConsumerRouter {
    public constructor(private tokens: Map<Token, User>) { }

    /**
     * Route that allows consumers to obtain the data they are allowed to obtain.
     */
    public readonly Get: RequestHandler = (req, res, next) => {
        const token = req.query.token as Token;

        const user = this.tokens.get(token);
        const consumer = res.locals.consumer as DataConsumer;

        if (!user) {
            // User or consumer not found
            res.status(401).send("No authorization found");
            return;
        }

        const entry = user.data_consumers[consumer.id];

        if (!entry) {
            // User did not mark consumer as data consumer
            res.status(403).send("No authorization found");
            return;
        }

        const data: any[] = [];

        for (const key in entry.options) {
            if (entry.options[key]) {
                const data_product = user.data[key];

                if (data_product) {
                    data.push(data_product);
                }
            }
        }

        const response: GetResponse = {
            data,
        };

        res.status(200).json(response);
    }
}
