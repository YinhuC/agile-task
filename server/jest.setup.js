import { spawnSync } from 'child_process';

beforeAll(() => {
  const migrationProcess = spawnSync(
    'npx',
    ['typeorm', 'migration:run', '--config', 'ormconfig.test.js'],
    {
      stdio: 'inherit',
    }
  );

  if (migrationProcess.error) {
    console.error('Failed to run migrations:', migrationProcess.error);
    process.exit(1);
  }
});

afterAll(() => {
  const migrationRevertProcess = spawnSync(
    'npx',
    ['typeorm', 'migration:revert', '--config', 'ormconfig.test.js'],
    {
      stdio: 'inherit',
    }
  );

  if (migrationRevertProcess.error) {
    console.error('Failed to revert migrations:', migrationRevertProcess.error);
    process.exit(1);
  }
});
