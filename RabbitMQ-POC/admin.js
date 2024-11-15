const { connectRabbitMQ } = require('./rabbit');

async function monitorAllEvents() {
  const connection = await connectRabbitMQ();
  const channel = await connection.createChannel();
  const exchange = 'petfinder.cochabamba';

  await channel.assertExchange(exchange, 'topic', { durable: true });

  const queue = 'adminQueue';
  await channel.assertQueue(queue, { durable: true });

  // Bind a eventos en todos los municipios
  await channel.bindQueue(queue, exchange, 'pet.lost.*');
  await channel.bindQueue(queue, exchange, 'pet.sighted.*');

  console.log('Admin: Waiting for all municipal events...');

  channel.consume(queue, (msg) => {
    if (msg !== null) {
      const eventData = JSON.parse(msg.content.toString());
      console.log('Admin: Received event:', eventData);
      channel.ack(msg);
    }
  });
}

monitorAllEvents();
