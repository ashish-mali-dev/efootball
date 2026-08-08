const dotenv = require('dotenv');
dotenv.config({ path: require('path').resolve(__dirname, '../.env.local') });
dotenv.config();

const { createClient } = require('@libsql/client');

async function createTursoAdapter() {
  const client = createClient({
    url: process.env.TURSO_DB_URL,
    authToken: process.env.TURSO_DB_TOKEN,
  });

  // Ensure tables exist
  await client.execute(`CREATE TABLE IF NOT EXISTS players (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)`)
  await client.execute(`CREATE TABLE IF NOT EXISTS tournaments (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'pending')`)
  await client.execute(`CREATE TABLE IF NOT EXISTS tournament_players (id INTEGER PRIMARY KEY AUTOINCREMENT, tournament_id INTEGER NOT NULL, player_id INTEGER NOT NULL)`)
  await client.execute(`CREATE TABLE IF NOT EXISTS matches (id INTEGER PRIMARY KEY AUTOINCREMENT, tournament_id INTEGER NOT NULL, player1_id INTEGER NOT NULL, player2_id INTEGER NOT NULL, round TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'scheduled', score1 INTEGER, score2 INTEGER)`)

  // Wrap in a pool-compatible interface (returns [rows] for SELECT, [{ insertId }] for writes)
  const query = async (sql, params = []) => {
    const args = (params || []).map(p => p === undefined ? null : p)
    const result = await client.execute({ sql, args })
    const isSelect = sql.trim().toLowerCase().startsWith('select')
    if (isSelect) {
      const rows = result.rows.map(r => Object.fromEntries(Object.entries(r)))
      return [rows]
    } else {
      return [{ insertId: Number(result.lastInsertRowid), affectedRows: result.rowsAffected }]
    }
  }

  return { type: 'turso', pool: { query } }
}

let adapter = null

async function initDb() {
  if (adapter) return adapter
  adapter = await createTursoAdapter()
  console.log('Using Turso (libsql) adapter')
  return adapter
}

module.exports = { initDb }
