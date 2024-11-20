import { Kafka, Consumer, logLevel } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'consumer-service',
  brokers: [process.env.KAFKA_BROKERS || 'kafka.default.svc.cluster.local:9092'],
  ssl: false,
  sasl: {
    mechanism: 'scram-sha-512',
    username: process.env.KAFKA_USERNAME || 'user1',
    password: process.env.KAFKA_PASSWORD || 'jma8rffn8y',
  },
//   logLevel: logLevel.DEBUG
});

const consumer = kafka.consumer({ groupId: 'user-signup-group' });

async function runConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'user-created', fromBeginning: true });
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });
  console.log("Subscribed to topic: user-created");
  console.log("Subscribed to topic: test-topic");

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        if (message.value) {
            console.log(`Received message: ${message.value.toString()}`);
            // Process the message (e.g., send email, update database, etc.)
          } else {
            console.error('Received a message with no value');
          }
      // Process the message (e.g., send email, update database, etc.)
    },
  });
}



export { runConsumer };