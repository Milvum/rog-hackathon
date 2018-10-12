import { DataProducer } from "./DataProducer";
import { DataEntityId } from "./DataEntity";

export type DataProductId = string;

export interface DataProduct {
    id: DataProductId;
    name: string;
    data: any;
}
