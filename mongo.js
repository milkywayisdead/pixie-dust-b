const _mongoClient = require("mongodb").MongoClient;

const mongodbHost = 'localhost';
const mongodbPort = 27017;

const mongoClient = {
    _url: `mongodb://${mongodbHost}:${mongodbPort}/`,
    _dbname: 'pixie-dust',
    _profilesCollectionName: 'profiles',
    _client: null,
    _profilesCollection: null,

    async connect(){
        this._client = new _mongoClient(this._url);
        await this._client.connect();
        this._profilesCollection = this._client
                                        .db(this._dbname)
                                        .collection(this._profilesCollectionName);
    },

    close(){
        this._client.close();
    },

    getProfile(profileId){
        return this._profilesCollection.findOne({_id: profileId});
    },

    getProfiles(){
        return this._profilesCollection.find({}).toArray();
    }
}

module.exports = mongoClient;