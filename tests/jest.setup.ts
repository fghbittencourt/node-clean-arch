import * as dotenv from 'dotenv'
import fetchMock from 'jest-fetch-mock'
// eslint-disable-next-line import/no-extraneous-dependencies
import 'reflect-metadata'

fetchMock.enableMocks()
dotenv.config()

process.env.APP_CONTEXT = 'SYNC'

jest.mock('../src/infrastructure/log/logger')
