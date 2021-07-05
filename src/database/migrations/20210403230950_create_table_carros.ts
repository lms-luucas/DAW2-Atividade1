import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("carros", (table) => {
    table.increments("id").unique().notNullable();
    table.text("marca").notNullable();
    table.text("modelo").notNullable();
    table.text("placa").notNullable();
    table.text("cor").notNullable();
    table.integer("ano_fabricacao").notNullable;
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTable("carros");
}
