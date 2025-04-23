const connection_string = "mongodb+srv://henrynissen:APnalVKwqyzVakf1@cluster0.emudny4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const mongo = require('mongodb');
var cl = mongo.MongoClient;
var http = require('http');
var url = require('url');

http.createServer(async function (req, res) {
    var query = url.parse(req.url,true).query;
    if (query.texttype == 'COM') {
        await cl.connect(connection_string, async function(err, account) {
            if(err) {
                console.log("Connection err: " +err);
                return;
            }
            var dbObj = account.db("Stock");
            var collection = dbObj.collection("PublicCompanies");
            await collection.find({Company : query.stock}).toArray(
                async function(err, items) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        items.forEach(function(item){    
                            console.log(item.Company, item.Ticker, item.Price);
                        });
                    }
                }
            );     
        });
    }
    else {
        await cl.connect(connection_string, async function(err, account) {
            if(err) {
                console.log("Connection err: " +err);
                return;
            }
            var dbObj = account.db("Stock");
            var collection = dbObj.collection("PublicCompanies");
            await collection.find({Ticker : query.stock}).toArray(
                async function(err, items) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        items.forEach(function(item){    
                            console.log(item.Company, item.Ticker, item.Price);
                        });
                    }
                }
            );
        });
    }
    res.end();
}).listen(process.env.PORT || 3000);