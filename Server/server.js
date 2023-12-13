
require("dotenv").config();
const express = require('express')
const bodyParser = require('body-parser');
//const AWS = require('aws-sdk')

const app = express()
const port = 5000

const pgp = require("pg-promise")();
const db = pgp(process.env.DB_CREDENTIALS);

/* 
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
 */
//const s3 = new AWS.S3();
let picture = null;
//app.use(express.json());
app.use(bodyParser.json({ limit: '10mb' }));
/* 
const uploadImage = async (photo) => {

    let base64data = Buffer.from(photo,"binary");
    const uploadedImage = await s3.upload({
        Bucket: "fitcheck-photos",
        Key: "test-upload",
        Body: base64data,
    }).promise()
    console.log(uploadedImage.Location);
}

 */
app.get("/test", (req,res) => {
        console.log('test');
    }
)

app.post('/registerUser', (req,res) => {
    const {userName, email, password} = req.body;
    console.log("registering user :" + email)
    db.manyOrNone('SELECT email FROM member WHERE email = $1', email).then( r => {
        if (r.length === 0){
            //register user
            db.none('INSERT INTO member (email, username, password) VALUES ($1,$2,$3)', [email,userName,password]);
            res.status(200).send({"success": true});
        }
        else {
            res.status(200).send({"success": false});
        }
        }
    )
    }
)

app.post('/addPost', (req, res) => {
    const {img, color, info, price, title, userID} = req.body;
    db.none("INSERT INTO POST(title, price, info, color, img, userID, isRemoved, removedBy) VALUES ($1, $2, $3, $4, $5, $6, false, null); ", 
            [title,price,info, color, img, userID]
            );
    console.log("inserting post from user" + userID);
    res.status(200);
    }
)

app.get('/getPosts', async (req,res) => {
    db.manyOrNone("SELECT * FROM post LIMIT 40;") 
    .then(ret => res.status(200).send(ret))
    console.log("getting posts");
   /*  res.status(200).send({
        img: picture,
    }) */
}) 
app.post('/getUserPosts', async (req,res) => {
     const {userID} = req.body;
    console.log("getting posts from user: " + userID);
    res.status(200).send( await db.manyOrNone("SELECT * FROM post WHERE userid = $1", userID));
})

app.post('/getProfile', async (req,res) => {
    const {userID} = req.body;
    console.log("getting profile for user: " + userID);
    res.status(200).send( await db.one("SELECT * FROM member WHERE userid = $1", userID));
})

app.post('/updateProfile', async (req,res) => {
    const {userID, userName, bio, image} = req.body;
    db.none("UPDATE member SET username = $2, bio = $3, profilepic = $4 WHERE userID = $1", [userID, userName, bio, image]);
    console.log("updating profile for " + userID)
    res.status(200);
})

app.post('/updateProfilePic', async (req,res) => {
    const {image, userID} = req.body;
    db.none("UPDATE member SET profilepic = $2 WHERE userID = $1", [userID, image]);
    console.log("updating profilePic for " + userID);
    res.status(200);
} )

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