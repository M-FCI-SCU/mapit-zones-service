const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASS}@cluster0.ag5hi.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
var { createZonesCollection } = require('./zones.model');
const collections = ['zones']
let _db = null

module.exports.get_DB = () => {
    return _db
}
module.exports.StartMongodb = async () => {
    await client.connect();
    const db = client.db();
    const existed_collections = await client.db().listCollections().toArray();
    if (!existed_collections.find(collection => "zones" == collection.name)) {
        await createZonesCollection(db)
    }
    console.log('MongoDB connected successfully');
    _db = db
}
