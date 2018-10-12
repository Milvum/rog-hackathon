import * as Express from "express";
import * as http from "http";
import * as SocketIO from "socket.io";
import * as Winston from "winston";
import * as BodyParser from "body-parser";
import { Router } from "./routes/Router";
import SqliteDatabase from "./database/SqliteDatabase";
import * as sqlite3 from "sqlite3";
import SocketHandler from "./SocketHandler";
import * as cors from "cors";

export class App {
    public static async Main(args: string[]): Promise<void> {
        const app = Express();
        app.use(cors());
        app.use(BodyParser.json());
        app.use(BodyParser.urlencoded({ extended: true }));

        const server = http.createServer(app);
        const io = SocketIO(server);

        const sqliteDb = new sqlite3.Database(":memory:");
        const db = new SqliteDatabase(sqliteDb);
        await db.Initialize();
        const sh = new SocketHandler(db, io);

        Router(app, db);

        server.listen(3000, () => {
            console.info(`Server started on port ${3000}`);
        });
    }
}

try {
    App.Main(process.argv);
} catch (e) {
    console.error(e);
}
