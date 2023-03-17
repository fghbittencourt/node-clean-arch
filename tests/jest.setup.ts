import * as dotenv from 'dotenv';
import 'reflect-metadata';
import { getConnection } from 'typeorm';
import PostgresDbHealth from '../src/repositories/postgresDb/postgresDbHealth';

dotenv.config();

process.env.AWS_ACCESS_KEY_ID = 'dummy';
process.env.AWS_SECRET_ACCESS_KEY = 'dummy';
process.env.APP_CONTEXT = 'SYNC';

// This is to mock all Logger calls to not display them on tests
jest.mock('../src/infrastructure/log/logger');
  return jest.fn().mockResolvedValue(false);
});

afterAll(async () => {
  if (PostgresDbHealth.checkExistenceOfConnection())
    await getConnection().close();
});
