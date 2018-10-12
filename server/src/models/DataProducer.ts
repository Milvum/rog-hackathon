import { DataEntity } from "./DataEntity";
import { DataProduct, DataProductId } from "./DataProduct";

export interface DataProducer extends DataEntity {
    data_production: Map<DataProductId, DataProduct>;
}
