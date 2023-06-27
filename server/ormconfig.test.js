module.exports = {
  type: 'postgres',
  host: data.REACT_APP_DB_HOST,
  port: parseInt(data.REACT_APP_DB_PORT),
  username: data.REACT_APP_DB_USERNAME,
  password: data.REACT_APP_DB_PASSWORD,
  database: data.REACT_APP_DB_NAME,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/database/migrations/**/*{.js,.ts}'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};
