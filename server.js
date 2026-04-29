import Fastify from 'fastify'
const fastify = Fastify({
  logger: true
})

// Declare a route
fastify.get('/', async function handler (request, reply) {
  return { hello: 'world' }
})

// --- Cards ---

fastify.get('/api/cards', async function handler (request, reply) {
  // TODO: Implement listCards with pagination and filtering
  const { page, pageSize, sort, order, name, setId, type, subtype, supertype, rarity } = request.query
  return {
    data: [],
    totalCount: 0,
    pageSize: pageSize || 20,
    page: page || 1
  }
})

fastify.get('/api/cards/:id', async function handler (request, reply) {
  // TODO: Implement getCardById
  const { id } = request.params
  const card = null // find card by id
  if (!card) {
    reply.code(404).send({ error: 'Card not found' })
    return
  }
  return { data: card }
})

// --- Sets ---

fastify.get('/api/sets', async function handler (request, reply) {
  // TODO: Implement listSets with pagination and filtering
  const { page, pageSize, sort, order, id, name } = request.query
  return {
    data: [],
    totalCount: 0,
    pageSize: pageSize || 20,
    page: page || 1
  }
})

fastify.get('/api/sets/:id', async function handler (request, reply) {
  // TODO: Implement getSetById
  const { id } = request.params
  const set = null // find set by id
  if (!set) {
    reply.code(404).send({ error: 'Set not found' })
    return
  }
  return { data: set }
})

// --- Enums ---

fastify.get('/api/rarities', async function handler (request, reply) {
  // TODO: Implement listRarities
  return { data: [] }
})

fastify.get('/api/supertypes', async function handler (request, reply) {
  // TODO: Implement listSupertypes
  return { data: [] }
})

fastify.get('/api/subtypes', async function handler (request, reply) {
  // TODO: Implement listSubtypes
  return { data: [] }
})

fastify.get('/api/types', async function handler (request, reply) {
  // TODO: Implement listTypes
  return { data: [] }
})

// Run the server!
try {
  await fastify.listen({ port: 3000, host: '0.0.0.0' })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
