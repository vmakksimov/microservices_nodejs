import { Kafka, Consumer, logLevel } from 'kafkajs';
import {TicketAttrs } from '../src/models/ticket';
const kafka = new Kafka({
    clientId: 'tickets-service', // Unique clientId for your tickets service
    brokers: [process.env.KAFKA_BROKERS || 'kafka.default.svc.cluster.local:9092'],
    ssl: false,
    sasl: {
      mechanism: 'scram-sha-512',
      username: process.env.KAFKA_USERNAME || 'user1',
      password: process.env.KAFKA_PASSWORD || 'jma8rffn8y'
    },
    // logLevel: logLevel.DEBUG // Uncomment for debugging
  });

const producer = kafka.producer();


const publishTicketCreatedEvent = async (ticket: TicketAttrs) => {
  try {
    console.log('Attempting to connect to Kafka...');
    await producer.connect();
    console.log('Connected to Kafka successfully');
    
    await producer.send({
      topic: 'ticket-created',
      messages: [{ value: JSON.stringify(ticket) }]
    });
    console.log('Ticket created event published');
  } catch (error) {
    console.error('Kafka publish TicketCreatedEvent error:', error);
    throw error;
  } finally {
    await producer.disconnect();
  }
};

export { publishTicketCreatedEvent };