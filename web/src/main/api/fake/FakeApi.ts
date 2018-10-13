import IApi from '../Api';
import ISurvey from '../../models/Survey';
import Instance from '../../models/Instance';

export default class FakeApi implements IApi {

    public GetData(): Promise<Array<{ name: string; instances: Instance[]; }>> {
        throw new Error('Method not implemented.');
    }
    public async CreateSurvey(topic: string): Promise<ISurvey | undefined> {
        return {
            closed: false,
            code: 'ZZZZ',
            id: 1,
            submissions: [],
            title: topic,
        };
    }

    public async AllSurveys(): Promise<ISurvey[]> {
        return [
            {
                closed: false,
                code: 'AAAA',
                id: 1,
                submissions: [],
                title: 'Survey 1',
            },
            {
                closed: false,
                code: 'AAAB',
                id: 2,
                submissions: [],
                title: 'Survey 2',
            },
            {
                closed: false,
                code: 'AAAC',
                id: 3,
                submissions: [],
                title: 'Survey 3',
            },
            {
                closed: false,
                code: 'AAAD',
                id: 4,
                submissions: [],
                title: 'Survey 4',
            },
        ];
    }

    public async GetSurvey(code: string): Promise<ISurvey | undefined> {
        return {
            closed: false,
            code,
            id: 1,
            submissions: [
                {
                    id: 1,
                    survey_id: 1,
                    date: new Date(),
                    entry: 'Great idea',
                    submitter: 'Someone',
                },
            ],
            title: 'Is this a great idea?',
        };
    }
}
