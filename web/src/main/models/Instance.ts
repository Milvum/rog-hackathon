export default interface Instance {
    icon?: string;
    name: string;
    date: Date;
    data: string[];
    decision: Decision;
    deleted?: boolean;
}

export enum Decision {
    DELEGATE,
    HIDE,
    CANCEL,
    TRANSFER,
}
