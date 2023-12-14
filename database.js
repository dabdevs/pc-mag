const { MongoClient } = require('mongodb');
require('dotenv').config()

class Database {
    constructor(url, dbName) {
        this.connected = false;
        this.url = url;
        this.dbName = dbName;
        this.client = new MongoClient(url, { useUnifiedTopology: true });
    }

    async connect() {
        try {
            if (!this.connected) {
                await this.client.connect();
                this.connected = true
                console.log('Connected to database!')
            }
            return this.client.db(this.dbName);
        } catch (error) {
            this.connected = false
            throw error
        }
    }

    async close() {
        try {
            if (this.client.connected) {
                await this.client.close();
            }
        } catch (error) {
            throw error
        }
    }
}

const mongoUser = process.env.MONGO_DB_USER
const mongoPassword = process.env.MONGO_DB_PASSWORD
const mongoDBDatabase = process.env.MONGO_DB_DATABASE
const mongoUrl = `mongodb+srv://${mongoUser}:${mongoPassword}@cluster0.uoygnlu.mongodb.net/`;

const database = new Database(mongoUrl, mongoDBDatabase);

module.exports = database;
