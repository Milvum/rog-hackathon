import ISurvey from '../models/Survey';
import Instance from '../models/Instance';
import {User, ConsumerEntry} from '../../../../server/src/models/User';

export default interface IApi {
    GetData(): Promise<Array<{name: string, instances: Instance[]}>>;
    AllSurveys(): Promise<ISurvey[]>;
    Revoke(id: string): void;
    Acquire(id: string, products: string[]): void;

    GetSurvey(code: string): Promise<ISurvey | undefined>;
    CreateSurvey(topic: string): Promise<ISurvey | undefined>;
}

function mapUser(user: User): Array<{name: string, instances: Instance[]}> {
    const instances: Array<Instance & {cat: string}> = Object.keys(user.data_consumers)
        .map((key) => ({entry: user.data_consumers[key], key}))
        .map(({entry, key}) => ({
            cat: entry.category,
            name: entry.consumer.name,
            data: Object.keys(entry.options).map((k) => user.data[k].name),
            date: entry.date,
            icon: entry.consumer.logo,
            decision: 1,
            id: key,
        }));

    const init: { [key: string]: Instance[] } = {};
    const x =  instances.reduce((collector, instance) => {
        const { cat, ...rest } = instance;
        const arr: Instance[] = collector[cat];

        if (arr) {
            arr.push(rest);
        } else {
            collector[cat] = [rest];
        }
        return collector;
    }, init );

    console.log('durr', x);
    console.log('durrdurr', Object.keys(x).map((key) => ({name: key, instances: x[key]})));
    return Object.keys(x).map((key) => ({name: key, instances: x[key]}));
}

export class Api implements IApi {
    public Acquire(id: string, products: string[]) {
        const pr: {[key: string]: boolean} = {};

        products.forEach((p) => {
            pr[p] = true;
        });

        fetch(`http://localhost:3000/permission/acquire?consumer_id=${id}`, {
            headers: {
                'content-type': 'application/json',
                'x-auth': '51247c2c-21db-409f-b083-c981f76fdc87' },
            method: 'POST',
            body: JSON.stringify({
                redirect: '',
                products: pr,
            }),
        });
    }
    public Revoke(id: string): void {
        fetch('http://localhost:3000/permission/revoke?', {
            headers: {
                'content-type': 'application/json',
                'x-auth': '51247c2c-21db-409f-b083-c981f76fdc87' },
            method: 'POST',
            body: `{"consumer": "${id}"}`,
        });
    }

    public async GetData(): Promise<Array<{name: string, instances: Instance[]}>> {
        return fetch('http://localhost:3000/test', {
            headers: {
            'x-auth': '51247c2c-21db-409f-b083-c981f76fdc87',
        }})
        .then((response) => response.json())
        .then((data: User) => mapUser(data));
    }

    public async AllSurveys(): Promise<ISurvey[]> {
        throw new DOMException();
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
