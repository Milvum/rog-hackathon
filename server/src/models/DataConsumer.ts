import { DataEntity } from "./DataEntity";
import { DataProduct, DataProductId } from "./DataProduct";

export interface DataConsumer extends DataEntity {
    data_consumption: Map<DataProductId, DataProduct>;
}
