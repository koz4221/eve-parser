var express = require('express')
var app = express()
var https = require('https');
var doc = require('dynamodb-doc');
var dynamo = new doc.DynamoDB();

app.get('/', function (req, res) {
  res.send('Hello World!')

  var options = {
     host: 'zkillboard.com',
     path: '/api/losses/allianceID/99003214/no-attackers/limit/3/',
     method: 'GET'
  }

  https.get(options, (res) => {
     var body = '';
     res.on('data', (d) => {
        body += d;
     });
     res.on('end', () => {
        parseAndExportData(body);
     });
  })

})

function parseAndExportData(body) {
   var data = JSON.parse(body);

   data.forEach((km) => {
      console.log(km);
   })
}

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})