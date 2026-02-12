// import { neon } from "@neondatabase/serverless"
// import bcrypt from "bcryptjs"

// // Use the provided Neon database URL
// const sql = neon(process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.db_url || "postgresql://dummy:dummy@dummy:5432/dummy")

// // Database types
// export interface Product {
//   id: number
//   name: string
//   description: string | null
//   price: number
//   image_url: string | null
//   category: string | null
//   size: string | null
//   color: string | null
//   stock_quantity: number
//   is_featured: boolean
//   is_active: boolean
//   created_at: Date
//   updated_at: Date
// }

// export interface Order {
//   id: number
//   customer_name: string
//   customer_email: string | null
//   customer_phone: string
//   customer_address: string
//   city: string
//   total_amount: number
//   status: string
//   payment_method: string
//   notes: string | null
//   created_at: Date
//   updated_at: Date
// }

// export interface OrderItem {
//   id: number
//   order_id: number
//   product_id: number | null
//   product_name: string
//   product_price: number
//   quantity: number
//   size: string | null
//   color: string | null
// }

// export interface AdminUser {
//   id: number
//   username: string
//   password_hash: string
//   email: string | null
//   created_at: Date
// }

// let dbInitialized = false
// let initPromise: Promise<void> | null = null

// export async function initializeDatabase() {
//   if (dbInitialized) return
//   if (initPromise) return initPromise

//   initPromise = (async () => {
//     try {
//       console.log("[v0] Starting database initialization...")

//       // Create products table
//       await sql`
//         CREATE TABLE IF NOT EXISTS products (
//           id SERIAL PRIMARY KEY,
//           name VARCHAR(255) NOT NULL,
//           description TEXT,
//           price DECIMAL(10, 2) NOT NULL,
//           image_url VARCHAR(500),
//           category VARCHAR(100),
//           size VARCHAR(50),
//           color VARCHAR(50),
//           stock_quantity INTEGER DEFAULT 0,
//           is_featured BOOLEAN DEFAULT false,
//           is_active BOOLEAN DEFAULT true,
//           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//         )
//       `

//       // Create orders table
//       await sql`
//         CREATE TABLE IF NOT EXISTS orders (
//           id SERIAL PRIMARY KEY,
//           customer_name VARCHAR(255) NOT NULL,
//           customer_email VARCHAR(255),
//           customer_phone VARCHAR(20) NOT NULL,
//           customer_address TEXT NOT NULL,
//           city VARCHAR(100) NOT NULL,
//           total_amount DECIMAL(10, 2) NOT NULL,
//           status VARCHAR(50) DEFAULT 'pending',
//           payment_method VARCHAR(50) DEFAULT 'cash_on_delivery',
//           notes TEXT,
//           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//         )
//       `

//       // Create order_items table
//       await sql`
//         CREATE TABLE IF NOT EXISTS order_items (
//           id SERIAL PRIMARY KEY,
//           order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
//           product_id INTEGER REFERENCES products(id),
//           product_name VARCHAR(255) NOT NULL,
//           product_price DECIMAL(10, 2) NOT NULL,
//           quantity INTEGER NOT NULL,
//           size VARCHAR(50),
//           color VARCHAR(50)
//         )
//       `

//       // Create admin_users table
//       await sql`
//         CREATE TABLE IF NOT EXISTS admin_users (
//           id SERIAL PRIMARY KEY,
//           username VARCHAR(100) UNIQUE NOT NULL,
//           password_hash VARCHAR(255) NOT NULL,
//           email VARCHAR(255),
//           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//         )
//       `

//       const username = process.env.ADMIN_USERNAME || "admin"
//       const password = process.env.ADMIN_PASSWORD || "admin1234"
//       const saltRounds = 10
//       const passwordHash = await bcrypt.hash(password, saltRounds)
//       // Upsert admin user: update password if username exists
//       await sql`
//         INSERT INTO admin_users (username, password_hash, email)
//         VALUES (${username}, ${passwordHash}, 'admin@abdullahchappalstore.com')
//         ON CONFLICT (username) DO UPDATE SET password_hash = EXCLUDED.password_hash, email = EXCLUDED.email
//       `

