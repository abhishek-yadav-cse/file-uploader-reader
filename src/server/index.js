var express = require('express')
const fileUpload = require('express-fileupload');
const app = express();

app.use(fileUpload());
app.use(express.static('dist'));

app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

var AWS = require('aws-sdk');
var fs = require('fs');

const s3 = new AWS.S3({
    accessKeyId: 'AWS_KEY',
    secretAccessKey: 'AWS_SECRET_KEY'
});
const fileName = 'src/server/OnlineOrderActivityReport_2022_01_17_09_51_22.csv';

app.post('/imageUpload', async (req, res) => {
   fs.readFile(fileName, (err, data) => {
     if (err) throw err;
     const params = {
         Bucket: 'dabbagaram-analytics', // pass your bucket name
         Key: 'reports/online_orders_activity/2022/01/17/09/OnlineOrderActivityReport_2022_01_17_09_51_22.csv', // file will be saved as testBucket/contacts.csv
         Body: JSON.stringify(data, null, 2)
     };
     s3.upload(params, function(s3Err, data) {
         if (s3Err) throw s3Err
         console.log(`File uploaded successfully at ${data.Location}`)
     });
  });
})

app.listen(8080, () => console.log(`Listening on port 8080!`));
