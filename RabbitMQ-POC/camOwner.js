const { connectRabbitMQ } = require('./rabbit');

async function monitorLostPets(municipality) {
  const connection = await connectRabbitMQ();
  const channel = await connection.createChannel();
  const exchange = 'petfinder.cochabamba';

  await channel.assertExchange(exchange, 'topic', { durable: true });

  const queue = `${municipality}CamOwnerQueue`;
  const routingKey = `pet.lost.${municipality}`;

  await channel.assertQueue(queue, { durable: true });
  await channel.bindQueue(queue, exchange, routingKey);

  console.log(`CamOwner (${municipality}): Waiting for lost pets...`);

  channel.consume(queue, (msg) => {
    if (msg !== null) {
      const petData = JSON.parse(msg.content.toString());
      console.log(`CamOwner (${municipality}): Found lost pet:`, petData);
      reportSightedPet(petData, municipality);
      channel.ack(msg);
    }
  });
}

async function reportSightedPet(petData, municipality) {
  const connection = await connectRabbitMQ();
  const channel = await connection.createChannel();
  const exchange = 'petfinder.cochabamba';

  const routingKey = `pet.sighted.${municipality}`;
  petData.sightedLocation = `Location in ${municipality}`;

  const message = JSON.stringify(petData);

  channel.publish(exchange, routingKey, Buffer.from(message));
  console.log(`CamOwner (${municipality}): Reported sighted pet:`, petData);

  setTimeout(() => {
    connection.close();
  }, 500);
}

// monitorear eventos de mascotas perdidas en Cercado
monitorLostPets('cercado');
monitorLostPets('quillacollo'); // Puedes monitorear otros municipios
