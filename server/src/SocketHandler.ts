import Database from "./database/Database";
import { Server, Socket } from "socket.io";
import Survey from "./survey/Survey";
import { InsertSubmission } from "./survey/Submission";

type Mode = "host" | "submitter";

interface SocketSubmitterContainer extends ISocketContainer {
    mode: "submitter";
    name: string;
}

interface ISocketContainer {
    mode: Mode;
    survey: number;
    room: string;
    socket: Socket;
}

interface SocketHostContainer extends ISocketContainer {
    mode: "host";
}

type SocketContainer = SocketHostContainer | SocketSubmitterContainer;

export default class SocketHandler {
    private map: Map<string, SocketContainer> = new Map();

    public constructor(private readonly db: Database, private readonly io: Server) {
        io.on("connection", this.ConnectionHandler);
    }

    private ConnectionHandler = async (socket: Socket) => {
        const code = socket.handshake.query.room;
        const name = socket.handshake.query.name;
        const mode: Mode = socket.handshake.query.mode;

        if (!code) {
            socket.disconnect(true);
            return;
        }

        const survey = await this.db.GetSurveyByCode(code);

        if (!survey) {
            socket.emit("reject", "Survey does not exist");
            socket.disconnect(true);
            return;
        }

        socket.join(survey.code);

        if (mode === "host") {
            this.map.set(socket.id, {
                socket: socket,
                mode: "host",
                room: survey.code,
                survey: survey.id,
            });

            this.map.forEach((value, key) => {
                if (value.survey !== survey.id || value.mode === "host") {
                    return;
                }

                socket.emit("userConnected", value.name);
            });

            socket.on("close", () => this.CloseHandler(socket));
        } else if (mode === "submitter") {
            if (!name) {
                socket.disconnect(true);
                return;
            }

            this.map.set(socket.id, {
                socket: socket,
                mode: "submitter",
                room: survey.code,
                survey: survey.id,
                name: name,
            });

            socket.on("submit", msg => this.SubmitHandler(socket, msg));

            this.io.in(survey.code).emit("userConnected", name);
        }

        socket.on("disconnect", () => this.DisconnectHandler(socket));
    }

    private CloseHandler = async (socket: Socket) => {
        const container = this.map.get(socket.id);

        if (!container || container.mode !== "host") {
            return;
        }

        await this.db.CloseSurvey(container.survey);
        const survey = await this.db.GetSurvey(container.survey);

        this.io.in(container.room).emit("surveyClosed", survey);
    }

    private DisconnectHandler = (socket: Socket) => {
        const container = this.map.get(socket.id);

        if (!container) {
            return;
        }

        if (container.mode === "submitter") {
            this.io.in(container.room).emit("userDisconnected", container.name);
        }

        this.map.delete(socket.id);
    }

    private SubmitHandler = async (socket: Socket, msg: string) => {
        const container = this.map.get(socket.id);

        if (!container || container.mode !== "submitter") {
            return;
        }

        const survey = await this.db.GetSurvey(container.survey);

        if (!survey || survey.closed) {
            return;
        }

        const insert: InsertSubmission = {
            date: new Date(),
            entry: msg,
            submitter: container.name,
        };

        const result = await this.db.InsertSubmission(insert, survey);

        if (!result) {
            return;
        }

        this.io.in(container.room).emit("submission", result);
    }
}
