/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyReply, FastifyRequest } from 'fastify'

function convertObjectKeys(obj: any): any {
  const newObj: any = {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = key.replace(/_([a-z])/g, (match, group1) => group1.toUpperCase())
      newObj[newKey] = obj[key]
    }
  }
  return newObj
}

// Custom middleware to convert snake_case to camelCase
export default function snakeToCamelMiddleware(
  request: FastifyRequest,
  _: FastifyReply,
  done: () => void,
) {
  if (request.body && typeof request.body === 'object') {
    request.body = convertObjectKeys(request.body)
  }
  done()
}
