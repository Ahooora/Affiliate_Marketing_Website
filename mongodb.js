const { MongoClient } = require('mongodb')
const connectionUrl = 'mongodb+srv://ahoora:dirtysouth1989@affiliatemarketing.711t4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const connection = async() => {
    const client = new MongoClient(connectionUrl)
    try {
        let connect = await client.connect()
        return connect
    } catch (error) {
        
    }
}
const saveData = async() => {
    let client = await connection()
    try {
        let result = await client.db('AffiliateMarketing').collection('user').insertOne({_id:1,name: 'testuser'})
    } catch (error) {
        
    }
    finally{
        await client.close()
    }
}


module.exports.mongo = {saveData}