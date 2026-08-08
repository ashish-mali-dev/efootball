const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') })

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    TURSO_DB_URL: process.env.TURSO_DB_URL,
    TURSO_DB_TOKEN: process.env.TURSO_DB_TOKEN,
    ADMIN_USERNAME: process.env.ADMIN_USERNAME,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  },
}

module.exports = nextConfig
