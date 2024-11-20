import { Client } from '@elastic/elasticsearch';
import {UserAttr} from '../src/models/user';

const client = new Client({
  node: process.env.ELASTICSEARCH_URL || 'http://elasticsearch.default.svc.cluster.local:9200',
});

// Example: Index a document
async function indexTicket(ticket: UserAttr) {
  try {
    await client.index({
      index: 'users',
      body: ticket,
    });
  } catch (err) {
    console.error('Error indexing ticket:', err);
  }
}

export { indexTicket };