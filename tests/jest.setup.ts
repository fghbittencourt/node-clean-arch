import * as dotenv from 'dotenv';
import 'reflect-metadata';

dotenv.config();

process.env.APP_CONTEXT = 'SYNC';

// This is to mock all Logger calls to not display them on tests
jest.mock('../src/infrastructure/log/logger', async () => {
  return jest.fn().mockResolvedValue(false);
});
