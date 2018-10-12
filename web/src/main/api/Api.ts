import ISurvey from '../models/Survey';

export default interface IApi {
    AllSurveys(): Promise<ISurvey[]>;
    GetSurvey(code: string): Promise<ISurvey | undefined>;
    CreateSurvey(topic: string): Promise<ISurvey | undefined>;
}

export class Api implements IApi {
    public async AllSurveys(): Promise<ISurvey[]> {
        return fetch('http://localhost:3000/survey')
            .then((response) => response.json())
            .then((data: ISurvey[]) => data)
            .catch((e) => {
                console.error(e);
                return [];
            },
        );
    }
    public async GetSurvey(code: string): Promise<ISurvey | undefined> {
        return fetch(`http://localhost:3000/survey/${code}`)
            .then((response) => {
                return response.json();
            })
            .then((data: ISurvey | undefined) => data)
            .catch((e) => {
                console.error(e);

                return undefined;
            });
    }
    public async CreateSurvey(topic: string): Promise<ISurvey | undefined> {
        return fetch(`http://localhost:3000/survey?topic=${topic}`, {
            method: 'POST',
        }).then((response) => response.json())
            .then((data: ISurvey | undefined) => data)
            .catch((e) => {
                console.error(e);
                return undefined;
            });
    }
}
