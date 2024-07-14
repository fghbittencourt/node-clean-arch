import * as dotenv from 'dotenv'
import { DataSource } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

dotenv.config()

export default new DataSource(
  {
    database: process.env.DB_POSTGRES_NAME,
    entities: ['./src/repositories/postgres/**/*Schema.{js,ts}'],
    host: process.env.DB_POSTGRES_HOST,
    migrations: ['./src/repositories/postgres/migrations/*.{js,ts}'],
    namingStrategy: new SnakeNamingStrategy(),
    password: process.env.DB_POSTGRES_PASSWORD,
    port: Number(process.env.DB_POSTGRES_PORT),
    type: 'postgres',
    username: process.env.DB_POSTGRES_USER,
  },
)
