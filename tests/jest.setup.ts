import * as dotenv from 'dotenv';

dotenv.config();

process.env.APP_CONTEXT = 'SYNC';

jest.mock('../src/infrastructure/log/logger');
