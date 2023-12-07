const { MongoClient, ObjectId } = require('mongodb');

const psw = 'xPzJjnxyn2vpeymk'
const uri = `mongodb+srv://dabdevs:${psw}@cluster0.uoygnlu.mongodb.net/`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db('pc-mag');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

module.exports = { connect, ObjectId };
