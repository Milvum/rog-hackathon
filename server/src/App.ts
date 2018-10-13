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
const BRP_ID = "05a56c7c-1207-49e3-adb0-b096ca6425d0";
const PHONE_ID = "a2cafcb1-01b2-4409-af75-a3a2050b14fa";

const BRP: DataProduct = {
    data: {
        naam: "Marco",
        achternaam: "van Dijk",
    },
    id: BRP_ID,
    name: "Voor- achternaam",
};

const PHONE: DataProduct = {
    data: [
        "0612345678",
    ],
    id: PHONE_ID,
    name: "Telefoonnummer",
};

const NETFLIX: DataConsumer = {
    data_consumption: new Map(),
    id: uuid.v4(),
    name: "Netflix",
    logo: "iVBORw0KGgoAAAANSUhEUgAAACoAAABKCAYAAADNN8YBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA0NJREFUeNrMmV9yEkEQxmeGf0bLiKlEtHiQI3AEbhByAriBZ/EG8QbJCfQIHCEvPEhQKS1FlrDj9LJDdhFSu93TXTtVSx74sz++b7r7m6CnJ+efFW4tusv5VdEX3zZfjd2fHvJe1/Xf1g5eaI16t/uSfQc7KfjykbsGSNAv5t7GirBGSmiZH9ZS3j8WA90oqwiwbWf/UAQUHmYxyf5LMdAFbZ8OnaptEVAoeoKqADkUAYWHb7SiuhQB9fv0ocL270Bbzv6vtKIaioDWHeh9TLL/gwior36C/X1nf08EtOFUnW6qaX8OtAmgcTVnfw4UMtTSjdQlvlWB/X12UK/qjFZUIxHQhrvuKtim/gOFNhU563/h7e85+wfsoFUtqoOgjWRK2UrZf1RRqPzvFQrU5tgTTXrzvxQBbWhy8h+HTFRHQSFNrenHlCE7qElbFbGodvb/sUygvvlP6YE6SVR/Y0bQZvoPlBCBGj7hwXIpqrdBJdTsj7gUzR5RQgTqyDKCNlL7iT01OaaA9TEXqN+n00Btam2ZQHXapn5aUqDunWqdBOoVF6jfp4pYVF1j2qyK+n6qiIG6W9veyiJhC4GC9TW1TVTYQF13V8dsbxdxgeaqn6DqG6P5QR+nFH6fekU3qnybKq0oJVDXt0WlMNVfGFRneyqh+XdS+9dcoFlVZ6R9apIuEnGC+n66DgBbtqhM2W9VU/Si8j11zQV6YPYvMKBnWqsTd0USoOm6oRTVpkSYLg3qw3S6bgmzf7ffWUCz1d9dzm+w9r8saT8KtJW3/5qiKhSU5QLd26ef8KDFmz8K1Ifp1H74vf4O8zlg/WlB+w1WjVDVD/avOEGf50E/UqKfLdCm0KA5VZZzsH6CtR/iX6QEQKlFBapGVg6UMKVMYr2VAE3tR8H689RTqoZUlDRSwf4VE+gkpP1+9nOALg7Yv6DAXmhzdEqFtp5U/Z0nqj84KCVRwRHFKjlFSXv1rYONBUFJgfrQPmUBTe1HJSoI1EZpMUVJ9r/WsqDo6n9/YEqxgVID9bM9+zkVJal6sTepuEHRB79zp2osBUoN1K2M/dyKkux/l7FfAhRt/5l+HKnsoJREVU96qhFTlDRSffP/J8AAlb5AUcVXj60AAAAASUVORK5CYII=",
};

const SPOTIFY: DataConsumer = {
    data_consumption: new Map(),
    id: uuid.v4(),
    name: "Spotify",
    logo: "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",
};

