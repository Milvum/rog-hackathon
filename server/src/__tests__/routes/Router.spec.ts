import { Express } from "express";
import { Router } from "../../routes/Router";
import Database from "../../database/Database";

describe("Router", () => {
    let app: Express;
    let db: Database;
    let mockGet: jest.Mock<{}>;
    let mockPost: jest.Mock<{}>;

    beforeEach(() => {
        mockGet = jest.fn();
        mockPost = jest.fn();

        const mockApp = jest.fn<Express>(() => ({
            get: () => mockGet(),
            use: () => { return; },
            post: () => mockPost(),
        }));

        const mockDb = jest.fn<Database>(() => ({

        }));

        db = new mockDb();
        app = new mockApp();
    });

    test("Mounts survey router on correct route", () => {
        Router(app, db);

        expect(mockGet.mock.calls.length).toBe(2);
        expect(mockPost.mock.calls.length).toBe(1);
    });
});
