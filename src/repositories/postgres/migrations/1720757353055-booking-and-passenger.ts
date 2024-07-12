/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class ChangeMyName1720757353055 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('passenger')
    await queryRunner.dropTable('booking')
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        columns: [
          {
            generationStrategy: 'uuid',
            isPrimary: true,
            name: 'booking_id',
            type: 'uuid',
          },
          {
            isNullable: false,
            name: 'created_at',
            type: 'timestamp',
          },
          {
            isNullable: false,
            name: 'updated_at',
            type: 'timestamp',
          },
          {
            isNullable: false,
            name: 'date',
            type: 'timestamp',
          },
          {
            isNullable: false,
            name: 'flight_number',
            type: 'character varying',
          },
          {
            enum: ['CONFIRMED', 'CREATED'],
            enumName: 'booking_status_enum',
            isNullable: false,
            name: 'status',
            type: 'enum',
          },
        ],
        name: 'booking',
      }),
    )

    await queryRunner.createTable(
      new Table({
        columns: [
          {
            generationStrategy: 'uuid',
            isPrimary: true,
            name: 'passengerId',
            type: 'uuid',
          },
          {
            isNullable: false,
            name: 'created_at',
            type: 'timestamp',
          },
          {
            isNullable: false,
            name: 'updated_at',
            type: 'timestamp',
          },
          {
            isNullable: false,
            name: 'name',
            type: 'character varying',
          },
          {
            isNullable: false,
            name: 'booking_id',
            type: 'uuid',
          },
          {
            isNullable: false,
            name: 'passport_number',
            type: 'character varying',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['passengerId'],
            referencedColumnNames: ['booking_id'],
            referencedTableName: 'booking',
          },
        ],
        name: 'passenger',
      }),
    )
  }
}