const ABN: DataConsumer = {
    data_consumption: new Map(),
    id: uuid.v4(),
    name: "Spaarrekening",
    logo: "iVBORw0KGgoAAAANSUhEUgAAABsAAAAjCAYAAABl/XGVAAAAAXNSR0IArs4c6QAAATlJREFUSA3t1L1KA0EQAODZNZxFsIld8D2UoF0Q8xAWgbMSfZs0FiGSRwhYBwJ5jwgBGy3VI4njDbJ4mt3bnf1JlWn2FnbmW+aWEfA4QNhFyEZb7sJRxh5TnQha920Map9K9mqjQCxUAc7qhU1a47UA/ORAdNYLu8iem9PWcMUFvTC65Xm2OOKC3pgPGIRVQYn4Tvu6CMaoOLV0dvywsYFRMALPsqUVjIa5gFExGxgdqwOTYCYwGaYDJSCwZxwVcg31SqE4KErsqweeU9wVPD1c3kOev0no301L7CoViAL6jcvXEV3s558lAqvQL0ZfkcH/0F8sIqiDtrEIoAnSYwFgHWTGPEAbVI9VQcAP2prCBaJc+7iiVypFFwygK+SG0anr27kO5EDumAbkQlSCH+NB5+Xp5IafCPANL8TG+pwmk0MAAAAASUVORK5CYII=",
};

const VIDEOLAND: DataConsumer = {
    data_consumption: new Map(),
    id: VIDEOLAND_ID,
    name: "Videoland",
    logo: "iVBORw0KGgoAAAANSUhEUgAAACIAAAAmCAYAAACh1knUAAAAAXNSR0IArs4c6QAAAl5JREFUWAm9WCtIBUEUfX4QDAoaNJhMNrGIRSyCFkEQVPxU4YEgBoNJX9RgsCgGg99gEoPBYhBULGIzmQxqMBgU8XuOvJX79u3Mnf1emMfsnnvPPXt3LjP7crlc7hzjRxkdwKPaGAI1/m2SD7k60jmCXSBGE9JO3kqMO8X5A3gjRlhjJTURJ5J02iFgQQY4znccePslVy0unpWgB+DVMkiZNwNnJW0VufU4+FpobxhrfzPzD4lHzHAZkscdTfhSWRRuNGG8Y9iegAvPxSiAFbRxPQI3Ct1Ugkns0srjDjzz8DFaGxDbUxDjAtTsEg42nlfgdRrJsULCBcj1YjKXll01Bcv7vbiwPQ2xRRngm+8q8V/AW3wxxssbhYwLMWihubTsgTFrADCpCGFVuCD9xkoRs41Of5Dtmk97rxByQUpjjNayZzLAdT4HR9uTEZOtPOHgP+iaXPqxvV4U8l0RcK34cmOtEP6hpisKudfKXYofq5cPldnnzDZju9leUQH4nuLDDbUGI5btI9om5Ak4K2PzKQCPbTw92ZJoGDfShtgqigSnMcRsJCWCPAMRhXwjrpUESRnbjqcp7TX48aOkBEieqQhCeiRBUnO2n3aulRXhxpma8SQvk9nmo6mpADHbUDvXUhw3TO9gjmk6tg5aWyWIzaaTupSV7ci2NInhRsnvpEzsEFlMQpYzUVBM0m0Qwj2H30eZ2hWy+auylamCYrLhACHcIDM3tqc815b8vZC1mhkk9F5PX9bJZT62Kdv1/+8FCYaZV4VxDvD9xL16DLZzqntLQO6yW2xXftPEsl9hfdkdR+OzSgAAAABJRU5ErkJggg==",
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
            date: new Date("2017-10-13"),
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
            date: new Date("2017-03-13"),
            options: {},
            redirect: "https://nice.link/redir",
            token: uuid.v4(),
        };

        spotify_entry.options[BRP.id] = true;

        user.data_consumers[SPOTIFY.id] = spotify_entry;

        const abn_entry: ConsumerEntry = {
            category: "Financieel",
            consumer: ABN,
            date: new Date("2017-03-13"),
            options: {},
            redirect: "https://nice.link/redir",
            token: uuid.v4(),
        };

        abn_entry.options[BRP.id] = true;
        abn_entry.options[PHONE.id] = true;

        user.data_consumers[ABN.id] = abn_entry;

        user.data_producers[GOVERNMENT.id] = {
            date: new Date("2000-01-01"),
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
