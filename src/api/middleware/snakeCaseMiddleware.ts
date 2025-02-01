/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyReply, FastifyRequest } from 'fastify'

const convertObjectKeys = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(convertObjectKeys)
  } if (obj !== null && typeof obj === 'object') {
    const newObj: any = {}
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const newKey = key.replace(/_([a-z])/g, (match, group1) => group1.toUpperCase())
        newObj[newKey] = convertObjectKeys(obj[key])
      }
    }
    return newObj
  }
  return obj
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
