import { Kafka, Producer } from "kafkajs";
import CONFIGURATION from "../config";

class KafkaConnector {

    private static instance: KafkaConnector;
    private producer: Producer;

    private constructor() {
        const kafka = new Kafka({
            clientId: CONFIGURATION.KAFKA_CLIENTID,
            brokers: [CONFIGURATION.KAFKA_BROKER],
        });

        this.producer = kafka.producer();
    }


    public async connect(): Promise<Producer> {
        if (!this.producer) {
            throw new Error("Kafka producer is not initialized.");
        }
        await this.producer.connect();
        return this.producer;
    }

    public static async getInstance(): Promise<KafkaConnector>{

        if ((KafkaConnector.instance instanceof KafkaConnector) === false) {
            KafkaConnector.instance = new KafkaConnector()
            await KafkaConnector.instance.connect();
        }

        return Promise.resolve(KafkaConnector.instance);
    }
    public async send(topic: string, messages: any[]): Promise<void> {
        if (!this.producer) {
            throw new Error("Kafka producer is not initialized.");
        }
        await this.producer.send({ topic, messages });
    }


}

export default KafkaConnector;