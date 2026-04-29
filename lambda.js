const awsLambdaFastify = require('@fastify/aws-lambda')
const init = require('./app')

const proxy = awsLambdaFastify(init())

// Strip the Netlify functions prefix (/.netlify/functions/server) from the path
// so Fastify sees the actual route (e.g., /api/cards instead of /.netlify/functions/server/api/cards)
const NETLIFY_PREFIX = '/.netlify/functions/server'

exports.handler = function (event, context, callback) {
  if (event.path && event.path.startsWith(NETLIFY_PREFIX)) {
    event.path = event.path.slice(NETLIFY_PREFIX.length) || '/'
  }
  if (event.rawPath && event.rawPath.startsWith(NETLIFY_PREFIX)) {
    event.rawPath = event.rawPath.slice(NETLIFY_PREFIX.length) || '/'
  }
  return proxy(event, context, callback)
};
