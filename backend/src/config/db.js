import pg from 'pg';

const { Pool } = pg;

// Read the connection string from environment variables
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is missing.');
}

// Configure the connection pool for high concurrency
const pool = new Pool({
  connectionString: connectionString,
  // Maximum number of clients the pool should contain
  max: 20, 
  // How long a client is allowed to remain idle before being closed
  idleTimeoutMillis: 30000, 
  // How long to wait for a connection to become available before timing out
  connectionTimeoutMillis: 2000, 
});

// Log pool connection events for monitoring/debugging
pool.on('connect', () => {
  // Connection successfully established
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle database client:', err);
  process.exit(-1);
});

// Helper function to execute queries safely
export const query = async (text, params) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    
    // Optional: Log query duration in development to detect slow queries
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Query executed] Duration: ${duration}ms | Command: ${text.split(' ')[0]}`);
    }
    
    return res;
  } catch (error) {
    console.error('[Database Error]:', error.message);
    throw error;
  }
};

export default pool;