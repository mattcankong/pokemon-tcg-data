const Fastify = require('fastify')
const cors = require('@fastify/cors')
const enums = require('./functions/enums')
const fs = require('fs')
const path = require('path')

function init() {
  const fastify = Fastify({
    logger: true
  })

  fastify.register(cors)

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

  // Base directory for card data files — used to prevent path traversal
  const CARD_DATA_DIR = path.resolve(__dirname, 'data', 'cards', 'en')

  fastify.get('/api/cards/:id', async function handler (request, reply) {
    const { id } = request.params

    // Parse composite id: <setid>-<cardnumber> (e.g., "base1-1")
    const lastDash = id.lastIndexOf('-')
    if (lastDash === -1) {
      reply.code(400).send({ error: 'Invalid card ID format. Expected <setid>-<cardnumber>.' })
      return
    }

    const setId = id.substring(0, lastDash)
    const cardFile = path.resolve(CARD_DATA_DIR, `${setId}.json`)

    // Guard against path traversal — resolved path must stay inside CARD_DATA_DIR
    if (!cardFile.startsWith(CARD_DATA_DIR + path.sep)) {
      reply.code(400).send({ error: 'Invalid card ID.' })
      return
    }

    let cards
    try {
      const fileContent = fs.readFileSync(cardFile, 'utf8')
      cards = JSON.parse(fileContent)
    } catch (err) {
      reply.code(404).send({ error: 'Card not found' })
      return
    }

    const card = cards.find(c => c.id === id)
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