//       // Check if products table is empty and seed with sample data
//       const productCount = await sql`SELECT COUNT(*) as count FROM products`
//       if (productCount[0].count === 0) {
//         await sql`
//           INSERT INTO products (name, description, price, image_url, category, size, color, stock_quantity, is_featured) VALUES
//           ('Classic Peshawari Chappal', 'Handcrafted traditional Peshawari chappal made from premium leather with authentic Pakistani craftsmanship.', 2500.00, '/traditional-pakistani-artisan-making-peshawari-cha.jpg', 'Traditional', '42', 'Brown', 25, true),
//           ('Premium Leather Chappal', 'High-quality leather chappal with comfortable sole, perfect for daily wear and special occasions.', 3200.00, '/premium-leather-chappal-brown.jpg', 'Premium', '41', 'Black', 18, true),
//           ('Embroidered Chappal', 'Beautiful handmade chappal with traditional embroidery work, showcasing the rich cultural heritage.', 2800.00, '/embroidered-pakistani-chappal.jpg', 'Embroidered', '43', 'Tan', 22, true),
//           ('Casual Peshawari Chappal', 'Comfortable everyday chappal made with soft leather, ideal for casual wear and long walks.', 2200.00, '/casual-peshawari-chappal.jpg', 'Casual', '40', 'Brown', 30, false),
//           ('Wedding Special Chappal', 'Elegant chappal designed for special occasions with intricate detailing and premium finish.', 4500.00, '/wedding-special-chappal-gold.jpg', 'Wedding', '42', 'Gold', 12, true),
//           ('Kids Peshawari Chappal', 'Miniature version of traditional chappal designed specifically for children with soft comfortable sole.', 1800.00, '/kids-peshawari-chappal-small.jpg', 'Kids', '35', 'Brown', 20, false)
//         `
//         console.log("[v0] Sample products inserted")
//       }

//       dbInitialized = true
//       console.log("[v0] Database initialized successfully")
//     } catch (error) {
//       console.error("[v0] Database initialization error:", error)
//       throw error
//     }
//   })()

//   return initPromise
// }

// export async function ensureDatabase() {
//   if (!dbInitialized) {
//     await initializeDatabase()
//   }
// }

// // Initialize database on module load
// initializeDatabase().catch(console.error)

// export { sql }





// // lib/db.ts
// import { Pool } from 'pg'

// let pool: Pool | null = null

// export function getPool() {
//   if (!pool) {
//     pool = new Pool({
//       connectionString: process.env.DATABASE_URL,
//       ssl: {
//         rejectUnauthorized: false
//       }
//     })
//   }
//   return pool
// }

// export async function query(text: string, params?: any[]) {
//   const pool = getPool()
//   const result = await pool.query(text, params)
//   return result
// }



import { neon } from "@neondatabase/serverless"
import bcrypt from "bcryptjs"

// Use the provided Neon database URL
const sql = neon(process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.db_url || "postgresql://dummy:dummy@dummy:5432/dummy")

// Database types
export interface Product {
  id: number
  name: string
  description: string | null
  price: number
  image_url: string | null
  category: string | null
  size: string | null
  color: string | null
  stock_quantity: number
  is_featured: boolean
  is_active: boolean
  created_at: Date
  updated_at: Date
}

export interface Order {
  id: number
  customer_name: string
  customer_email: string | null
  customer_phone: string
  customer_address: string
  city: string
  total_amount: number
  status: string
  payment_method: string
  notes: string | null
  created_at: Date
  updated_at: Date
}

export interface OrderItem {
  id: number
  order_id: number
  product_id: number | null
  product_name: string
  product_price: number
  quantity: number
  size: string | null
  color: string | null
}

export interface AdminUser {
  id: number
  username: string
  password_hash: string
  email: string | null
  created_at: Date
}

let dbInitialized = false
let initPromise: Promise<void> | null = null

