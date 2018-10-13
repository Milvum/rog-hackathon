import * as Express from "express";
import * as http from "http";
import * as Winston from "winston";
import * as BodyParser from "body-parser";
import { Router, DataMaps } from "./routes/Router";
import * as cors from "cors";
import { DataEntityId } from "./models/DataEntity";
import { UserId, User, ConsumerEntry } from "./models/User";
import { DataConsumer } from "./models/DataConsumer";
import { DataProducer } from "./models/DataProducer";
import * as uuid from "uuid";
import { DataProduct } from "./models/DataProduct";
import { XAuth } from "./middleware/AuthMiddleware";

const VIDEOLAND_ID = "1217b527-7a51-4bc5-84eb-465ba5fa5ea8";

const BRP: DataProduct = {
    data: {
        naam: "Marco",
        achternaam: "van Dijk",
    },
    id: uuid.v4(),
    name: "Voor- achternaam",
};

const PHONE: DataProduct = {
    data: [
        "0612345678",
    ],
    id: uuid.v4(),
    name: "Telefoonnummer",
};

const NETFLIX: DataConsumer = {
    data_consumption: new Map(),
    id: uuid.v4(),
    name: "Netflix",
};

const SPOTIFY: DataConsumer = {
    data_consumption: new Map(),
    id: uuid.v4(),
    name: "Spotify",
};

const ABN: DataConsumer = {
    data_consumption: new Map(),
    id: uuid.v4(),
    name: "Spaarrekening",
};

const VIDEOLAND: DataConsumer = {
    data_consumption: new Map(),
    id: VIDEOLAND_ID,
    name: "Videoland",
};

const GOVERNMENT: DataProducer = {
    data_production: new Map(),
    id: uuid.v4(),
    name: "Nederlandse Overheid",
};

GOVERNMENT.data_production.set(BRP.id, BRP);
GOVERNMENT.data_production.set(PHONE.id, PHONE);

export class App {

    public static async Main(args: string[]): Promise<void> {
        const app = Express();
        app.use(cors());
        app.use(BodyParser.json());
        app.use(BodyParser.urlencoded({ extended: true }));

        const server = http.createServer(app);

        const maps: DataMaps = {
            consumers: new Map(),
            producers: new Map(),
            requests: new Map(),
            tokens: new Map(),
            user_keys: new Map(),
            users: new Map(),
        };

        App.CreateUsers(maps.users, maps.user_keys);
        App.CreateConsumers(maps.consumers);
        App.CreateProducers(maps.producers);

        Router(app, maps);

        server.listen(3000, () => {
            console.info(`Server started on port ${3000}`);
        });
    }

    private static CreateUsers(users: Map<UserId, User>, user_keys: Map<XAuth, User>) {
        const user: User = {
            id: uuid.v4(),
            name: "Marco",
            data: {},
            data_consumers: {},
            data_producers: {},
        };

        const netflix_entry: ConsumerEntry = {
            category: "Abonnementen",
            consumer: NETFLIX,
            date: new Date("13-10-2017"),
            options: {},
            redirect: "https://nice.link/redir",
            token: uuid.v4(),
        };

        netflix_entry.options[BRP.id] = true;
        netflix_entry.options[PHONE.id] = true;

        user.data_consumers[NETFLIX.id] = netflix_entry;

        const spotify_entry: ConsumerEntry = {
            category: "Abonnementen",
            consumer: SPOTIFY,
            date: new Date("13-03-2017"),
            options: {},
            redirect: "https://nice.link/redir",
            token: uuid.v4(),
        };

        spotify_entry.options[BRP.id] = true;

        user.data_consumers[SPOTIFY.id] = spotify_entry;

        const abn_entry: ConsumerEntry = {
            category: "Financieel",
            consumer: NETFLIX,
            date: new Date("13-03-2017"),
            options: {},
            redirect: "https://nice.link/redir",
            token: uuid.v4(),
        };

        abn_entry.options[BRP.id] = true;
        abn_entry.options[PHONE.id] = true;

        user.data_consumers[ABN.id] = abn_entry;

        user.data_producers[GOVERNMENT.id] = {
            date: new Date("01-01-2000"),
            producer: GOVERNMENT,
        };

        user.data[BRP.id] = BRP;
        user.data[PHONE.id] = PHONE;

        users.set(user.id, user);

        user_keys.set("51247c2c-21db-409f-b083-c981f76fdc87", user);
    }

    private static CreateConsumers(consumers: Map<DataEntityId, DataConsumer>) {
        consumers.set(VIDEOLAND.id, VIDEOLAND);
        consumers.set(NETFLIX.id, NETFLIX);
        consumers.set(SPOTIFY.id, SPOTIFY);
        consumers.set(ABN.id, ABN);
    }

    private static CreateProducers(producers: Map<DataEntityId, DataProducer>) {
        producers.set(GOVERNMENT.id, GOVERNMENT);
    }
}

console.debug("Videoland ID", VIDEOLAND.id);

try {
    App.Main(process.argv);
} catch (e) {
    console.error(e);
}
