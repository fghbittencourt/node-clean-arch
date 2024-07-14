import { MigrationInterface, QueryRunner } from 'typeorm'

export default class implements MigrationInterface {
  name = 'BookingAndPassengerTable1720964384231'

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "booking_passengers_passenger" DROP CONSTRAINT "FK_522a9d27d1d1a5a3f650f4cde2f"')
    await queryRunner.query('ALTER TABLE "booking_passengers_passenger" DROP CONSTRAINT "FK_afa537be69faa70c1403b3ac416"')
    await queryRunner.query('DROP INDEX "public"."IDX_522a9d27d1d1a5a3f650f4cde2"')
    await queryRunner.query('DROP INDEX "public"."IDX_afa537be69faa70c1403b3ac41"')
    await queryRunner.query('DROP TABLE "booking_passengers_passenger"')
    await queryRunner.query('DROP TABLE "booking"')
    await queryRunner.query('DROP TYPE "public"."booking_status_enum"')
    await queryRunner.query('DROP TABLE "passenger"')
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "passenger" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL, "name" character varying NOT NULL, "passport_number" character varying NOT NULL, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_50e940dd2c126adc20205e83fac" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE TYPE "public"."booking_status_enum" AS ENUM(\'CONFIRMED\', \'CREATED\')')
    await queryRunner.query('CREATE TABLE "booking" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "date" TIMESTAMP NOT NULL, "flight_number" character varying NOT NULL, "id" uuid NOT NULL, "status" "public"."booking_status_enum" NOT NULL, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "customer_email" character varying NOT NULL, "customer_name" character varying NOT NULL, CONSTRAINT "PK_49171efc69702ed84c812f33540" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE TABLE "booking_passengers_passenger" ("booking_id" uuid NOT NULL, "passenger_id" uuid NOT NULL, CONSTRAINT "PK_2123568bea7d73fa0eae4411a29" PRIMARY KEY ("booking_id", "passenger_id"))')
    await queryRunner.query('CREATE INDEX "IDX_afa537be69faa70c1403b3ac41" ON "booking_passengers_passenger" ("booking_id") ')
    await queryRunner.query('CREATE INDEX "IDX_522a9d27d1d1a5a3f650f4cde2" ON "booking_passengers_passenger" ("passenger_id") ')
    await queryRunner.query('ALTER TABLE "booking_passengers_passenger" ADD CONSTRAINT "FK_afa537be69faa70c1403b3ac416" FOREIGN KEY ("booking_id") REFERENCES "booking"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    await queryRunner.query('ALTER TABLE "booking_passengers_passenger" ADD CONSTRAINT "FK_522a9d27d1d1a5a3f650f4cde2f" FOREIGN KEY ("passenger_id") REFERENCES "passenger"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
  }
}
