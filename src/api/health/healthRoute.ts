import { FastifyReply, FastifyRequest } from 'fastify'

export default async (request: FastifyRequest, reply: FastifyReply) => {
  const healthy = {
    app: process.env.APP_NAME,
    httpStatus: 200,
    status: 'healthy',
    timestamp: Date.now(),
    uptime: process.uptime(),
  }

  reply.send(healthy)
}
