import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const { Pool } = pg;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function runScripts(dirName) {
  const targetDir = path.join(__dirname, dirName);
  if (!fs.existsSync(targetDir)) return;

  const files = fs.readdirSync(targetDir).sort(); // Sorts to run 01_ before 02_

  for (const file of files) {
    if (file.endsWith('.sql')) {
      console.log(`[DB INIT] Executing: ${dirName}/${file}`);
      const sql = fs.readFileSync(path.join(targetDir, file), 'utf8');
      await pool.query(sql);
    }
  }
}

async function main() {
  try {
    // 1. Run schemas
    await runScripts('migrations');
    // 2. Run seeds
    await runScripts('seeds');
    console.log('[DB INIT] Database migration and seeding completed successfully.');
    process.exit(0);
  } catch (err) {
    console.error('[DB INIT] Critical error during database initialization:', err);
    process.exit(1);
  }
}

main();