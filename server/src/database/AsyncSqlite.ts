import { Database, Statement, RunResult } from "sqlite3";

export interface GetResult {
    statement: Statement;
    row?: any;
}

export interface AllResult {
    statement: Statement;
    rows: any[];
}

export default class AsyncSqlite {
    public constructor(private readonly db: Database) { }

    public async Run(sql: string, params?: any): Promise<RunResult> {
        return new Promise<RunResult>((res, rej) => {
            this.db.run(sql, params, function (this: RunResult, err: Error | null) {
                err ? rej(err) : res(this);
            });
        });
    }

    public async All(sql: string, params?: any): Promise<AllResult> {
        return new Promise<AllResult>((res, rej) => {
            this.db.all(sql, params, function (this: Statement, err: Error | null, rows: any[]) {
                err ? rej(err) : res({
                    statement: this,
                    rows: rows,
                });
            });
        });
    }
}
