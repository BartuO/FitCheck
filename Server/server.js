require("dotenv").config();
const express = require('express')
const app = express()
const port = 5000

const pgp = require("pg-promise")()
const db = pgp(process.env.DB_CREDENTIALS)

app.use(express.json())
app.post('/register', (req, res) => {
    body = req.body

    }
)

app.listen(
    port,
    () => {
        console.log("server running on port 5000")
    }
)