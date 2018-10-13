export default interface Instance {
    icon?: string;
    name: string;
    date: Date;
    data: string[];
    decision: Decision;
    deleted?: boolean;
    id: string;
}

export enum Decision {
    DELEGATE,
    HIDE,
    CANCEL,
    TRANSFER,
}
