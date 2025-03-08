const fs = require("fs");
const path = require("path");

const env = require("./server/env");

const isSQLite = env.DB_CLIENT === "sqlite3" || env.DB_CLIENT === "better-sqlite3";

if (isSQLite) {
  const dbPath = path.dirname(env.DB_FILENAME);
  if (!fs.existsSync(dbPath)) {
    fs.mkdirSync(dbPath, { recursive: true });
  }
}

module.exports = {
  client: env.DB_CLIENT,
  connection: isSQLite
    ? { filename: env.DB_FILENAME }
    : {
        host: env.DB_HOST,
        database: env.DB_NAME,
        user: env.DB_USER,
        port: env.DB_PORT,
        password: env.DB_PASSWORD,
        ssl: env.DB_SSL,
      },
  useNullAsDefault: isSQLite,
  migrations: {
    tableName: "knex_migrations",
    directory: path.resolve(__dirname, "server/migrations"),
    disableMigrationsListValidation: true,
  },
};
