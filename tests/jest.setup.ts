import * as dotenv from 'dotenv';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'reflect-metadata';

dotenv.config();

process.env.APP_CONTEXT = 'SYNC';

jest.mock('../src/infrastructure/log/logger');
