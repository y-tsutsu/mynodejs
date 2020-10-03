const MongoClient = require('mongodb').MongoClient;
const settings = require('./settings');

const option = { useUnifiedTopology: true };
MongoClient.connect('mongodb://' + settings.host + '/', option, (err, client) => {
    if (err) {
        return console.dir(err);
    }
    console.log('connected to db');

    const db = client.db(settings.db);

    db.collection('users', (err, collection) => {
        // var docs = [
        //     { name: 'tsutsu', score: 42 },
        //     { name: 'foo', score: 98 },
        //     { name: 'bar', score: 23 },
        // ]
        // collection.insert(docs, (err, result) => {
        //     console.dir(result);
        // });

        // collection.find({ name: 'tsutsu' }).toArray((err, items) => {
        //     console.log(items);
        // })

        const stream = collection.find().stream();
        stream.on('data', (item) => {
            console.log(item);
        });
        stream.on('end', () => {
            console.log('finished!');
            client.close();
        })
    });
});