export async function initializeDatabase() {
  if (dbInitialized) return
  if (initPromise) return initPromise

  initPromise = (async () => {
    try {
      console.log("[v0] Starting database initialization...")

      // Create products table
      await sql`
        CREATE TABLE IF NOT EXISTS products (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          description TEXT,
          price DECIMAL(10, 2) NOT NULL,
          image_url VARCHAR(500),
          category VARCHAR(100),
          size VARCHAR(50),
          color VARCHAR(50),
          stock_quantity INTEGER DEFAULT 0,
          is_featured BOOLEAN DEFAULT false,
          is_active BOOLEAN DEFAULT true,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `

      // Create orders table
      await sql`
        CREATE TABLE IF NOT EXISTS orders (
          id SERIAL PRIMARY KEY,
          customer_name VARCHAR(255) NOT NULL,
          customer_email VARCHAR(255),
          customer_phone VARCHAR(20) NOT NULL,
          customer_address TEXT NOT NULL,
          city VARCHAR(100) NOT NULL,
          total_amount DECIMAL(10, 2) NOT NULL,
          status VARCHAR(50) DEFAULT 'pending',
          payment_method VARCHAR(50) DEFAULT 'cash_on_delivery',
          notes TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `

      // Create order_items table
      await sql`
        CREATE TABLE IF NOT EXISTS order_items (
          id SERIAL PRIMARY KEY,
          order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
          product_id INTEGER REFERENCES products(id),
          product_name VARCHAR(255) NOT NULL,
          product_price DECIMAL(10, 2) NOT NULL,
          quantity INTEGER NOT NULL,
          size VARCHAR(50),
          color VARCHAR(50)
        )
      `

      // Create admin_users table
      await sql`
        CREATE TABLE IF NOT EXISTS admin_users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(100) UNIQUE NOT NULL,
          password_hash VARCHAR(255) NOT NULL,
          email VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `

      // Create admin_otps table for OTP verification
      await sql`
        CREATE TABLE IF NOT EXISTS admin_otps (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) NOT NULL,
          otp VARCHAR(6) NOT NULL,
          expires_at TIMESTAMP NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          used BOOLEAN DEFAULT FALSE
        )
      `

      // Create indexes for admin_otps
      await sql`
        CREATE INDEX IF NOT EXISTS idx_admin_otps_email 
        ON admin_otps(email)
      `

      await sql`
        CREATE INDEX IF NOT EXISTS idx_admin_otps_expires 
        ON admin_otps(expires_at)
      `

      const username = process.env.ADMIN_USERNAME || "admin"
      const password = process.env.ADMIN_PASSWORD || "admin1234"
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(password, saltRounds)
      // Upsert admin user: update password if username exists
      await sql`
        INSERT INTO admin_users (username, password_hash, email)
        VALUES (${username}, ${passwordHash}, 'admin@abdullahchappalstore.com')
        ON CONFLICT (username) DO UPDATE SET password_hash = EXCLUDED.password_hash, email = EXCLUDED.email
      `

      // Check if products table is empty and seed with sample data
      const productCount = await sql`SELECT COUNT(*) as count FROM products`
      if (productCount[0].count === 0) {
        await sql`
          INSERT INTO products (name, description, price, image_url, category, size, color, stock_quantity, is_featured) VALUES
          ('Classic Peshawari Chappal', 'Handcrafted traditional Peshawari chappal made from premium leather with authentic Pakistani craftsmanship.', 2500.00, '/traditional-pakistani-artisan-making-peshawari-cha.jpg', 'Traditional', '42', 'Brown', 25, true),
          ('Premium Leather Chappal', 'High-quality leather chappal with comfortable sole, perfect for daily wear and special occasions.', 3200.00, '/premium-leather-chappal-brown.jpg', 'Premium', '41', 'Black', 18, true),
          ('Embroidered Chappal', 'Beautiful handmade chappal with traditional embroidery work, showcasing the rich cultural heritage.', 2800.00, '/embroidered-pakistani-chappal.jpg', 'Embroidered', '43', 'Tan', 22, true),
          ('Casual Peshawari Chappal', 'Comfortable everyday chappal made with soft leather, ideal for casual wear and long walks.', 2200.00, '/casual-peshawari-chappal.jpg', 'Casual', '40', 'Brown', 30, false),
          ('Wedding Special Chappal', 'Elegant chappal designed for special occasions with intricate detailing and premium finish.', 4500.00, '/wedding-special-chappal-gold.jpg', 'Wedding', '42', 'Gold', 12, true),
          ('Kids Peshawari Chappal', 'Miniature version of traditional chappal designed specifically for children with soft comfortable sole.', 1800.00, '/kids-peshawari-chappal-small.jpg', 'Kids', '35', 'Brown', 20, false)
        `
        console.log("[v0] Sample products inserted")
      }

      dbInitialized = true
      console.log("[v0] Database initialized successfully")
    } catch (error) {
      console.error("[v0] Database initialization error:", error)
      throw error
    }
  })()

  return initPromise
}

export async function ensureDatabase() {
  if (!dbInitialized) {
    await initializeDatabase()
  }
}

// Initialize database on module load
initializeDatabase().catch(console.error)

export { sql }