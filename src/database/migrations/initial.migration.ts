import { MigrationInterface, QueryRunner } from "typeorm";

export class  InitialMigration implements MigrationInterface {
    name = ' migration1713919957739'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
            CREATE TABLE "user"(
                    id uuid DEFAULT uuid_generate_v4() NOT NULL,
                    created_at timestamptz DEFAULT now() NULL,
                    "name" text NOT NULL,
                    email text NOT NULL,
                    "password" text NOT NULL,
                    access_token text NULL,
                    CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id)
            )`
        );
        
        await queryRunner.query(
            `CREATE TABLE "auth"(
                id uuid DEFAULT uuid_generate_v4() NOT NULL,
                created_at timestamptz DEFAULT now() NULL,
                access_token text NULL,
                validity numeric NULL,
                user_id uuid NULL,
                CONSTRAINT "PK_7e416cf6172bc5aec04244f6459" PRIMARY KEY (id)
            ) `
        );

        await queryRunner.query(
            `CREATE INDEX access_token ON auth (access_token)`
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "auth"`);
    }

}
