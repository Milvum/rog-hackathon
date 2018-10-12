import { DataProducer } from "./DataProducer";
import { DataConsumer } from "./DataConsumer";
import { ConsumptionOption } from "./ConsumptionOption";
import { DataProduct } from "./DataProduct";

export interface ProducerEntry {
    date: Date;
    producer: DataProducer;
}

export interface ConsumerEntry {
    date: Date;
    consumer: DataConsumer;
    options: ConsumptionOption;
    token: string;
    redirect: string;
    category: string;
}

export type UserId = string;

export interface User {
    id: UserId;
    name: string;
    /**
     * List of services that produce data for or about you.
     */
    data_producers: { [key: string]: ProducerEntry };
    /**
     * List of services that consumer your data, or data about you.
     */
    data_consumers: { [key: string]: ConsumerEntry };

    data: { [key: string]: DataProduct };
}
