const _mongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

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
        const id = new ObjectId(profileId);
        return this._profilesCollection.findOne({_id: id});
    },

    getProfiles(){
        return this._profilesCollection.find({}).toArray();
    },

    create(data){
        return this._profilesCollection.insertOne({
            name: data.name,
            frames: data.frames,
        });
    },

    update(data){
        return this._profilesCollection.updateOne(
            {_id: new ObjectId(data.id)},
            {
                $set: {
                    name: data.name,
                    frames: data.frames,
                }
            }
        );
    },

    delete(profileId){
        const id = new ObjectId(profileId);
        return this._profilesCollection.deleteOne({_id: id});
    }
}

module.exports = mongoClient;