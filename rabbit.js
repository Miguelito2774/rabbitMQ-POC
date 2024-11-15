const amqp = require('amqplib');

async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    console.log('Connected to RabbitMQ');
    return connection;
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
    throw error;
  }
}

module.exports = { connectRabbitMQ };
