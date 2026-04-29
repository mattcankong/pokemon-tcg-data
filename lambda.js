import awsLambdaFastify from '@fastify/aws-lambda'
import init from './app'

const proxy = awsLambdaFastify(init())

exports.handler = proxy;
