import { Client } from '@elastic/elasticsearch';
import {TicketAttrs} from '../src/models/ticket';

const client = new Client({
  node: process.env.ELASTICSEARCH_URL || 'http://elasticsearch.default.svc.cluster.local:9200',
});

// Example: Index a document
async function indexTicket(ticket: TicketAttrs) {
  try {
    await client.index({
      index: 'tickets',
      body: ticket,
    });
  } catch (err) {
    console.error('Error indexing ticket:', err);
  }
}

export { indexTicket };