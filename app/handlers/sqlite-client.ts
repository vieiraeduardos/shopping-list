import sqlite3 from "sqlite3";

sqlite3.verbose();

export default class SQLiteClient {
    private db: sqlite3.Database | null;

    constructor() {
        this.db = null;
    }

    async open_db(): Promise<sqlite3.Database> {
        if (!this.db) {
            this.db = new sqlite3.Database("shopping-list.db", (err) => {
                if (err) {
                    console.error("Error opening database:", err.message);
                }
            });

            await this.run(`
                CREATE TABLE IF NOT EXISTS items (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    title TEXT NOT NULL,
                    category TEXT NOT NULL,
                    price REAL NOT NULL,
                    amount INTEGER NOT NULL,
                    is_checked BOOLEAN DEFAULT FALSE,
                    created_at TEXT NOT NULL
                )
            `);

            await this.run(`
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    email TEXT NOT NULL,
                    phone TEXT NOT NULL,
                    password TEXT NOT NULL,
                    created_at TEXT NOT NULL
                )
            `);
        }
        return this.db;
    }

    close_db(): void {
        if (this.db) {
            this.db.close((err) => {
                if (err) {
                    console.error("Error closing database:", err.message);
                }
            });
            this.db = null;
        }
    }

    run(sql: string, params: any[] = []): Promise<sqlite3.RunResult> {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                return reject(new Error("Database is not open"));
            }
            this.db.run(sql, params, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this);
                }
            });
        });
    }

    async insert_item(item: { title: string; category: string; price: number; amount: number; created_at: string }): Promise<void> {
        await this.open_db();
        const sql = `INSERT INTO items (title, category, price, amount, created_at) VALUES (?, ?, ?, ?, ?)`;
        await this.run(sql, [item.title, item.category, item.price, item.amount, item.created_at]);
        this.close_db();
    }

    async get_items(): Promise<any[]> {
        await this.open_db();
        return new Promise((resolve, reject) => {
            if (!this.db) {
                return reject(new Error("Database is not open"));
            }
            this.db.all("SELECT * FROM items", [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    async insert_user(item: { name: string; email: string; phone: string; password: string;created_at: string }): Promise<void> {
        await this.open_db();
        const sql = `INSERT INTO users (name, email, phone, password, created_at) VALUES (?, ?, ?, ?, ?)`;
        await this.run(sql, [item.name, item.email, item.phone, item.password, item.created_at]);
        this.close_db();
    }

    async get_users(): Promise<any[]> {
        await this.open_db();
        return new Promise((resolve, reject) => {
            if (!this.db) {
                return reject(new Error("Database is not open"));
            }
            this.db.all("SELECT * FROM users", [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    async login_user(item: { email: string, password: string }): Promise<any> {
        await this.open_db();
        return new Promise((resolve, reject) => {
            if (!this.db) {
                return reject(new Error("Database is not open"));
            }
            this.db.get("SELECT * FROM users WHERE email = ? AND password = ?", [item.email, item.password], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }
}