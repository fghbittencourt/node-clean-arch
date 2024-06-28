import { FastifyReply, FastifyRequest, FastifySchema } from 'fastify'

export default interface FastifyController {
  handle(request: FastifyRequest, reply: FastifyReply): Promise<void>;
  schema: FastifySchema;
}
