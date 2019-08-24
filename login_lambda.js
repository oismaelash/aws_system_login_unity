const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1"
});

let docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    
    let params = {
        TableName: event.table
    };
    
    docClient.scan(params, function (err, data) {
        if (err) {
            callback(JSON.stringify(err, null, 2), null);
        } else {
            
            let userExist = false;
            let passwordCorrect = false;
            
            for (var i = 0; i < data.Items.length; i++) {
                if(data.Items[i].username == event.username){
                       userExist = true;
                       
                       if(data.Items[i].password == event.password){
                           passwordCorrect = true
                       } else{
                           passwordCorrect = false;
                       }
                       break;
               }
            }
            
            callback(null, {userExist: userExist, passwordCorrect: passwordCorrect});
        }
    });
};