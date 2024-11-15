const { connectRabbitMQ } = require('./rabbit');

async function registerLostPet(petData, municipality) {
  const connection = await connectRabbitMQ();
  const channel = await connection.createChannel();
  const exchange = 'petfinder.cochabamba';

  await channel.assertExchange(exchange, 'topic', { durable: true });

  const routingKey = `pet.lost.${municipality}`;
  const message = JSON.stringify(petData);

  channel.publish(exchange, routingKey, Buffer.from(message));
  console.log(`PetOwner (${municipality}): Registered lost pet:`, petData);

  setTimeout(() => {
    connection.close();
  }, 500);
}

// Datos de prueba para una mascota perdida en Cercado
const lostPet = {
  ownerId: 1,
  petName: 'Buddy',
  location: 'Plaza Colón',
  description: 'Golden Retriever, collar azul',
  timestamp: new Date().toISOString()
};

registerLostPet(lostPet, 'cercado');
