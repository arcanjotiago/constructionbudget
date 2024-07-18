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
                    role text NOT NULL,
                    CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id)
            )
        `);
        
        await queryRunner.query(
            `CREATE TABLE "auth"(
                id uuid DEFAULT uuid_generate_v4() NOT NULL,
                created_at timestamptz DEFAULT now() NULL,
                access_token text NULL,
                validity numeric NULL,
                user_id uuid NULL,
                CONSTRAINT "PK_7e416cf6172bc5aec04244f6459" PRIMARY KEY (id)
            )
        `);

        await queryRunner.query(
            `CREATE TABLE "order"(
                id uuid DEFAULT uuid_generate_v4() NOT NULL,
                created_at timestamptz now() NULL,
                client_name text NULL,
                client_phone text NULL,
                address text NULL,
                service_type text NULL,
                materials text[] NULL,
                labor_price money NULL,
                amount money NULL,
                user_id uuid NULL,
                CONSTRAINT "PK_cace4a159ff9f2512dd42373761" PRIMARY KEY (id)
            )
        `);

        await queryRunner.query(
            `CREATE TABLE "material"(
                id uuid DEFAULT uuid_generate_v4() NOT NULL,
                created_at timestamptz DEFAULT now() NULL,
                name text NULL,
                value money NULL,
                description text NULL,
                quantity numeric NULL,
                CONSTRAINT "PK_cace4a159ff9f2512dd42373765" PRIMARY KEY (id)
            )
        `);
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "auth"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "material"`);
    }

}
