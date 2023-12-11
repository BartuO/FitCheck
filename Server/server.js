
require("dotenv").config();
const express = require('express')
const bodyParser = require('body-parser');
const AWS = require('aws-sdk')

const app = express()
const port = 5000

const pgp = require("pg-promise")();
const db = pgp(process.env.DB_CREDENTIALS);


AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const s3 = new AWS.S3();
let picture = null;
//app.use(express.json());
app.use(bodyParser.json({ limit: '10mb' }));

const uploadImage = async (photo) => {

    let base64data = Buffer.from(photo,"binary");
    const uploadedImage = await s3.upload({
        Bucket: "fitcheck-photos",
        Key: "test-upload",
        Body: base64data,
    }).promise()
    console.log(uploadedImage.Location);
}


app.get("/test", (req,res) => {
        console.log('test');
    }
)

app.post('/addClothing', (req, res) => {
    console.log("image attempted upload");
    const {img} = req.body;
    picture = img;
    console.log(req.body);
    //uploadImage(body);
        
    }
)

app.get('/getClothing', (req,res) => {
    res.status(200).send({
        img: picture,
    })
}) 
/* 
app.get('/posts', (req,res) => {
    db.any("SELECT "));
}) */

app.listen(
    port,
    () => {
        console.log("server running on port 5000")
        //db.none("insert into post(title, price, photo) values($1,$2,$3)",["Big steppington Ricks",10,] )
    
    }
)