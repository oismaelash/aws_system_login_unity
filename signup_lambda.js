sdfhlskduhf;
const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1"
});

let docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    
    
    let params = {
    TableName:event.table,
    Item:{
        "id": getRandomInt(3, 9999999),
        "username": event.username,
        "password": event.password
        }
    };
    
    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            callback({signup: false}, null);
        } else {
            console.log("Added item:", JSON.stringify(params.Item, null, 2));
            callback(null, {signup: true})
        }
    });
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}