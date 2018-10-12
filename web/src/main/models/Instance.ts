export default interface Instance {

    name: string;
    date: Date;
    data: string[];
    decision: Decision;
}

export enum Decision {
    DELEGATE,
    HIDE,
    CANCEL,
    TRANSFER,
}
