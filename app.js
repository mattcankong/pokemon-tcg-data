const Fastify = require('fastify')
const enums = require('./functions/enums')

function init() {
  const fastify = Fastify({
    logger: true
  })

  fastify.get('/', async function handler (request, reply) {
    return { hello: 'world' }
  })

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
    return { data: enums.rarities }
  })

  fastify.get('/api/supertypes', async function handler (request, reply) {
    return { data: enums.supertypes }
  })

  fastify.get('/api/subtypes', async function handler (request, reply) {
    return { data: enums.subtypes }
  })

  fastify.get('/api/types', async function handler (request, reply) {
    return { data: enums.types }
  })

  return fastify
}

if (process.argv[1] === __filename) {
  const port = 3000
  const host = '0.0.0.0'
  init().listen({ host, port }, (err) => {
    if (err) console.error(err);
    console.log('server listening on 3000');
  });
}

module.exports = init;
