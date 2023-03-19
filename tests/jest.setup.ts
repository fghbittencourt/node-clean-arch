import * as dotenv from 'dotenv';
import 'reflect-metadata';

dotenv.config();

process.env.APP_CONTEXT = 'SYNC';

jest.mock('../src/infrastructure/log/logger');
