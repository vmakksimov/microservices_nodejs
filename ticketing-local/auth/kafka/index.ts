import { Kafka, Producer, Consumer, logLevel } from 'kafkajs';
import {  UserAttr } from '../src/models/user';

console.log('Kafka Environment Variables:', {
  brokers: process.env.KAFKA_BROKERS,
  username: process.env.KAFKA_USERNAME,
  passwordProvided: !!process.env.KAFKA_PASSWORD
});

const kafka = new Kafka({
  clientId: 'auth-service',
  brokers: [process.env.KAFKA_BROKERS || 'kafka.default.svc.cluster.local:9092'],
  ssl: false,
  sasl: {
      mechanism: 'scram-sha-512',
      username: process.env.KAFKA_USERNAME || 'user1',
      password: process.env.KAFKA_PASSWORD || 'jma8rffn8y'
  },
  // logLevel: logLevel.DEBUG
})

const producer = kafka.producer()

async function publishUserCreatedEvent(user: UserAttr) {
  try {
    console.log('Attempting to connect to Kafka...');
    await producer.connect();
    console.log('Connected to Kafka successfully');
    
    await producer.send({
      topic: 'user-created',
      messages: [{ value: JSON.stringify(user) }]
    });
    console.log('User created event published');
  } catch (error) {
    console.error('Kafka publish error:', error);
    throw error;
  } finally {
    await producer.disconnect();
  }
}


export { publishUserCreatedEvent };