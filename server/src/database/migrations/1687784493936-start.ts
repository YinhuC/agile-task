import { MigrationInterface, QueryRunner } from 'typeorm';
import { faker } from '@faker-js/faker';

export class Start1687784493936 implements MigrationInterface {
  name = 'Start1687784493936';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, "password" character varying NOT NULL, "auth_method" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "groups" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" integer, CONSTRAINT "PK_659d1483316afb28afd3a90646e" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "projects" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "groupId" integer, CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "tasks" ("id" SERIAL NOT NULL, "index" integer NOT NULL, "name" character varying NOT NULL, "description" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "categoryId" integer, "userId" integer, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" SERIAL NOT NULL, "index" integer NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "projectId" integer, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "users_groups_groups" ("usersId" integer NOT NULL, "groupsId" integer NOT NULL, CONSTRAINT "PK_1cf09013aa7a345778eaeb5a421" PRIMARY KEY ("usersId", "groupsId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1b46034fbd69664807cb4afb16" ON "users_groups_groups" ("usersId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_270e39efd76d142903fd6ed528" ON "users_groups_groups" ("groupsId") `
    );
    await queryRunner.query(
      `ALTER TABLE "projects" ADD CONSTRAINT "FK_e849c0fab3e6ddf3cb693fb0bf8" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" ADD CONSTRAINT "FK_8ae9301033f772a42330e917a7d" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ADD CONSTRAINT "FK_2fec10336297c7bb5282b5d3ce8" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "users_groups_groups" ADD CONSTRAINT "FK_1b46034fbd69664807cb4afb16f" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "users_groups_groups" ADD CONSTRAINT "FK_270e39efd76d142903fd6ed528f" FOREIGN KEY ("groupsId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );

    // Insert user
    const user = await queryRunner.query(
      `INSERT INTO "users" ("email", "firstname", "lastname", "password", "auth_method", "created_at", "updated_at")  VALUES ($1, $2, $3, $4, $5, DEFAULT, DEFAULT)  RETURNING "id", "created_at", "updated_at"`,
      [
        'johndoe@example.com',
        'John',
        'Doe',
        '$2b$10$2HwoSGrgUXNNIHykh9oVQuPtT0xOCa0VWD7Dy4MN2d81IzRVsYmtC',
        'email',
      ]
    );

    // Generate group data
    const groupsData = Array.from({ length: 3 }, () => ({
      name: faker.company.name(),
    }));

    // Loop through groups
    const groupPromises = groupsData.map(async (groupData) => {
      // Insert group
      const group = await queryRunner.query(
        `INSERT INTO "groups" ("name", "created_at", "ownerId")  VALUES ($1, DEFAULT, $2)  RETURNING "id", "created_at"`,
        [groupData.name, user[0].id]
      );

      // Create user and group many to many relationship
      await queryRunner.query(
        `INSERT INTO "users_groups_groups" ("usersId", "groupsId")  VALUES ($1, $2)`,
        [user[0].id, group[0].id]
      );

      // Generate project data
      const projectsData = Array.from(
        { length: faker.number.int({ min: 2, max: 6 }) },
        () => ({
          name: faker.location.country(),
          description: faker.lorem.sentences(2),
        })
      );

      // Loop through projects
      const projectsPromises = projectsData.map(async (projectData) => {
        // Insert project
        const project = await queryRunner.query(
          `INSERT INTO "projects" ("name", "description", "created_at", "updated_at", "groupId")  VALUES ($1, $2, DEFAULT, DEFAULT, $3)  RETURNING "id", "created_at", "updated_at"`,
          [projectData.name, projectData.description, group[0].id]
        );

        // Generate category data
        const categoriesData = Array.from(
          { length: faker.number.int({ min: 3, max: 6 }) },
          () => ({
            name: faker.location.city(),
          })
        );

        const categoriesPromises = categoriesData.map(
          async (categoryData, index) => {
            // Insert category
            const category = await queryRunner.query(
              `INSERT INTO "categories" ("index", "name", "created_at", "projectId")  VALUES ($1, $2, DEFAULT, $3)  RETURNING "id", "created_at"`,
              [index, categoryData.name, project[0].id]
            );

            // Generate task data
            const tasksData = Array.from(
              { length: faker.number.int({ min: 3, max: 8 }) },
              () => ({
                name: faker.lorem.words({ min: 2, max: 5 }),
                description: faker.lorem.sentences(
                  faker.number.int({ min: 1, max: 2 })
                ),
              })
            );

            const taskPromises = tasksData.map(async (taskData, index) => {
              // Insert task
              await queryRunner.query(
                `INSERT INTO "tasks"("index", "name", "description", "created_at", "categoryId", "userId")  VALUES ($1, $2, $3, DEFAULT, $4, DEFAULT)  RETURNING "id", "created_at"    `,
                [index, taskData.name, taskData.description, category[0].id]
              );
            });

            // Wait for all category insertions to complete
            await Promise.all(taskPromises);
          }
        );

        // Wait for all category insertions to complete
        await Promise.all(categoriesPromises);
      });

      // Wait for all project insertions to complete
      await Promise.all(projectsPromises);
    });

    // Wait for all group insertions to complete
    await Promise.all(groupPromises);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_groups_groups" DROP CONSTRAINT "FK_270e39efd76d142903fd6ed528f"`
    );
    await queryRunner.query(
      `ALTER TABLE "users_groups_groups" DROP CONSTRAINT "FK_1b46034fbd69664807cb4afb16f"`
    );
    await queryRunner.query(
      `ALTER TABLE "categories" DROP CONSTRAINT "FK_2fec10336297c7bb5282b5d3ce8"`
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" DROP CONSTRAINT "FK_8ae9301033f772a42330e917a7d"`
    );
    await queryRunner.query(
      `ALTER TABLE "projects" DROP CONSTRAINT "FK_e849c0fab3e6ddf3cb693fb0bf8"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_270e39efd76d142903fd6ed528"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1b46034fbd69664807cb4afb16"`
    );
    await queryRunner.query(`DROP TABLE "users_groups_groups"`);
    await queryRunner.query(`DROP TABLE "categories"`);
    await queryRunner.query(`DROP TABLE "tasks"`);
    await queryRunner.query(`DROP TABLE "projects"`);
    await queryRunner.query(`DROP TABLE "groups"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
