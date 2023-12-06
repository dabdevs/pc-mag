const { MongoClient } = require('mongodb');

const psw = 'xPzJjnxyn2vpeymk'
const uri = `mongodb+srv://dabdevs:${psw}@cluster0.uoygnlu.mongodb.net/`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db('pc-mag');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

module.exports = { connect, client };
